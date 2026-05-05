/**
 * @openapi
 * components:
 *   schemas:
 *
 *     UserSubdoc:
 *       type: object
 *       required:
 *         - name
 *         - lastname
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           example: "Juan"
 *         lastname:
 *           type: string
 *           example: "Pérez"
 *         email:
 *           type: string
 *           format: email
 *           example: "juan.perez@ejemplo.com"
 *
 *     ServiceSubdoc:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Generación de documentos"
 *         description:
 *           type: string
 *           example: "Servicio para generar documentos desde plantillas"
 *
 *     Account:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           readOnly: true
 *           example: "64f1a2b3c4d5e6f7a8b9c0d1"
 *         username:
 *           type: string
 *           minLength: 3
 *           maxLength: 30
 *           example: "jperez"
 *         role:
 *           type: string
 *           enum: [dev, admin]
 *           default: dev
 *           example: "dev"
 *         password:
 *           type: string
 *           format: password
 *           writeOnly: true
 *           example: "superSecreta123"
 *         status:
 *           type: string
 *           enum: [active, suspended, inactive]
 *           default: inactive
 *           example: "inactive"
 *         token:
 *           type: string
 *           maxLength: 128
 *           default: ""
 *           description: "Token de validación de correo electrónico"
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
 *         user:
 *           $ref: '#/components/schemas/UserSubdoc'
 *         services:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ServiceSubdoc'
 *           default: []
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           example: "2024-09-01T12:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           example: "2024-09-15T08:30:00.000Z"
 *
 *     AccountCreateBody:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - user
 *       properties:
 *         username:
 *           type: string
 *           minLength: 3
 *           maxLength: 30
 *           example: "jperez"
 *         password:
 *           type: string
 *           format: password
 *           example: "superSecreta123"
 *         user:
 *           $ref: '#/components/schemas/UserSubdoc'
 *         services:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ServiceSubdoc'
 *
 *     AccountRegisterResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         code:
 *           type: string
 *           example: "S0101"
 *         message:
 *           type: string
 *           example: "Account registered successfully"
 *         data:
 *           type: object
 *           properties:
 *             account:
 *               $ref: '#/components/schemas/Account'
 */
