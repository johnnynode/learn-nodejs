var crypto = require('crypto');
var fs = require('fs');
var zlib = require('zlib');

var password = new Buffer(process.env.PSS || 'password');
var encryptStream = crypto.createCipher('aes-256-cbc', password);

var gzip = zlib.createGzip();
var readStream = fs.createReadStream(__dirname + '/read.txt');
var writeStream = fs.createWriteStream(__dirname + '/out.gz');

readStream
  .pipe(encryptStream)
  .pipe(gzip)
  .pipe(writeStream)
  .on('finish', function () {
    console.log('encrypt and gzip done');
  })