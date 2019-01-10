const messages = require('./messages');

const getNewResponse = (response, isSuccess, message, params, paramKey) => {
   const responseObject = {
      success: isSuccess,
      message: message || (isSuccess ? messages.success.OK : messages.error.FAILED),
      status: response.statusCode
   };
   if (params !== undefined) {
      responseObject[paramKey] = params;
   }
   return responseObject;
};

module.exports = {
   setJSON: (response, isSuccess, message, params, paramsKey) => {
      response.json(getNewResponse(response, isSuccess, message, params, paramsKey));
      response.end();
   }
};
