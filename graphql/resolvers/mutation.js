const { models } = require('../../models');

module.exports = {
  // User
  createUser(root, { input }) {   //context вроде как нигде не нужен//
    return models.User.create(input);
  },

  updateUser(root, { id, input }) {
    return models.User.findById(id)
      .then(user => user.update(input)); //более компактная запись, скобки и return не нужны, т.к. возвращаем 1 переменную//
      },

  removeUser(root, { id }) {
    return models.User.findById(id)
      .then(user => user.destroy());
  },

  // Room
  createRoom(root, { input }) {
    return models.Room.create(input);
  },

  updateRoom(root, { id, input }) {
    return models.Room.findById(id)
      .then(room => room.update(input)); //более компактная запись, скобки и return не нужны, т.к. возвращаем 1 переменную//
  },

  removeRoom(root, { id }) {
    return models.Room.findById(id)
      .then(room => room.destroy());
  },

  // Event
  createEvent(root, { input, usersIds, roomId }) {
    return models.Event.create(input)
      .then(event => {
        event.setRoom(roomId);

        return event.setUsers(usersIds)
          .then(() => event);
      });
  },

  updateEvent(root, { id, input }) {
    return models.Event.findById(id)
      .then(event => event.update(input)); //более компактная запись, скобки и return не нужны, т.к. возвращаем 1 переменную//
  },

  removeUserFromEvent(root, { id, userId }) {
    return models.Event.findById(id)
      .then(event => {
        event.removeUser(userId);
        return event;
      });
  },

  addUserToEvent(root, { id, userId }) { //этой функции вообще не было, я написала//
    return models.Event.findById(id)
      .then(event => event.addUser(userId)
          .then(() => event))
  },

  changeEventRoom(root, { id, roomId }) {
    return models.Event.findById(id)
      .then(event => {
        event.setRoom(roomId); 
        return event; //ничего не возвращалось, поправила//
      });
  },

  removeEvent(root, { id }) {
    return models.Event.findById(id)
      .then(event => event.destroy());
  }
};
