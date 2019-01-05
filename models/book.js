const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   description: String,
   category: {
      type: String,
      required: true,
      enum: ['js', 'algorithms', 'angular', 'vue']
   }
});

const Book = mongoose.model('Book', BookSchema);

const getNewBook = (title, description, category) => {
   return new Book({
      title: title,
      description: description,
      category: category
   });
};

const getList = (callback) => {
   Book.find(callback);
};

const add = (newBook, callback) => {
   newBook.save(callback);
};

const deleteById = (id, callback) => {
   Book.remove(
      {
         _id: id
      },
      callback
   );
};

const updateById = (id, book, callback) => {
   Book.findByIdAndUpdate(id, book, callback);
};

const getById = (id, callback) => {
   Book.findById(id, callback);
};

module.exports = {
   Book: Book,
   getNewBook: getNewBook,
   add: add,
   getList: getList,
   getById: getById,
   updateById: updateById,
   deleteById: deleteById
};
