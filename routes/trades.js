const express = require("express");
const { where } = require("mongoose/lib/model");
const Trades = require("../models/trades");
const router = express.Router();

router.get("/", (req, res, next) => {
  Trades.findAll()
    .then((result) => {
      if (!result) {
        return Promise.reject("No data found!");
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.status(400).send("Unable to fetch records");
      next(err);
    });
});

router.get("/:id", (req, res, next) => {
  Trades.find(where({ id: req.params.id }))
    .then((result) => {
      if (!result) {
        return Promise.reject("No data found!");
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.status(400).send("Unable to fetch records");
      next(err);
    });
});

router.post("/", async (req, res, next) => {
  /*
    // - creates a new trade
    // - expects a JSON trade object without an id property as a body payload. 
            If the shares value is out of accepted range [1, 100], or the type value is invalid (i.e. not 'buy' or 'sell'), the API must return error code 400.
             Besides those cases, you can assume that the given payload is always valid.
    // - adds the given trade object to the collection of trades and assigns a unique integer id to it.
     The first created trade must have id 1, the second one 2, and so on.
    // - the response code is 201, and the response body is the created trade object
*/
  // const user23_buy_ABX = {
  //     "type": "buy",
  //     "user_id": 23,
  //     "symbol": "ABX",
  //     "shares": 30,
  //     "price": 134,
  //     "timestamp": 1531522701000
  // }
  const d = new Date();
  const timestamp = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDay()
  ).getTime();

  post = req.body;
  console.log(post);

  const TradeObj = {
    type: req.body.type,
    user_id: req.body.user_id,
    symbol: req.body.symbol,
    shares: req.body.shares,
    price: req.body.price,
    timestamp: timestamp,
  };
  if (TradeObj.shares > 100) {
    return res.status(400).send("Invalid");
  }
  if (TradeObj.shares < 0) {
    return res.status(400).send("Invalid");
  }
  if (TradeObj.type != "buy" && TradeObj.type != "sell") {
    return res.status(400).send("Invalid");
  }

  Trades.sync()
    .then(function () {
      return Trades.create(TradeObj);
    })
    .then(function (data) {
      return res.status(201).json(data);
    });
});

module.exports = router;
