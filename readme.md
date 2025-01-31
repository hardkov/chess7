# ♚ Chess7 ♚
Play chess with your friends on chess7!

## Technologies 
* **Backend** Node.js + Express.js
* **Database** MongoDB + Mongoose 
* **Real-time communication** Socket.js
* **Frontend** React.js + Material UI + Chessboard.jsx
* **Testing** Jest

## Features
* 👤 Setting up an account
* ♜  Playing chess
* 📺 Watching live games
* 🔔 Real time notifications
* 🌔 Dark/light mode

## Overview
### Account and notifications
![login](readme_files/login.gif)
![login_error](readme_files/login_error.gif)
![notification](readme_files/notification.gif)
### Games
![playing](readme_files/playing.gif)
![challenge_error](readme_files/challenge_error.gif)  
![watching](readme_files/watching.gif)
### Dark mode
![darkmode](readme_files/darkmode.gif)

## Issues
* Kind of weird on mobile, but usable

## TODO
* Game history
* User profile
* Multilingualism

## Run locally
* Clone the repositiory
```bash
git clone https://github.com/hardkov/chess7.git
```
* Set endpoints on frontend
```bash
vim frontend/src/services/config.js
```
```js
// wherever your server is
axios.defaults.baseURL = "http://localhost:5000";
const SOCKET_BASE_URL = "ws://localhost:5000";
```
* Configure backend (server port, database uri, jwt secret)
```bash
vim backend/.env

PORT=
MONGODB=""
JWT=""
