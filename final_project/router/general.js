const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Check if a user with the given username already exists
const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}
public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
    const password = req.body.password;
    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user. Username and/or password are not provided."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Code with Promise
    let myPromise = new Promise((resolve,reject)=>{
    resolve(books)
  });
  myPromise.then((result)=>{
    res.send(JSON.stringify(result,null,4)) 
  });
  
  //Code without promise
   //res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
   //Code with Promise
   let myPromise = new Promise((resolve,reject)=>{
    const isbn = req.params.isbn;
    resolve(books[isbn])
  });
  myPromise.then((result)=>{
    res.send(result) 
  });
  
  //Code without promise
  //const isbn = req.params.isbn;
  //res.send(books[isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Code with Promise
  let myPromise = new Promise((resolve,reject)=>{
    const author = req.params.author;
    const keys = Object.keys(books)
    keys.forEach(key => {
        if(books[key].author===author){ resolve(books[key]) }
    });    
  });
  myPromise.then((result)=>{
    res.send(result) 
  });
//Code without promise
//   const author = req.params.author;
//   const keys = Object.keys(books)
//   keys.forEach(key => {
//     if(books[key].author===author){
//         res.send(books[key])
//     }
//   });
//   res.send("Unable to find book!");
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
   //Code with Promise
   let myPromise = new Promise((resolve,reject)=>{
    const title = req.params.title;
  const keys = Object.keys(books)
  keys.forEach(key => {
    if(books[key].title===title){
        resolve(books[key])
    }
  }); 
  });
  myPromise.then((result)=>{
    res.send(result) 
  });
//Code without promise
//   const title = req.params.title;
//   const keys = Object.keys(books)
//   keys.forEach(key => {
//     if(books[key].title===title){
//         res.send(books[key])
//     }
//   });
//   res.send("Unable to find book!");
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews)
});

module.exports.general = public_users;
