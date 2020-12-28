const express = require('express');
const socketio = require('socket.io');
const path = require("path");

const userRouter = require("./routes/user.js").router;
const gameRouter = require("./routes/game.js"); 
const { response } = require('express');

const port = process.env.PORT || 5000;
const app = express();

//tmp cors enabling
const cors = require('cors')
app.use(cors())


// app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(userRouter);
app.use(gameRouter);

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// })



const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// const io = socketio(server);

// io.on('connection', socket => {
//     console.log("New user connected");

//     socket.username = 'Anonymous';

//     socket.on('change_username', data => {
//         socket.username = data.username
//     })
// })

