/* 
Run with:
./node_modules/forever/bin/forever start API.js

Stop with:
./node_modules/forever/bin/forever stop API.js
*/

const express = require('express');
const mysql = require('./dbcon.js');
const CORS = require('cors');
const app = express();
const AWS = require("aws-sdk");
const multer = require('multer'); // "^1.3.0"
const multerS3 = require('multer-s3'); //"^2.7.0"
const bodyParser = require('body-parser');
const s3 = new AWS.S3();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(CORS());
app.set('port', 4256);
app.use(bodyParser.json());

AWS.config.loadFromPath("config.json");

var upload = multer({
  storage: multerS3({
      s3: s3,
      acl: 'public-read',
      bucket: 'elasticbeanstalk-us-east-2-181021098475/cs467',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
          cb(null, Date.now().toString())
      }
  })
});

const getUser = `SELECT * FROM users WHERE userId=?;`;
const userLogin = `SELECT * FROM users WHERE email=?;`;
const getAllUsers = `SELECT * FROM users;`;
const getAdmin = `SELECT * FROM admin WHERE sellerId=?;`;
const adminLogin = `SELECT * FROM admin WHERE email=?;`;
const getAllAdmin = `SELECT * FROM admin;`;
const getAdminPets = `SELECT * FROM pets WHERE sellerId=?;`;
const getPet = `SELECT * FROM pets WHERE petId=?;`;
const getAllPets = `SELECT * FROM pets;`
const getFavorites = `SELECT p.* FROM pets p
                        JOIN favorites f ON f.petId = p.petId
                        WHERE f.userId=?;`;

const insertUser = `INSERT INTO users (password, fname, lname, email) 
                        VALUES (?,?,?,?);`;
const insertAdmin = `INSERT INTO admin (password, shelterName, city, state, 
                        aboutMe, fname, lname, email, website, phone)
                        VALUES (?,?,?,?,?,?,?,?,?,?);`;                    
const insertPet = `INSERT INTO pets (sellerId, status, animal, name, breed, sex, age, 
                        ageGroup, weight, size, adoptionFee, aboutMe, city, state, 
                        photo1, photo2, photo3, photo4, photo5, photo6, 
                        goodWithKids, goodWithDogs, goodWithCats, requiresFence, 
                        houseTrained, neuteredSpayed, shotsUpToDate)
                        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`;
const insertFavorite = `INSERT INTO favorites (userId, petId) VALUES (?,?);`;

const updateUser = `UPDATE users SET password=?, fname=?, lname=?, email=?
                    WHERE userId=?;`;
const updateAdmin = `UPDATE admin SET password=?, shelterName=?, city=?, state=? 
                        aboutMe=?, fname=?, lname=?, email=?, website=?, phone=?
                        WHERE sellerId=?;`;
const updatePet = `UPDATE pets SET sellerId=?, status=?, animal=?, name=?, breed=?, sex=?, age=?,
                        ageGroup=?, weight=?, size=?, adoptionFee=?, aboutMe=?, city=?, state=?, 
                        photo1=?, photo2=?, photo3=?, photo4=?, photo5=?, photo6=?, 
                        goodWithKids=?, goodWithDogs=?, goodWithCats=?, requiresFence=?, 
                        houseTrained=?, neuteredSpayed=?, shotsUpToDate=?
                        WHERE petId=?;`;

const deleteUser = `DELETE FROM users WHERE userId=?;`;
const deleteAdmin = `DELETE FROM admin WHERE sellerId=?;`;
const deletePet = `DELETE FROM pets WHERE petId=?;`;
const deleteFavorite = `DELETE FROM favorites WHERE userId=? AND petId=?;`;

// Get single user/admin/pet data from table
const getData = (res, dbQuery, values) =>{
  context = {};
  mysql.pool.query(dbQuery, values, (err, rows, fields) => {
    if(err) {
      console.log(err);
      next(err);
      return;
    }
    JSON.stringify(rows);
    context.rows = rows;
    res.send(context);
  });
};

