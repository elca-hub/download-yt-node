const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(req.url);
});

server.listen(8000, () => {
  console.log('Server is running');
});