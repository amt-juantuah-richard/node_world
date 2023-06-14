/**
 * @openapi
 * components:
 *  schemas:
 *      Register:
 *          type: object
 *          required:
 *              - username
 *              - email
 *              - password
 *          properties:
 *              username:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *      Login:
 *          type: object
 *          require:
 *              - username
 *              - password
 *          properties:
 *              username:
 *                  type: string
 *              password:
 *                  type: string
 *      UpdatePassword:
 *          type: object
 *          require:
 *              - username
 *              - email
 *              - newPassword
 *          properties:
 *              username:
 *                  type: string
 *              email:
 *                  type: string
 *              newPassword:
 *                  type: string
 *      VerifyUser:
 *          type: object
 *          require:
 *              - username
 *              - email
 *              - token
 *          properties:
 *              username:
 *                  type: string
 *              email:
 *                  type: string
 *              token:
 *                  type: string
 *          
 */