// Get all user/admin/pet data from table
const getAllData = (res, dbQuery) =>{
  context = {};
  mysql.pool.query(dbQuery, (err, rows, fields) => {
    if(err) {
      console.log(err);
      next(err);
      return;
    }
    JSON.stringify(rows);
    context.rows = rows;
    res.send(context);
  });
};

// Validate user/admin login
const validateLogin = (res, dbQuery, email, password) => {
  var context = {}
  mysql.pool.query(dbQuery, email, (err, rows, fields) => {
    if(err) {
      console.log(err);
      next(err);
      return;
    }
    if (rows[0]) {
      if (rows[0].password == password) {
        JSON.stringify(rows);
        context.rows = rows
        res.send(context);
      }
      else {
        res.send("Sorry, account was not found or password was incorrect");
      }
    }
    else {
      res.send("Sorry, account was not found or password was incorrect");
    }
  });
}

//BACKEND TESTING
//app.get('/', (req, res) => {
//    res.sendFile(__dirname + '/index.html');
//});

// Get all users data for USERS table <<<FOR TESTING ONLY>>>
app.get('/users', function(req,res,next){
  getAllData(res, getAllUsers);
});

  // Verify user login with email and password
app.get('/users/login', function(req,res,next){
  validateLogin(res, userLogin, req.query.email, req.query.password);
});

  // Get single users data for USERS table
app.get('/users/:userId', function(req,res,next){
    getData(res, getUser, req.params.userId);
});

// Get all admin data for ADMIN table <<<FOR TESTING ONLY>>>
app.get('/admin', function(req,res,next){
  getAllData(res, getAllAdmin);
});

app.get('/admin/login', function(req,res,next){
  validateLogin(res, adminLogin, req.query.email, req.query.password);
});

  // Get single admin data for ADMIN table
app.get('/admin/:sellerId', function(req,res,next){
  getData(res, getAdmin, req.params.sellerId);
});

  // Get single admin data for ADMIN table
app.get('/admin/:sellerId/pets', function(req,res,next){
  getData(res, getAdminPets, req.params.sellerId);
});

  // Get all pets data for PETS table
app.get('/pets', function(req,res,next){
  getAllData(res, getAllPets);
});

  // Get all pets data for PETS table
app.get('/pets/search', function(req,res,next){
  getAllData(res, generateSearchQuery(req.query));
});

  // Get single pet data for PETS table
app.get('/pet/:petId', function(req,res,next){
  getData(res, getPet, req.params.petId);
});

// Get user's favorite pets data from FAVORITES/PETS tables
app.get('/favorites/:userId', function(req,res,next){
  getData(res, getFavorites, req.params.userId);
});

// Adds user to USERS table
app.post('/users', function(req,res,next){
  var { password, fname, lname, email } = req.body;
  mysql.pool.query(insertUser, [password, fname, lname, email], (err, result) =>{
    if(err){
      next(err);
      return;
    } 
    getData(res, getUser, result.insertId);
  });
});

// Adds admin to ADMIN table
app.post('/admin', function(req,res,next){
  var { password, shelterName, city, state, aboutMe, fname, lname, 
    email, website, phone } = req.body;
  mysql.pool.query(insertAdmin, [password, shelterName, city, state, 
    aboutMe, fname, lname, email, website, phone], (err, result) =>{
    if(err){
      next(err);
      return;
    } 
    getData(res, getAdmin, result.insertId);
  });
});

