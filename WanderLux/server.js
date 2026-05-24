const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const BASE = __dirname;

const mimeTypes = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'text/javascript',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.ico':  'image/x-icon'
};

http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(BASE, filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found: ' + req.url);
      return;
    }
    const ext = path.extname(filePath);
    const mime = mimeTypes[ext] || 'text/plain';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });

}).listen(PORT, () => {
  console.log('WanderLux running at http://localhost:' + PORT);
});