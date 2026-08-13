import fs from 'node:fs/promises';
import path from 'node:path';

import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';

const GENERATED_DIR = path.resolve(process.cwd(), 'storage', 'generated');

export const resolvePublicBaseUrl = (baseUrl) => {
  if (baseUrl) {
    if (baseUrl.includes(':3000') || baseUrl.includes('localhost:3000')) {
      // ignore frontend host as source for PDF URL
    } else {
      return baseUrl.replace(/\/$/, '');
    }
  }

  if (process.env.BACKEND_URL) return process.env.BACKEND_URL.replace(/\/$/, '');

  const codespaceName = process.env.CODESPACE_NAME;
  const codespaceDomain = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN;
  const backendPort = process.env.BACKEND_PORT || 4000;

  if (codespaceName && codespaceDomain) {
    return `https://${codespaceName}-${backendPort}.${codespaceDomain}`.replace(/\/$/, '');
  }

  return `http://localhost:${backendPort}`.replace(/\/$/, '');
};

const resolveFieldValue = (key, payload, fallback = '') => {
  const value = payload?.[key];
  return value === undefined || value === null || value === '' ? fallback : value;
};

const resolveTemplateString = (value, payload = {}) => {
  if (value === undefined || value === null) return '';
  return String(value).replace(/\{\{\s*([A-Za-z0-9_.-]+)\s*\}\}/g, (_, key) => {
    const replaced = resolveFieldValue(key, payload, '');
    return replaced === '' ? '' : String(replaced);
  });
};

const getElementText = (element, payload = {}) => {
  const rawText = element.placeholderKey
    ? resolveFieldValue(element.placeholderKey, payload, element.text || '')
    : element.text || '';

  return resolveTemplateString(rawText, payload);
};

const readExternalResource = async (src) => {
  if (!src) return null;

  if (src.startsWith('data:')) {
    const match = src.match(/^data:(image\/(png|jpeg|jpg|webp|gif));base64,(.*)$/i);
    if (!match) return null;
    return Buffer.from(match[2], 'base64');
  }

  if (src.startsWith('http://') || src.startsWith('https://')) {
    const response = await fetch(src);
    if (!response.ok) throw new Error(`Image download failed: ${response.status}`);
    return Buffer.from(await response.arrayBuffer());
  }

  return fs.readFile(src);
};

