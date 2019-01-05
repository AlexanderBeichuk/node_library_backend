const express = require('express');
const bookModel = require('../models/book');
const messages = require('../config/messages');
const responseModel = require('../config/response');

const router = express.Router();

router.get('/books', (request, response) => {
   bookModel.getList((error, books) => {
      if (error) {
         responseModel.setJSON(response, false, `${messages.error.FAILED_LOAD_LIST} ${error}`);
         return;
      }
      responseModel.write(response, true, null, {books: books});
      response.end();
   });
});

router.get('/book/:id', (request, response, next) => {
   bookModel.getById(request.params.id, (error, book) => {
      if (error) {
         responseModel.setJSON(response, false, `${messages.error.FAILED_GET} ${error}`);
         return;
      }
      responseModel.setJSON(response, true, messages.success.SUCCESS, {book: book});
      response.end();
   })
});

router.post('/book/add', (request, response, next) => {
   const requestBody = request.body;
   const newBook = bookModel.getNewBook(requestBody.title, requestBody.description, requestBody.category);

   bookModel.add(newBook,(error, book) => {
      if (error) {
         responseModel.setJSON(response, false, `${messages.error.FAILED_CREATE} ${error}`);
         return;
      }
      responseModel.setJSON(response, true, messages.success.ADDED, {book: book});
   });

});

router.delete('/book/delete/:id', (request, response, next) => {
   bookModel.deleteById(request.params.id, (error, book) => {
      if (error) {
         responseModel.setJSON(response, false, `${messages.error.FAILED_DELETE} ${error}`);
         return;
      }
      else if (book) {
         responseModel.setJSON(response, true, messages.success.DELETED, {book: book});
         return;
      }
      responseModel.setJSON(response, false, messages.error.FAILED);
   })
});

//TODO dont worked
router.put('/book/update/:id', (request, response, next) => {
   const requestBody = request.body;
   const newBook = bookModel.getNewBook(requestBody.title, requestBody.description, requestBody.category);

   bookModel.updateById(request.params.id, newBook, (error, book) => {
      if (error) {
         responseModel.setJSON(response, false, `${messages.error.FAILED_UPDATE} ${error}`);
         return;
      }
      else if (book) {
         responseModel.setJSON(response, true, messages.success.UPDATED, {book: book});
         return;
      }
      responseModel.setJSON(response, false, messages.error.FAILED);
   });
});

module.exports = router;