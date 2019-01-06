const express = require('express');
const bookModel = require('../models/book');
const messages = require('../config/messages');
const responseModel = require('../config/response');
const entities = require('../config/entities');
const endpoints = require('../config/endpoints');

const router = express.Router();

router.get(`${endpoints.GET_BOOKS}`, (request, response) => {
   bookModel.getList((error, books) => {
      if (error) {
         responseModel.setJSON(response, false, `${messages.error.FAILED_LOAD_LIST} ${error}`);
         return;
      }
      responseModel.setJSON(response, true, messages.success.OK, books, `${entities.BOOK}s`);
   });
});

router.get(`${endpoints.GET_BOOK}`, (request, response, next) => {
   bookModel.getById(request.params.id, (error, book) => {
      if (error) {
         responseModel.setJSON(response, false, `${messages.error.FAILED_GET} ${error}`);
         return;
      }
      responseModel.setJSON(response, true, messages.success.OK, book, entities.BOOK);
   })
});

router.post(`${endpoints.ADD_BOOK}`, (request, response, next) => {
   bookModel.add(request.body,(error, book) => {
      if (error) {
         responseModel.setJSON(response, false, `${messages.error.FAILED_CREATE} ${error}`);
         return;
      }
      responseModel.setJSON(response, true, messages.success.ADDED, book, entities.BOOK);
   });
});

router.put(`${endpoints.UPDATE_BOOK}`, (request, response, next) => {
   bookModel.updateById(request.params.id, request.body, (error, book) => {
      if (error) {
         responseModel.setJSON(response, false, `${messages.error.FAILED_UPDATE} ${error}`);
         return;
      }
      else if (book) {
         responseModel.setJSON(response, true, messages.success.UPDATED, request.body, entities.BOOK);
         return;
      }
      responseModel.setJSON(response, false, messages.error.ERROR);
   });
});

router.delete(`${endpoints.DELETE_BOOK}`, (request, response, next) => {
   bookModel.deleteById(request.params.id, (deleteError, book) => {
      if (deleteError) {
         responseModel.setJSON(response, false, `${messages.error.FAILED_DELETE} ${deleteError}`);
         return;
      }
      if (book.result.n === 0) {
         responseModel.setJSON(response, false, messages.error.NOT_FOUND);
         return;
      }
      bookModel.getList((getListError, books) => {
         if (getListError) {
            responseModel.setJSON(response, false, `${messages.error.FAILED_DELETE} ${getListError}`, books, `${entities.BOOK}s`);
         }
         responseModel.setJSON(response, true, messages.success.OK, books, `${entities.BOOK}s`);
      });
   });
});

module.exports = router;
