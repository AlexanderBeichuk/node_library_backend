module.exports = {

   getList: (model, callback) => {
      model.find(callback);
   },

   getById: (model, id, callback) => {
      model.findById(id, callback);
   },

   add: (newModel, callback) => {
      newModel.save(callback);
   },

   updateById: (model, id, newModel, callback) => {
      const upsertBook = newModel.toObject();
      delete upsertBook._id;
      model.update({ _id: id }, upsertBook, { multi: false }, callback);
   },

   deleteById: (model, id, callback) => {
      model.remove({ _id: id }, callback);
   }

};
