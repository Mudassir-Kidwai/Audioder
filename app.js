// ENTRY POINT
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const ffmpeg = require('ffmpeg');
const app = express()
const fs = require('fs') 
var multer = require('multer') 
const ThumbnailGenerator = require('video-thumbnail-generator').default
 
// app.use(bodyParser.urlencoded({ limit: '50mb',extended: true ,parameterLimit: 100000}));
// app.use(express.json());
app.use(cors());
let fpath = null;
let _number = 0

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, './videos')
},
filename: function (req, file, cb) {
  fpath = Date.now() + '-' +file.originalname;
  cb(null, fpath )
}
});

var upload = multer({ storage: storage }).single('file');


app.post('/convertToaudio', (req, res) => {

  _number = randomIntFromInterval( 1, 1000 )

  upload(req, res , function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }


   let file_ =  null
    convertToaudio( './videos/'+fpath ,success => {
     console.log('call  '+success)
     file_ = success
    //  res.send({ file: success})
     res.sendFile(   __dirname +`/videos/savedFile${_number}.mp3`)
   } )

   console.log(__dirname)

 

}) 
})


app.post('/convertTogif', (req, res) => {

  _number = randomIntFromInterval( 1, 1000 )

  upload(req, res , function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }


   let file_ =  null
    convertToGif( './videos/'+fpath ,success => {
     console.log('call  '+success)
    
    //  res.send({ file: success})
     res.sendFile(   __dirname +`/videos/files/${success}`)
   } )

   console.log(__dirname)

}) 
})

app.post('/onlyVideo', (req, res) => {

  _number = randomIntFromInterval( 1, 1000 )

  upload(req, res , function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }


   let file_ =  null
    convertToVideo( './videos/'+fpath ,success => {
     console.log('call  '+success)
    //  file_ = success
    //  res.send({ file: success})
    let name = fpath.split('.')
     res.sendFile(   __dirname +`/videos/savedVideo${_number}.${name[1]}`)
   } )

   console.log(__dirname)

}) 
})



 randomIntFromInterval = ( min, max ) => { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

convertToaudio =  ( fileAudio , success ) => {

let converted_file = null;
console.log("suces "+fileAudio);
  try {
    var process = new ffmpeg(fileAudio);
  return  process.then(function (video) {
        // Callback mode
        console.log("suces");
        
  return  video.fnExtractSoundToMP3( `./videos/savedFile${_number}.mp3`, function (error, files) {
            
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

convertToVideo =  ( fileAudio , success ) => {

let converted_file = null;
console.log("suces "+fileAudio);

 

try {
	var process = new ffmpeg(fileAudio);
	process.then(function (video) {
    
    let name = fpath.split('.')
    
		video
	  .setDisableAudio()
		.save(`videos/savedVideo${_number}.${name[1]}`, function (error, file) {
      if (!error)
      {
        console.log('Video file: ' + file);
        return success( true )
      }
			
		});

	}, function (err) {
		console.log('Error: ' + err);
	});
} catch (e) {
	console.log(e.code);
	console.log(e.msg);
}


}

convertToGif = async  ( fileAudio , success ) => {
 
  const tg = new ThumbnailGenerator({
    sourcePath: fileAudio,
    thumbnailPath: './videos/files', //only required if you can't write to /tmp/ and you need to generate gifs
  });

  tg.generateGif({
    fps: 1, //how many frames per second you want in your gif
    scale: 500, //the smaller the number, the smaller the thumbnail
    speedMultiple: 4, //this is 4x speed
    deletePalette: true //to delete the palettefile that was generated to create the gif once gif is created 
 }).then(d=>{
   let _d = d.split('/')
   return success(_d[3])
 });
  // return success(metadata)
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`))
