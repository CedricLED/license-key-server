const Key = require('../models').Key;
const uuidv4 = require('uuid/v4');


module.exports = {
  create(req, res) {
    return Key
      .create({
        guid: uuidv4(),
        email: "beta@test",
        status: "beta",
      })
      .then(Key => res.status(200).send(Key))
      .catch(error => res.status(400).send(error));
  },
  verify(req, res) {
    return Key
      .find({
        where: {
          guid: req.body.guid,
          uuid: req.body.uuid,
        },
      })
      .then(Key => {
        if (!Key) {
          return res.status(404).send({
            message: 'Key Not Found',
          });
        }
        res.status(200).send(Key);
      })
      .catch(error => res.status(400).send(error));
  },
  attach(req, res) {
    return Key
      .find({
        where: {
          guid: req.body.guid,
        },
      })
      .then(Key => {
        if (!Key) {
          return res.status(404).send({
            message: 'Key Not Found',
          });
        }

        return Key
          .update({
            uuid: req.body.uuid,
          })
          .then(updatedKey => res.status(200).send(updatedKey))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  detach(req, res) {
    return Key
      .find({
        where: {
          guid: req.body.guid,
          uuid: req.body.uuid,
        },
      })
      .then(Key => {
        if (!Key) {
          return res.status(404).send({
            message: 'Key Not Found',
          });
        }

        return Key
          .update({
            uuid: null,
          })
          .then(updatedKey => res.status(200).send(updatedKey))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
