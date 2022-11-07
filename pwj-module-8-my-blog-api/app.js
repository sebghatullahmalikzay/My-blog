const express = require("express");
const app = express();
const Post = require("./api/models/post");
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
});



const getExt = (mineType) => {
    switch (mineType) {
        case "image/png":
            return ".png";
        case "image/jpeg":
            return ".jpeg";
    }

}


var upload = multer({ storage: storage });

const postData = new Post();


app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
})
app.use('/uploads', express.static('uploads'));



app.get("/api/post", (req, res) => {
    res.status(200).send(postData.get());

});


app.get("/api/post/:post_id", (req, res) => {
    const postId = req.params.post_id;
    const foundpost = postData.getindividualBlog(postId);
    if (foundpost) {
        res.status(200).send(foundpost);
    } else {
        res.status(404).send("Not found");
    }
})



app.post("/api/post", upload.single("post-image"), (req, res) => {

    console.log(req.body);
    console.log(req.file);

    const newPost = {
        "id": `${Date.now()}`,
        "title": req.body.title,
        "content": req.body.content,
        "post_image": req.file.path,
        "added_date": `${Date.now()}`
    }
    postData.add(newPost);

    res.status(201).send("ok");
})





app.listen(4000, () => {
    console.log("the http://localhost:4000 server is started");
})