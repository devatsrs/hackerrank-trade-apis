// Uncomment the code below to use Sequelize ORM
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

// Uncomment the code below to use Mongoose ORM
// const mongoose = require('mongoose');

// Insert your model definition below
// {
//     "id":1,
//     "type": "buy",
//     "user_id": 23,
//     "symbol": "ABX",
//     "shares": 30,
//     "price": 134,
//     "timestamp": 1531522701000
// }

module.exports = sequelize.define("trades", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: "id",
  },
  type: {
    type: Sequelize.ENUM("buy", "sell"),
    field: "type",
  },
  user_id: {
    type: Sequelize.INTEGER(11),
    field: "user_id",
  },
  symbol: {
    type: Sequelize.STRING,
    field: "user_id",
  },
  shares: {
    type: Sequelize.INTEGER(11),
    field: "shares",
  },
  price: {
    type: Sequelize.INTEGER(11),
    field: "price",
  },
  timestamp: {
    type: Sequelize.INTEGER(11),
    field: "timestamp",
  },
});

//sequelize.sync();

//module.exports = Trades;

// module.exports = sequelize.define("trades", {
//   id: {
//     type: Sequelize.INTEGER(11),
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true,
//     field: "id",
//   },
//   type: {
//     type: Sequelize.ENUM("buy", "sell"),
//     field: "type",
//   },
//   user_id: {
//     type: Sequelize.INTEGER(11),
//     field: "user_id",
//   },
//   symbol: {
//     type: Sequelize.STRING,
//     field: "user_id",
//   },
//   shares: {
//     type: Sequelize.INTEGER(11),
//     field: "shares",
//   },
//   price: {
//     type: Sequelize.INTEGER(11),
//     field: "price",
//   },
//   timestamp: {
//     type: Sequelize.INTEGER(11),
//     field: "timestamp",
//   },
// });