// Adds pet to PET table [Uses "upload" with AWS and Multer to upload 
// photos to AWS, retrieves url, then stores in database]
app.post('/pets', upload.array('photo', 6), function(req,res,next){
  var { sellerId, status, animal, name, breed, sex, age, weight, size, 
    adoptionFee, aboutMe, city, state, photo1, photo2, photo3, photo4, 
    photo5, photo6, goodWithKids, goodWithDogs, goodWithCats, requiresFence, 
    houseTrained, neuteredSpayed, shotsUpToDate } = req.body;
  
  // First photo is required
  var photo1 = req.files[0].location;
  // If 'next' photo exists, assign to 'next' photo, otherwise null
  if (req.files[1]) {
    photo2 = req.files[1].location;
  }
  if (req.files[2]) {
    photo3 = req.files[2].location;
  }
  if (req.files[3]) {
    photo4 = req.files[3].location;
  }
  if (req.files[4]) {
    photo5 = req.files[4].location;
  }
  if (req.files[5]) {
    photo6 = req.files[5].location;
  }

  // Determine ageGroup based on animal age
  if (age < 1) {
    var ageGroup = "Baby";
  }
  else if (age < 4) {
    var ageGroup = "Young";
  }
  else if (age < 9) {
    var ageGroup = "Adult"
  }
  else {
    var ageGroup = "Senior"
  }

  mysql.pool.query(insertPet, [sellerId, status, animal, name, breed, sex, age, ageGroup, 
    weight, size, adoptionFee, aboutMe, city, state, photo1, photo2, photo3, photo4, photo5, 
    photo6, goodWithKids, goodWithDogs, goodWithCats, requiresFence, houseTrained, 
    neuteredSpayed, shotsUpToDate], (err, result) =>{
    if(err){
      next(err);
      return;
    } 
    getData(res, getPet, result.insertId);
  });
});

// Adds user/pet pair to FAVORITES table
app.post('/favorites', function(req,res,next){
  var { userId, petId } = req.body;
  mysql.pool.query(insertFavorite, [userId, petId], (err, result) =>{
    if(err){
      next(err);
      return;
    } 
    getData(res, getFavorites, userId);
  });
});
  
// Delete user
app.delete('/users/:userId', function(req,res,next){
  //var { userId } = req.body
  mysql.pool.query(deleteUser, [req.params.userId], (err, result)=> {
    if(err){
      next(err);
      return;
    }
  });
});

// Delete admin
app.delete('/admin/:sellerId', function(req,res,next){
  //var { adminId } = req.body
  mysql.pool.query(getAdminPets, req.params.sellerId, (err, rows, fields) => {
    if(err) {
      console.log(err);
      next(err);
      return;
    }
    photos = getPhotos(rows);
  });
  
  mysql.pool.query(deleteAdmin, [req.params.sellerId], (err, result)=> {
    if(err){
      next(err);
      return;
    }
    for (var i = 0; i < photos.length; i++) {
      deletePhoto(photos[i]);
    }
  });
});

// Delete pet
app.delete('/pets/:petId', function(req,res,next){
  //var { petId } = req.body
  var photos = [];
  mysql.pool.query(getPet, req.params.petId, (err, rows, fields) => {
    if(err) {
      console.log(err);
      next(err);
      return;
    }
    photos = getPhotos(rows);
  });
  mysql.pool.query(deletePet, [req.params.petId], (err, result)=> {
    if(err){
      next(err);
      return;
    }
    for (var i = 0; i < photos.length; i++) {
      deletePhoto(photos[i]);
    }
  });
});

// Delete favorite
app.delete('/favorites', function(req,res,next){
  var { userId, petId } = req.body
  mysql.pool.query(deleteFavorite, [userId, petId], (err, result)=> {
    if(err){
      next(err);
      return;
    }
    getData(res, getFavorites, userId);
  });
});

// Update user info
app.put('/users/:userId', function(req,res,next){
  var { password, fname, lname, email, userId } = req.body;
  mysql.pool.query(updateUser, [password, fname, lname, email, userId], (err, result) =>{
    if(err){
      next(err);
      return;
    }
    getData(res, getUser, userId);
  });
});

// Update admin info
app.put('/admin/:sellerId', function(req,res,next){
  var { password, shelterName, city, state, aboutMe, fname, lname, 
    email, website, phone, sellerId } = req.body;
  mysql.pool.query(updateAdmin, [password, shelterName, city, state, aboutMe, fname, lname, 
    email, website, phone, sellerId], (err, result) =>{
    if(err){
      next(err);
      return;
    }
    getData(res, getAdmin, sellerId);
  });
});

