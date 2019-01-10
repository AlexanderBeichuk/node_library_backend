const jwt = require('jsonwebtoken');

const BEARER = 'Bearer: ';
const KEY_SUCCESS = 'wrong-secret';

module.exports = {

   sign: (object) => {
      return jwt.sign(object, KEY_SUCCESS, (error, token) => {
         if (error) {
            return null;
         }
      });
   },

   verify: (token) => {
      const parseToken = token.indexOf(BEARER) === 0 ? token.substr(BEARER.length) : token;
      return jwt.verify(parseToken, KEY_SUCCESS, (error, token) => {
         if (error) {
            return null;
         }
      });
   }

};
