import { MESSAGES } from "../constants/messages.js";

const errorMessage = Object.fromEntries(MESSAGES.error.map((e) => [e.code, e]));

const errorHandlerMiddleware = (app) => {
  app.use((error, req, res, next) => {
    console.log('Error:', error);

    let code = 'EXXX';
    if (error.message.length === 5 && error.message[0] === 'E') {
      code = error.message;
    }

    const status = errorMessage[code]?.status || 500;
    const message = errorMessage[code]?.message || error.message;

    return res.status(status).json({
      success: false,
      code: code,
      message: message,
    });
  });
};

export default errorHandlerMiddleware;