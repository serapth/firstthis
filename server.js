var express = require('express'),
    server = express.createServer(),
    im = require('imagemagick'),
    files = {};

server.use('/cocos2d', express.static(__dirname + '/cocos2d') );
server.use('/cocosDenshion', express.static(__dirname + '/cocosDenshion') );
server.use('/classes', express.static(__dirname + '/classes') );
server.use('/resources', express.static(__dirname + '/resources') );

server.use(express.bodyParser());

server.get('/', function(req,res){
    res.sendfile('index.html');
    console.log('Sent index.html');
});

server.get('/settings',function(req,res){
   res.sendfile('settings.html');
   console.log('Send settings.html');
});

// API calls
server.get('/image/:name', function(req,res){
    if(files[req.params.name])
    {
        res.contentType(files[req.params.name].contentType);
        res.sendfile(files[req.params.name].path);

        console.log("Returning file" + req.params.name);
    }
});

server.get('/imageSize/:name',function(req,res){
   im.identify(files[req.params.name].path,function(err,features){
       console.log("image/" + req.params.name);
       if(err) throw err;
       else
        res.json({ "width":features.width, "height":features.height });
   });
});

server.get('/getPhotos', function(req,res){
    res.json(files);

});

server.get('/clearAll', function(req,res){
    files = {};
    res.statusCode = 200;
    res.send("");
})

server.post('/upload',function(req,res){
    files[req.files.Filedata.name] = {
        "name":req.files.Filedata.name,
        "path":req.files.Filedata.path,
        "size":req.files.Filedata.size,
        "contentType":req.files.Filedata.type,
        "description":req.body.description };
        console.log(req.files.Filedata);

    console.log(Object.keys(files).length);
    res.statusCode = 200;
    res.send("");
});
server.listen(process.env.PORT || 3000);