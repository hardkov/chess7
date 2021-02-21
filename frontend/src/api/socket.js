import { io } from "socket.io-client";

let socket;
let moveConfirmationCallback;

function openConnection(){
    const token = localStorage.getItem("TOKEN");
    if(token == null){
        return
    }

    socket = io.connect('ws://localhost:5000', {
        query: { token }
    });

    socket.on("connect", () => {
        console.log("client has connected");
        socket.send("hello");
    });

    socket.on("moveConfirmation", (message) => {
        moveConfirmationCallback(message);
    })

    socket.emit("move", "asdjhaskjdhak");
}

export const getSocket = () => {
    if(!socket){
        openConnection();
    }    
    
    return socket;
}

export const setMoveConfirmationCallback = (callback) => {
    moveConfirmationCallback = callback;
}