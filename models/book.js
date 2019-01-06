const mongoose = require('mongoose');
const entity = require('./entity');

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

const Model = mongoose.model('Book', BookSchema);

const getNewModel = (model) => {
   return new Model({
      title: model.title,
      description: model.description,
      category: model.category
   });
};

module.exports = {
   getList: (callback) =>                  { entity.getList(Model, callback) },
   getById: (id, callback) =>              { entity.getById(Model, id, callback) },
   add: (newModel, callback) =>            { entity.add(getNewModel(newModel), callback) },
   updateById: (id, newModel, callback) => { entity.updateById(Model, id, getNewModel(newModel), callback) },
   deleteById: (id, callback) =>           { entity.deleteById(Model, id, callback) }
};