const drawElement = async (doc, element, payload = {}) => {
  const x = Number(element.x || 0);
  const y = Number(element.y || 0);
  const width = Number(element.width || 100);
  const height = Number(element.height || 30);

  if (element.type === 'rect') {
    doc
      .save()
      .rect(x, y, width, height)
      .fill(element.fill || '#eaf2ff')
      .strokeColor(element.stroke || '#9ec5fe')
      .lineWidth(element.strokeWidth || 1)
      .stroke()
      .restore();
    return;
  }

  if (element.type === 'line' || element.type === 'separator') {
    doc
      .moveTo(x, y)
      .lineTo(x + (Number(element.width || 100) || 0), y + (Number(element.height || 0) || 0))
      .strokeColor(element.stroke || '#d1d5db')
      .lineWidth(element.strokeWidth || 1)
      .stroke();
    return;
  }

  if (element.type === 'checkbox') {
    const checked = element.checked !== false;
    doc
      .rect(x, y, width || 18, height || 18)
      .strokeColor(element.stroke || '#1f9d55')
      .lineWidth(element.strokeWidth || 1)
      .stroke();

    if (checked) {
      doc
        .moveTo(x + 4, y + (height || 18) / 2)
        .lineTo(x + (width || 18) / 2, y + (height || 18) - 4)
        .lineTo(x + (width || 18) - 4, y + 4)
        .strokeColor('#18a957')
        .lineWidth(2)
        .stroke();
    }

    const label = resolveTemplateString(element.text || 'Aceptado', payload);
    if (label) {
      doc
        .fontSize(element.fontSize || 12)
        .fillColor(element.color || '#111111')
        .text(label, x + (width || 18) + 8, y + 2, {
          width: Math.max(100, Number(element.width || 180) + 80),
          align: element.align || 'left',
        });
    }
    return;
  }

  if (element.type === 'signature') {
    const label = resolveTemplateString(element.text || 'Firma autorizada', payload);
    doc
      .moveTo(x, y)
      .lineTo(x + width, y)
      .strokeColor(element.stroke || '#111827')
      .lineWidth(element.strokeWidth || 1)
      .stroke();
    doc
      .fontSize(element.fontSize || 12)
      .fillColor(element.color || '#111111')
      .text(label, x, y + 12, { width, align: element.align || 'left' });
    return;
  }

  if (element.type === 'footer') {
    const footerText = resolveTemplateString(
      getElementText(element, payload) || 'Documento generado por Docugen',
      payload
    );
    doc
      .fontSize(element.fontSize || 11)
      .fillColor(element.color || '#4b5563')
      .text(footerText, x, y, { width, align: element.align || 'center' });
    return;
  }

  if (element.type === 'image') {
    if (!element.src) return;
    try {
      const imageBuffer = await readExternalResource(element.src);
      if (imageBuffer) doc.image(imageBuffer, x, y, { fit: [width, height] });
    } catch (error) {
      console.warn('Image could not be embedded in PDF:', error.message);
    }
    return;
  }

  if (element.type === 'qr') {
    const qrTarget = resolveTemplateString(
      element.qrValue || element.placeholderKey
        ? resolveFieldValue(element.placeholderKey, payload, element.text || '')
        : element.text || '',
      payload
    );

    if (!qrTarget) return;

    try {
      const qrBuffer = await QRCode.toBuffer(qrTarget, {
        type: 'png',
        margin: 1,
        width: Math.max(80, Number(width || 120)),
        color: {
          dark: '#111827',
          light: '#ffffff',
        },
      });
      doc.image(qrBuffer, x, y, { fit: [width, height] });
    } catch (error) {
      console.warn('QR code could not be generated:', error.message);
    }
    return;
  }

  if (element.type === 'table') {
    const raw = resolveTemplateString(element.text || '', payload);
    const rows = raw.split('\n').map((row) => row.split('|'));
    const lineHeight = 18;
    const colCount = Math.max(1, ...rows.map((row) => row.length));
    const cellWidth = width / colCount;

    doc
      .rect(x, y, width, height)
      .strokeColor(element.stroke || '#cbd5e1')
      .lineWidth(element.strokeWidth || 1)
      .stroke();

    rows.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        doc
          .fontSize(element.fontSize || 10)
          .fillColor(element.color || '#111111')
          .text(String(cell || '').trim(), x + colIndex * cellWidth + 4, y + rowIndex * lineHeight + 4, {
            width: cellWidth - 8,
            height: lineHeight,
            align: element.align || 'left',
          });
      });
    });
    return;
  }

  const textValue = getElementText(element, payload);

  if (element.type === 'title') {
    doc
      .fontSize(element.fontSize || 24)
      .fillColor(element.color || '#111111')
      .font('Helvetica-Bold')
      .text(String(textValue), x, y, { width, height, align: element.align || 'left', continued: false });
    return;
  }

  if (element.type === 'subtitle') {
    doc
      .fontSize(element.fontSize || 20)
      .fillColor(element.color || '#111111')
      .font('Helvetica-Bold')
      .text(String(textValue), x, y, { width, height, align: element.align || 'left', continued: false });
    return;
  }

  if (element.type === 'paragraph') {
    doc
      .fontSize(element.fontSize || 14)
      .fillColor(element.color || '#111111')
      .font('Helvetica')
      .text(String(textValue), x, y, { width, height, align: element.align || 'left', continued: false });
    return;
  }

  if (element.type === 'list') {
    const items = String(textValue || '')
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => `• ${item}`);

    if (!items.length) return;

    doc
      .fontSize(element.fontSize || 14)
      .fillColor(element.color || '#111111')
      .font('Helvetica')
      .list(items, { x, y, indent: 12, bulletIndent: 12, width, align: element.align || 'left' });
    return;
  }

  if (element.type === 'date') {
    doc
      .fontSize(element.fontSize || 12)
      .fillColor(element.color || '#111111')
      .font('Helvetica-Bold')
      .text(String(textValue || new Date().toLocaleDateString('es-ES')), x, y, {
        width,
        align: element.align || 'left',
      });
    return;
  }

  if (element.type === 'pageNumber') {
    const label = resolveTemplateString(element.text || 'Página {{page_number}}', payload);
    doc
      .fontSize(element.fontSize || 10)
      .fillColor(element.color || '#374151')
      .font('Helvetica')
      .text(String(label), x, y, { width, align: element.align || 'right' });
    return;
  }

  doc
    .fontSize(element.fontSize || 16)
    .fillColor(element.color || '#111111')
    .font('Helvetica')
    .text(String(textValue), x, y, { width, height, align: element.align || 'left', continued: false });
};

export const ensurePdfStorage = async () => {
  await fs.mkdir(GENERATED_DIR, { recursive: true });
  return GENERATED_DIR;
};

export const generatePdfFromTemplate = async ({ template, data = {}, baseUrl } = {}) => {
  await ensurePdfStorage();

  const documentId = template?._id || `template-${Date.now()}`;
  const fileName = `${documentId}-${Date.now()}.pdf`;
  const filePath = path.join(GENERATED_DIR, fileName);

  const pageWidth = Number(template?.dimensions?.width || 794);
  const pageHeight = Number(template?.dimensions?.height || 1123);
  const margin = template?.page?.margin || { top: 40, right: 40, bottom: 40, left: 40 };

  const document = new PDFDocument({
    size: [pageWidth, pageHeight],
    margins: {
      top: margin.top || 0,
      left: margin.left || 0,
      bottom: margin.bottom || 0,
      right: margin.right || 0,
    },
    layout: 'portrait',
    bufferPages: true,
  });

  const stream = await new Promise((resolve, reject) => {
    const chunks = [];

    document.on('data', (chunk) => chunks.push(chunk));
    document.on('end', () => resolve(Buffer.concat(chunks)));
    document.on('error', reject);

    document.fillColor('#ffffff').rect(0, 0, pageWidth, pageHeight).fill();

    if (template?.page?.backgroundColor) {
      document.fillColor(template.page.backgroundColor).rect(0, 0, pageWidth, pageHeight).fill();
    }

    const renderLoop = async () => {
      for (const element of template?.elements || []) {
        await drawElement(document, element, data);
      }
      document.end();
    };

    renderLoop().catch(reject);
  });

  await fs.writeFile(filePath, stream);

  const resolvedBaseUrl = resolvePublicBaseUrl(baseUrl);

  return {
    url: `${resolvedBaseUrl}/generated/${fileName}`,
    mimeType: 'application/pdf',
    fileName,
    generatedAt: new Date().toISOString(),
  };
};
