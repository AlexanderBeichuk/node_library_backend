const mongoose = require('mongoose');
const entity = require('./entity');
const jwt = require('../config/jwt');

const UserSchema = mongoose.Schema({
   email: {
      type: String,
      required: true,
      unique: true
   },
   gmailId: {
      type: String,
      required: true,
      unique: true
   },
   nickname: {
      type: String,
      required: true
   },
   avatar: String
});

const Model = mongoose.model('User', UserSchema);

const getNewModel = (model) => {
   return new Model({
      email: model.email,
      gmailId: model.gmailId,
      nickname: model.nickname,
      avatar: model.avatar
   });
};

module.exports = {
   isValidToken: (token, users) => {
      const decodedToken = jwt.verify(token);
      if (decodedToken) {
         const index = users.findIndex(user => user._doc.gmailId === decodedToken.gmailId);
         return index > -1;
      }
      return undefined;
   },
   sign: (model) =>                        { return jwt.sign(model) },
   getList: (callback) =>                  { entity.getList(Model, callback) },
   getById: (id, callback) =>              { entity.getById(Model, id, callback) },
   add: (newModel, callback) =>            { entity.add(getNewModel(newModel), callback) },
   updateById: (id, newModel, callback) => { entity.updateById(Model, id, getNewModel(newModel), callback) },
   deleteById: (id, callback) =>           { entity.deleteById(Model, id, callback) }
};
