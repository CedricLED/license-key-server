'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customers = sequelize.define('Customers', {
    uuid: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Customers.associate = function(models) {
    // associations can be defined here
  };
  return Customers;
};