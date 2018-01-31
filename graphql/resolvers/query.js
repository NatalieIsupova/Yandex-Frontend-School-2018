const { models } = require('../../models');

module.exports = {
  event(root, { id }) {
    return models.Event.findById(id);
  },
  events() { //в принципе, аргументы в этой функции нам не нужны, поэтому удаляем args, context и заглушку root для первого места//
    return models.Event.findAll();
  },
  user(root, { id }) {
    return models.User.findById(id);
  },
  users() { //аналогично events//
    return models.User.findAll();
  },
  room(root, { id }) {
    return models.Room.findById(id);
  },
  rooms() { //аналогично events и users//
    return models.Room.findAll();
  }
};
