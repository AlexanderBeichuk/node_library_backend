const getNewResponse = (isSuccess, message, params) => {
   const responseObject = {
      success: isSuccess,
      message: message
   };
   if (params) {
      responseObject.params = params;
   }
   return responseObject;
};

const setJSON = (response, isSuccess, message, params) => {

   response.json(getNewResponse(isSuccess, message, params));
};

const write = (response, isSuccess, message, params) => {
   response.write(
      JSON.stringify(getNewResponse(isSuccess, message, params), null, 2)
   );
};

module.exports = {
   setJSON: setJSON,
   write: write
};
