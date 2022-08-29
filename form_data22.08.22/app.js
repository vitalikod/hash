const express = require('express');
const server = express();
const  multer   =  require ('multer');

server.use(express.static(__dirname));
server.set('view engine', 'ejs');
server.set('views', './views');
server.use(multer({dest:'uploads'}).single('filedata'));
const crypto = require('crypto');
const fs = require('fs');

const fileBuffer = fs.readFileSync('./uploads/444.jpg', 'utf-8');
const hashSum = crypto.createHash('sha256');
hashSum.update(fileBuffer);

const hex = hashSum.digest('hex');

console.log('gjjgjgjgj', hex);

fs.rename('./uploads/444.jpg', `./uploads/${hex}.jpg`, (err) => {
    if (err) throw err;
    console.log('renamed complete');
    
  });

server.get('/', (req, res) => {
    res.render('main');
})
server.post('/upload', function (req, res, next) {
   
    let filedata = req.file;
    console.log(filedata);    
});
server.listen(5000);
// const filepath = path.resolve(tmpDir, shortid.generate());
// const writeStream = fs.createWriteStream(filepath);
// const hash = crypto.createHash('sha1');
// hash.setEncoding('hex');
// writeStream.pipe(writeStream);
// stream.pipe(hash);