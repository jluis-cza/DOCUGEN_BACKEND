/**
 * @openapi
 * tags:
 *   - name: Admission
 *     description: Registro, verificación y acceso de cuentas
 */

/**
 * @openapi
 * /adm/register:
 *   post:
 *     tags: [Admission]
 *     summary: Registrar una nueva cuenta
 *     description: >
 *       Crea una nueva cuenta en el sistema. Verifica que el email y el username
 *       no estén previamente registrados. Genera un token de verificación
 *       y lo asocia a la cuenta creada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AccountCreateBody'
 *           example:
 *             username: "jperez"
 *             password: "superSecreta123"
 *             user:
 *               name: "Juan"
 *               lastname: "Pérez"
 *               email: "juan.perez@ejemplo.com"
 *     responses:
 *       201:
 *         description: Cuenta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccountRegisterResponse'
 *             example:
 *               success: true
 *               code: "S0101"
 *               message: "Account registered successfully"
 *               data:
 *                 account:
 *                   _id: "64f1a2b3c4d5e6f7a8b9c0d1"
 *                   username: "jperez"
 *                   role: "dev"
 *                   status: "inactive"
 *                   user:
 *                     name: "Juan"
 *                     lastname: "Pérez"
 *                     email: "juan.perez@ejemplo.com"
 *                   services: []
 *                   createdAt: "2024-09-01T12:00:00.000Z"
 *                   updatedAt: "2024-09-01T12:00:00.000Z"
 *       400:
 *         description: Body ausente o vacío — error E0112
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               code: "E0112"
 *               message: "Request body is missing or empty"
 *       409:
 *         description: Email o username ya registrados — error E0103
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               code: "E0103"
 *               message: "Account already exists"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
