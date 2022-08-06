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
      return res.status(200).json(result);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      return res.status(400).send("Unable to fetch records");
    });
});

router.delete("/:id", (req, res, next) => {
  res.status(500).send("Unable to fetch records");
  next();
});
router.put("/:id", (req, res, next) => {
  res.status(500).send("Unable to fetch records");
  next();
});
router.patch("/:id", (req, res, next) => {
  res.status(500).send("Unable to fetch records");
  next();
});

router.post("/", async (req, res, next) => {
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
    res.status(400).send("Invalid");
    next();
  }
  if (TradeObj.shares < 0) {
    res.status(400).send("Invalid");
    next();
  }
  if (TradeObj.type != "buy" && TradeObj.type != "sell") {
    res.status(400).send("Invalid");
    next();
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
