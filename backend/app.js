const express = require('express');
const socketio = require('socket.io');
const path = require("path");

const userRouter = require("./routes/user.js").router;
const gameRouter = require("./routes/game.js"); 
const { response } = require('express');

const port = process.env.PORT || 5000;
const app = express();

//tmp cors enabling
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//

// app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(userRouter);
app.use(gameRouter);

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// })



const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const io = socketio(server);

io.on('connection', socket => {
    console.log("New user connected");

    socket.username = 'Anonymous';

    socket.on('change_username', data => {
        socket.username = data.username
    })
})

// app.get('/api', (req, res) => {
//     res.json({
//         message: 'Welcome to the api'
//     })
// })

// app.post('/api/posts', verifyToken, (req, res) => {
//     jwt.verify(req.token, 'secretkey', (err, authData) => {
//         if(err){
//             res.sendStatus(403);
//         } else {
//             res.json({
//                 message: "Post created...",
//                 authData: authData
//             })
//         }
//     }); 
// })

// app.post("/api/login", (req, res) => {
//     // Mock user
//     const user = {
//         id: 1,
//         username: "Brad",
//         email: "brad@gmail.com",
//     }

//     jwt.sign({user: user}, "secretkey", {expiresIn: '30s'}, (err, token) =>{
//         res.json({
//             token: token
//         })
//     });
// })

// // FORMAT OF TOKEN
// // Authorization: Bearer <access_token>


// // Verify token
// function verifyToken(req, res, next) {
//     // Get auth header value
//     const bearerHeader = req.headers['authorization'];
//     // Check if bearer is undefined
//     if(typeof bearerHeader !== 'undefined'){
//         // Split at the space
//         const bearer = bearerHeader.split(' ');

//         const bearerToken = bearer[1];

//         req.token = bearerToken;

//         next()
//     } else{
//         // Forbidden
//         res.sendStatus(403);
//     }
// }

// app.listen(5000, () => {
//     console.log("Server started on port 5000");
// });
