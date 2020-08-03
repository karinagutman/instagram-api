const express = require('express');
const users = require('../controllers/users')
const posts = require('../controllers/posts');
const auth = require('../middlewares/auth'); 
var multer  = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/posts')
	},
	filename: function (req, file, cb) {
        const nameArr = file.originalname.split('.');
        const extension = nameArr[nameArr.length - 1]; //gets the last . extension
        let filename = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); // gives the rendon  name
		cb(null, filename + '.' + extension);
	}
})
const upload = multer({ storage: storage });
const routes = express.Router();

routes.get("/users", users.getAll);
routes.put("/users", users.create);
routes.post('/users/login',users.login);
routes.get('/users/me',auth, users.me);
routes.get('/users/check', users.check);
routes.get('/users/:id', users.getUser);
routes.get('/users/:id/posts', users.getPostsById);                       //gets spesific post



routes.put("/posts",auth, upload.single('image'), posts.create);
routes.get("/posts", posts.getAll);
routes.post('/posts/:id/likes', auth, posts.like);
routes.delete('/posts/:id/likes/:userId', auth, posts.unlike);
routes.get('/posts/:id', posts.getPosts);    
routes.put('/posts/:id/comment', posts.addComment);                            
routes.get('/posts/:id/comment', posts.getComments);


routes.get('/health',(req,res) => { 
    res.send();

});

module.exports = routes;