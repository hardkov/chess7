const express = require("express");
const crypto = require("crypto");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const router = express.Router();
const jsonParser = bodyParser.json();

jwtSecret = "tajemniczy_sekret";

// tmp databse
let users = []

//

// API

// register
router.post('/user/register', jsonParser, (req, res) => {

    let salt = crypto.randomBytes(16).toString('base64');
    
    let hash = crypto.createHmac('sha512', salt)
                                .update(req.body.password)
                                .digest("base64");

    req.body.password = salt + "$" + hash;
    
    let userId = users.length.toString();
    users.push({
        id: userId,
        username: req.body.username,
        passwordHash: req.body.password,
    })

    res.status(201).end();
});


// login
router.post('/user/login', jsonParser, checkCredentialsMatch, (req, res) =>{
    let refresherId = req.body.id;
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(refresherId).digest('base64');
    req.body.refresherKey = salt;
    let token = jwt.sign(req.body, jwtSecret);
    let b = Buffer.from(hash);
    let refresherToken = b.toString('base64');

    res.status(201).send({
        accessToken: token,
        refresherToken: refresherToken
    })
});

function checkCredentialsMatch(req, res, next){
    //find by login
    let userToBeLogged;

    for(let user of users){
        if(user.username === req.body.username) userToBeLogged = user;
    }

    if(userToBeLogged){
        let passwordFields = userToBeLogged.passwordHash.split('$');
        let salt = passwordFields[0];
        let hash = crypto.createHmac('sha512', salt)
                                    .update(req.body.password)
                                    .digest('base64');
        if(hash === passwordFields[1]){
            req.body = {
                id: userToBeLogged.id,
                username: userToBeLogged.username,
            }
            return next();
        } else {
            return res.status(400).send({errors: ['Invalid credentials']});
        }
    } else {
        return res.status(404).send({errors: ["No such user. Register first"]});
    }
}

// list users
router.get("/user/list", vaildateJWT, (req, res) => {
    res.json({
        userList: users
    })
})

// logout (unvalidate token)


// validation
function vaildateJWT(req, res, next){
    if(req.headers['authorization']){
        try{
            let authorization = req.headers['authorization'].split(' ');
            console.log(authorization)
            if(authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else{
                req.jwt = jwt.verify(authorization[1], jwtSecret);
                return next();
            }
        } catch(err){
            res.status(403).send();
        }

    } else{
        return res.status(403).send();
    }
}

module.exports = {
    router: router,
    vaildateJWT: vaildateJWT
}