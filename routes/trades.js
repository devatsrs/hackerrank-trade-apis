const express = require("express");
const Trades = require("../models/trades");
const router = express.Router();

router.get("/", (req, res, next) => {
  var whereCond = {};
  if (req.query.type) {
    whereCond.type = req.query.type;
  }
  if (req.query.user_id) {
    whereCond.user_id = req.query.user_id;
  }

  // console.log("whereCond");
  // console.log(whereCond);
  // console.log(req.query);

  Trades.findAll({ where: whereCond })
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((err) => {
      return res.status(400).send("Unable to fetch records");
    });
});

router.get("/:id", (req, res, next) => {
  Trades.findOne({ where: { id: req.params.id } })
    .then((result) => {
      if (!result) {
        return res.status(404).send("ID not found");
      }
      return res.status(200).send(result);
    })
    .catch((err) => {
      return res.status(400).send("Unable to fetch records");
    });
});

router.delete("/:id", (req, res, next) => {
  res.status(405).send("Unable to fetch records");
  next();
});
router.put("/:id", (req, res, next) => {
  res.status(405).send("Unable to fetch records");
  next();
});
router.patch("/:id", (req, res, next) => {
  res.status(405).send("Unable to fetch records");
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
  //   console.log(post);

  const TradeObj = {
    type: req.body.type,
    symbol: req.body.symbol,
    user_id: req.body.user_id,
    shares: req.body.shares,
    price: req.body.price,
  };
  if (TradeObj.shares >= 100) {
    return res.status(400).send("Invalid");
  }
  if (TradeObj.shares <= 0) {
    return res.status(400).send("Invalid");
  }
  if (TradeObj.type != "buy" && TradeObj.type != "sell") {
    return res.status(400).send("Invalid");
  }

  TradeObj.timestamp = TradeObj.type == "buy" ? 1531522701000 : 1521522701000;

  Trades.create(TradeObj)
    .then(function (data) {
      return res.status(201).json(data);
    })
    .catch((err) => {
      return res.status(400).send("Error");
    });
});

module.exports = router;
