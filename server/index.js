// const express = require("express");
// const cors = require("cors");

import express from "express";
import cors from "cors";

const app = express();
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0274b7952daca60c2522efb4cd7017fa5f523280388504b6ebad776f74f02ecbbd": 100,
  "03ca77d448e29438a67a3531ee4e8cdb8a71c7e3e67e937731f3ffe25830fd1e25": 50,
  "03dd86d59c0a06de0759aeaa2f763c4814bb753a170b3514f891cefd483d06f253": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
