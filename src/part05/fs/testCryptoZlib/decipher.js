var crypto = require('crypto');
var fs = require('fs');
var zlib = require('zlib');

var password = new Buffer(process.env.PASS || 'password');
var decryptStream = crypto.createDecipher('aes-256-cbc', password);

var gzip = zlib.createGunzip();
var readStream = fs.createReadStream(__dirname + '/out.gz');

readStream
  .pipe(gzip) // uncompresses
  .pipe(decryptStream) // decrypts
  .pipe(process.stdout) // writes to terminal
  .on('finish', function () {
    console.log('decrypt and unzip done'); // not print
  })