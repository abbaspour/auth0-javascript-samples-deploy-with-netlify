const { createValidator } = require('@serverless-jwt/netlify');

// Set up validator with options
const validator = createValidator({
    issuer: process.env.AUTH0_ISSUER,       // JWT issuer
    audience: process.env.AUTH0_AUDIENCE,   // Expected audience
});

exports.handler = async (event, context) => {
    try {
        // Validate the token in the Authorization header
        const claims = await validator(event);

        // If validation is successful, return a success response
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'JWT is valid', claims })
        };
    } catch (error) {
        // Handle validation errors
        return {
            statusCode: 401,
            body: JSON.stringify({ error: 'Invalid token or audience', details: error.message })
        };
    }
};