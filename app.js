// ENTRY POINT
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const ffmpeg = require('ffmpeg');
const app = express()
const fs = require('fs')
var multer = require('multer')


// app.use(bodyParser.urlencoded({ limit: '50mb',extended: true ,parameterLimit: 100000}));
// app.use(express.json());
app.use(cors());
let fpath = null;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, './assets')
},
filename: function (req, file, cb) {
  fpath = Date.now() + '-' +file.originalname;
  cb(null, fpath )
}
});

var upload = multer({ storage: storage }).single('file');


app.post('/convertToaudio', (req, res) => {

  upload(req, res , function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }


   let file_ =  null
    convertToaudio( './assets/'+fpath ,success => {
     console.log('call  '+success)
     file_ = success
    //  res.send({ file: success})
     res.sendFile(   __dirname +'/assets/savedFile5.mp3')
   } )

   console.log(__dirname)

// res.send({ file: file_})

}) 
})


convertToaudio =  ( fileAudio , success ) => {

let converted_file = null;
console.log("suces "+fileAudio);
  try {
    var process = new ffmpeg(fileAudio);
  return  process.then(function (video) {
        // Callback mode
        console.log("suces");
        
  return  video.fnExtractSoundToMP3( './assets/savedFile5', function (error, files) {
            
            if (!error)
            {
                console.log("suces");
                console.log('Audio file: ' + files);
                converted_file = files;
                return success( files )
            }
            else
            console.log(error );
           
                
        });
    }, function (err) {
        console.log('Error: ' + err);
    });
} catch (e) {
    console.log(e.code);
    console.log(e.msg);
}

console.log('www   ',converted_file);


return converted_file;
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`))
