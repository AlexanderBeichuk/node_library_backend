const getNewResponse = (response, isSuccess, message, params, paramKey) => {
   const responseObject = {
      success: isSuccess,
      message: message ? message : response.statusMessage,
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
