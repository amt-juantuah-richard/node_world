/**
 * @openapi
 * '/api/v1/users/register':
 *  post:
 *    tags:
 *    - Register a user
 *    summary: Register a new user
 *    requestBody:
 *      required: true
 *      content: 
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Register'
 *    responses:
 *      201:
 *        description: 'Account was created Successfully. Instructions has been sent to your email <email>. Follow it to verify your account'
 *      422:
 *        description: 'username and email and password are required fields. At least one of them is missing or wrong'
 *      400:
 *        description: 'An error occurred.Something went wrong!!'
 *      500:
 *        description: 'An error occurred.Something went wrong!!'
 */

/**
 * @openapi
 * '/api/v1/users/login':
 *  post:
 *    tags:
 *    - Login as a user
 *    summary: A user logs in
 *    requestBody:
 *      required: true
 *      content: 
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Login'
 *    responses:
 *      200:
 *        description: 'Welcome Back'
 *      422:
 *        description: 'username and password are required fields. At least one of them is missing or wrong'
 *      401:
 *        description: 'An instruction was sent to your email <email> for account verification. Follow the instructions to verify your account'
 *      500:
 *        description: 'An error occurred.Something went wrong!!'
 */

/**
 * @openapi
 * '/api/v1/users/password':
 *  put:
 *    tags:
 *    - Reset Password
 *    summary: A user resets password
 *    requestBody:
 *      required: true
 *      content: 
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/UpdatePassword'
 *    responses:
 *      200:
 *        description: 'Account updated successfully'
 *      400:
 *        description: 'username, email, and new password are required fields for password updates'
 *      404:
 *        description: 'Update unsuccessful. Username or password might be wrong. Check again'
 *      401:
 *        description: 'An instruction was sent to your email <email> for account verification. Follow the instructions to verify your account'
 *      500:
 *        description: 'Something broke. Our Engineers are checking it!'
 */

/**
 * @openapi
 * '/api/v1/users/verify':
 *  put:
 *    tags:
 *    - Reset Password
 *    summary: A user resets password
 *    requestBody:
 *      required: true
 *      content: 
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/VerifyUser'
 *    responses:
 *      200:
 *        description: 'Successfully verified your account. You can log in with your credentials'
 *      422:
 *        description: 'Broken link. You have two options. Contact Documents Hub or register with a different email'
 */