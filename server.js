const express = require('express');
const server = express();

const postRouter = require('./data/postRouter')

server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`
  <h2>welcome to your second api</h2>
  `)
})

module.exports = server;