// Update pet info
app.put('/pets/:petId', function(req,res,next){
  var { sellerId, status, animal, name, breed, sex, age, weight, size, 
    adoptionFee, aboutMe, city, state, photo1, photo2, photo3, photo4, photo5, 
    photo6, goodWithKids, goodWithDogs, goodWithCats, requiresFence, houseTrained, 
    neuteredSpayed, shotsUpToDate, petId } = req.body;
  //var photos = []
  //mysql.pool.query(getPet, values, (err, rows, fields) => {
  //  if(err){
  //    next(err);
  //    return;
  //  }
  //  photos = getPhotos(rows);
  //});
  
  if (age < 1) {
    var ageGroup = "Baby";
  }
  else if (age < 4) {
    var ageGroup = "Young";
  }
  else if (age < 9) {
    var ageGroup = "Adult"
  }
  else {
    var ageGroup = "Senior"
  }

  mysql.pool.query(updatePet, [sellerId, status, animal, name, breed, sex, age, ageGroup,
    weight, size, adoptionFee, aboutMe, city, state, photo1, photo2, photo3, photo4, photo5, 
    photo6, goodWithKids, goodWithDogs, goodWithCats, requiresFence, houseTrained, 
    neuteredSpayed, shotsUpToDate, petId], (err, result) =>{
    if(err){
      next(err);
      return;
    }
    getData(res, getPet, petId);
  });
});
  
app.use(function(err, req, res, next){
  // we may use properties of the error object here and next(err) appropriately, or if we possibly recovered from the error, simply next().
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  })
});
  
app.listen(app.get('port'), function(){
  console.log('Express started on http://flip2.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});

function deletePhoto(photo) {
  // Take out Key from photo URL (last 13 characters)
  var key = photo.slice(-13);
  console.log(photo);
  var params = {
      Bucket: bucket,
      Key: key
  }
  s3.deleteObject(params, function(err, data) {
    if (err) {// an error occurred
      console.log(err, err.stack);
    }
    else {// successful response
      console.log(data);
    }
  });
}

function generateSearchQuery(params) {
  var query = 'SELECT * FROM pets WHERE ';
  if (params.animal) {
    query += 'animal="' + params.animal + '"';
  }
  if (params.breed) {
    query += ' AND breed="' + params.breed + '"';
  }
  if (params.sex) {
    query += ' AND sex="' + params.sex + '"';
  }
  if (params.ageGroup) {
    query += ' AND ageGroup="' + params.ageGroup + '"';
  }
  if (params.size) {
    query += ' AND size="' + params.size + '"';
  }
  if (params.city) {
    query += ' AND city="' + params.city + '"';
  }
  if (params.state) {
    query += ' AND state="' + params.state + '"';
  }
  if (params.goodWithKids) {
    query += ' AND goodWithKids="' + params.goodWithKids + '"';
  }
  if (params.goodWithDogs) {
    query += ' AND goodWithDogs="' + params.goodWithDogs + '"';
  }
  if (params.goodWithCats) {
    query += ' AND goodWithCats="' + params.goodWithCats + '"';
  }
  if (params.requiresFence) {
    query += ' AND requiresFence="' + params.requiresFence + '"';
  }
  if (params.houseTrained) {
    query += ' AND houseTrained="' + params.houseTrained + '"';
  }
  if (params.neuteredSpayed) {
    query += ' AND neuteredSpayed="' + params.neuteredSpayed + '"';
  }
  if (params.shotsUpToDate) {
    query += ' AND shotsUpToDate="' + params.shotsUpToDate + '"';
  }
  return query;
}

function getPhotos(rows) {
  var photos = [];
  for (var i = 0; i < rows.length; i++) {
    if (rows[i].photo1) {
      photos.push(rows[i].photo1);
    }
    if (rows[i].photo2) {
      photos.push(rows[i].photo2);
    }
    if (rows[i].photo3) {
      photos.push(rows[i].photo3);
    }
    if (rows[i].photo4) {
      photos.push(rows[i].photo4);
    }
    if (rows[i].photo5) {
      photos.push(rows[i].photo5);
    }
    if (rows[i].photo6) {
      photos.push(rows[i].photo6);
    }
    return photos;
  }
}
