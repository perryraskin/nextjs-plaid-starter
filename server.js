const dotenv = require('dotenv').config();
const next = require('next');
const express = require("express");

const port = parseInt(process.env.PORT, 10) || 3001;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const {
    receivePublicToken,
    getTransactions
  } = require("./controllers/controller");

  const server = express();

  server.use(express.json());

  server.use('/', express.static('../public'));

  // Get the public token and exchange it for an access token
  server.post("/auth/public_token", receivePublicToken);

  // Get Transactions
  server.get("/transactions", getTransactions);

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on ${port}`);
  });
});
