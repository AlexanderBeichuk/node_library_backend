const express = require('express');
const userModel = require('../models/user');
const messages = require('../config/messages');
const responseModel = require('../config/response');
const entities = require('../config/entities');
const endpoints = require('../config/endpoints');

const router = express.Router();

router.get(`${endpoints.GET_USERS}`, (request, response) => {
   if (!request.headers) {
      responseModel.setJSON(response, 0, messages.error.NOT_AUTHORIZED);
      return;
   }
   userModel.getList((error, users) => {
      if (error) {
         responseModel.setJSON(response, 0, `${messages.error.FAILED_LOAD_LIST} ${error}`);
         return;
      }
      responseModel.setJSON(response, 1, messages.success.OK, users, `${entities.USER}s`);
   });
});

router.get(`${endpoints.GET_USER}`, (request, response, next) => {
   userModel.getById(request.params.id, (error, user) => {
      if (error) {
         responseModel.setJSON(response, 0, `${messages.error.FAILED_GET} ${error}`);
         return;
      }
      responseModel.setJSON(response, 1, messages.success.OK, user, entities.USER);
   })
});

router.put(`${endpoints.UPDATE_USER}`, (request, response, next) => {
   userModel.updateById(request.params.id, request.body, (error, user) => {
      if (error) {
         responseModel.setJSON(response, 0, `${messages.error.FAILED_UPDATE} ${error}`);
         return;
      }
      if (user) {
         responseModel.setJSON(response, 1, messages.success.UPDATED, request.body, entities.USER);
         return;
      }
      responseModel.setJSON(response, 0, messages.error.FAILED);
   });
});

router.delete(`${endpoints.DELETE_USER}`, (request, response, next) => {
   userModel.deleteById(request.params.id, (deleteError, user) => {
      if (deleteError) {
         responseModel.setJSON(response, 0, `${messages.error.FAILED_DELETE} ${deleteError}`);
         return;
      }
      if (user.result.n === 0) {
         responseModel.setJSON(response, 0, messages.error.NOT_FOUND);
         return;
      }
      userModel.getList((getListError, users) => {
         if (getListError) {
            responseModel.setJSON(response, 0, `${messages.error.FAILED_DELETE} ${getListError}`, users, `${entities.USER}s`);
         }
         responseModel.setJSON(response, 1, messages.success.OK, users, `${entities.USER}s`);
      });
   });
});

router.post(`${endpoints.SIGN_IN}`, (request, response, next) => {
   userModel.getList((getListError, users) => {
      const bearerToken = request.headers.authorization;
      const user = request.body;
      if (getListError) {
         responseModel.setJSON(response, 0, getListError);
         return
      }
      if (userModel.isValidToken(bearerToken, users)) {
         responseModel.setJSON(response, 1, messages.success.SIGN_IN, {user: user, bearerToken: bearerToken}, entities.USER);
         return;
      }
      if (userModel.isValidToken(bearerToken, users) === undefined) {
         responseModel.setJSON(response, 0, messages.error.NOT_FOUND);
         return;
      }
      if (!bearerToken) {
         userModel.add(user, (addError, newUser) => {
            if (addError) {
               responseModel.setJSON(response, 0, `${messages.error.FAILED_CREATE} ${addError}`);
               return;
            }
            responseModel.setJSON(response, 1, messages.success.ADDED, {user: user, bearerToken: userModel.sign(user)}, entities.USER);
         });
      }
   });
});

module.exports = router;
