const express = require('express')

const app = express()

const port = process.env.PORT || 8080

const users = [
    {
        "id" : 1,
        "name" : "Carl Roksvåg",
        "gender" : "male",
        "image" : "https://randomuser.me/api/portraits/men/46.jpg"
    },
    {
        "id" : 2,
        "name" : "Åse Vatne",
        "gender" : "female",
        "image" : "https://randomuser.me/api/portraits/women/69.jpg"
    },
    {
        "id" : 3,
        "name" : "Svenja Leclercq",
        "gender" : "female",
        "image" : "https://randomuser.me/api/portraits/women/41.jpg"
    },
    {
        "id" : 4,
        "name" : "Xavier Ferrer",
        "gender" : "male",
        "image" : "https://randomuser.me/api/portraits/men/11.jpg"
    },
    {
        "id" : 5,
        "name" : "Justine Novak",
        "gender" : "female",
        "image" : "https://randomuser.me/api/portraits/women/23.jpg"
    }
]


app.get('/api/users', function(req, res) {
    res.status(200).json(users);
})

function getUserById(uid){
 for(var i=0; i<users.length; i++)
 {
   if(uid == users[i].id)
     return i;
 }
 return -1;
}


// get user by id

app.get("/api/users/:id", function(req, res)
{
 var uid = req.params.id;
 var userid = getUserById(uid);


 if(userid == -1)
 {
   res.status(404).json({"message" : "user not found"})
 }
 res.status(200).json(users[userid])
})


app.get("/api/randomuser", function(req, res) {
    var n = users.length;
    const randomid = Math.floor(Math.random() * n);
    res.status(200).json(users[randomid])
})

var newuserid = users.length + 1;

app.post("/api/users", function(req, res) {
    let user = req.body;
    user.id = newuserid;
    newuserid++;
    user.push(users);
    res.status(200).json({"message" : "added successfully"});
})

app.post("/api/users", function(req, res)
{
 if(!req.body.name || !req.body.gender || !req.body.image)
   return res.json({"message" : " name, gender and image is required"})
 let user = req.body;
 user.id = newuserid;
 newuserid++;
 users.push(user)
 res.status(200).json({"message" : "added successfully"});
})


// put: update user details of given id
app.put("/api/users/:id", function(req, res){
 var userid = getUserById(req.params.id);


 if(userid == -1)
   return res.json({"message" : "user not found"})


   if(req.body.name)
     users[userid].name = req.body.name;


   if(req.body.gender)
     users[userid].gender = req.body.gender;


   if(req.body.image)
     users[userid].image = req.body.image;


   return res.status(200).json({"message" : "user details updated", "user" : users[userid]})
})


app.delete("/api/users/:id", function(req, res){
 var userid = getUserById(req.params.id);
 if(userid == -1)
   return res.json({"message" : "user not found"})


 users.splice(userid, 1);


 res.status(200).json({"message" : "user deleted successfully"})


})


app.use(express.static("frontend")) // web server


app.listen(port, function (){
 console.log("my app is running at http://localhost:"+port)
})


app.use(express.static('frontend'))

app.listen(port, function() {
    console.log("my app is running at http://localhost:" + port)
})