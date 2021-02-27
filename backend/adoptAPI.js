/* 
Run with:
./node_modules/forever/bin/forever start API.js

Stop with:
./node_modules/forever/bin/forever stop API.js
*/

const express = require('express');
const mysql = require('./dbcon.js');
const CORS = require('cors');
const request = require('request');
const AWS = require("aws-sdk");
const bodyParser = require('body-parser');
const multer = require('multer'); // "^1.3.0"
const multerS3 = require('multer-s3'); //"^2.7.0"

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(CORS());
app.set('port', 4256);
app.use(bodyParser.json());

const geoKey = 'AIzaSyArii4GSAs11sDjn7k4mGnPjI8FTCHoJCo';

AWS.config.loadFromPath("config.json");
const s3 = new AWS.S3();
const bucket = 'elasticbeanstalk-us-east-2-181021098475/cs467'

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
const insertAdmin = `INSERT INTO admin (password, shelterName, city, state, latitude, longitude
                        aboutMe, fname, lname, email, website, phone)
                        VALUES (?,?,?,?,?,?,?,?,?,?,?,?);`;                    
const insertPet = `INSERT INTO pets (sellerId, status, animal, name, breed, sex, age, ageGroup,
                        weight, size, adoptionFee, aboutMe, city, state, latitude, longitude, photo1,
                        photo2, photo3, photo4, photo5, photo6, goodWithKids,
                        goodWithDogs, goodWithCats, requiresFence, houseTrained,
                        neuteredSpayed, shotsUpToDate)
                        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`;
const insertFavorite = `INSERT INTO favorites (userId, petId) VALUES (?,?);`;

const updateUser = `UPDATE users SET password=?, fname=?, lname=?, email=?
                    WHERE userId=?;`;
const updateAdmin = `UPDATE admin SET password=?, shelterName=?, city=?, state=? 
                        aboutMe=?, fname=?, lname=?, email=?, website=?, phone=?
                        WHERE sellerId=?;`;
const updatePet = `UPDATE pets SET sellerId=?, status=?, animal=?, name=?, breed=?, sex=?, age=?,
                        ageGroup=?, weight=?, size=?, adoptionFee=?, aboutMe=?, city=?, state=?, 
                        latitude=?, lopngitude=?, goodWithKids=?, goodWithDogs=?, goodWithCats=?, 
                        requiresFence=?, houseTrained=?, neuteredSpayed=?, shotsUpToDate=?
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
  console.log(email, password);
  mysql.pool.query(dbQuery, email, (err, rows, fields) => {
    if(err) {
      console.log(err);
      next(err);
      return;
    }
    if (rows[0]) {
      if (rows[0].password == password) {
        JSON.stringify(rows);
        context.rows = rows;
        console.log(context);
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

function getCoordinates(city, state) {
  var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${state}&key=${geoKey}`;
  return new Promise(function(resolve, reject) {
    request(url, function (error, response, body) {
      try {
        var coordinates = [];
        var json = JSON.parse(body);
        coordinates.push(parseFloat(json.results[0].geometry.location.lat));
        coordinates.push(parseFloat(json.results[0].geometry.location.lng));
        resolve(coordinates);
      } catch(e) {
        reject(e);
      }
    })
  });
}

// Uploads image file to AWS S3 bucket
var upload = multer({
  storage: multerS3({
      s3: s3,
      acl: 'public-read',
      bucket: bucket,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      contentDisposition: 'inline',
      key: function (req, file, cb) {
          cb(null, Date.now().toString())
      }
  })
});

// Deletes image files from AWS S3 bucket
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

// Gets all photos associated with pet/pets (to delete in bulk)
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

// Takes search requests from form and generates a query for all pets meeting criteria
function generateSearchQuery(params) {
  var query = `SELECT *, ( 3959 * acos( cos( radians(${params.latitude}) ) * cos( radians( latitude ) )
      * cos( radians( longitude ) - radians(${params.longitude}) ) + sin( radians(${params.latitude}) ) 
      * sin( radians( latitude ) ) ) ) AS distance
    FROM pets WHERE `;
    
  if (params.animal) {
    query += `animal='${params.animal}'`;
  }
  if (params.breed) {
    query += ` AND breed='${params.breed}'`;
  }
  if (params.sex) {
    query += ` AND sex='${params.sex}'`;
  }
  if (params.ageGroup) {
    query += ` AND ageGroup='${params.ageGroup}'`;
  }
  if (params.size) {
    query += ` AND size='${params.size}'`;
  }
  if (params.goodWithKids) {
    query += ` AND goodWithKids='${params.goodWithKids}'`;
  }
  if (params.goodWithDogs) {
    query += ` AND goodWithDogs='${params.goodWithDogs}'`;
  }
  if (params.goodWithCats) {
    query += ` AND goodWithCats='${params.goodWithCats}'`;
  }
  if (params.requiresFence) {
    query += ` AND requiresFence='${params.requiresFence}'`;
  }
  if (params.houseTrained) {
    query += ` AND houseTrained='${params.houseTrained}'`;
  }
  if (params.neuteredSpayed) {
    query += ` AND neuteredSpayed='${params.neuteredSpayed}'`;
  }
  if (params.shotsUpToDate) {
    query += ` AND shotsUpToDate='${params.shotsUpToDate}'`;
  }
  query += ` HAVING distance < ${params.distance} ORDER BY distance`
  return query;
}


//BACKEND TESTING
//app.get('/', (req, res) => {
//  res.sendFile(__dirname + '/index.html');
//});

// Get all users data for USERS table <<<FOR TESTING ONLY>>>
app.get('/users', function(req,res,next){
  getAllData(res, getAllUsers);
});

  // Verify user login with email and password
app.post('/users/login', function(req,res,next){
  console.log(req.body);
  var {email, password} = req.body;
  console.log(email, password);
  validateLogin(res, userLogin, email, password);
});

  // Get single users data for USERS table
app.get('/users/:userId', function(req,res,next){
    getData(res, getUser, req.params.userId);
});

// Get all admin data for ADMIN table <<<FOR TESTING ONLY>>>
app.get('/admin', function(req,res,next){
  getAllData(res, getAllAdmin);
});

app.post('/admin/login', function(req,res,next){
  var {email, password} = req.body;
  validateLogin(res, adminLogin, req.body.email, req.body.password);
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

  getCoordinates(city, state).then(function(val) {
    var latitude = val[0];
    var longitude = val[1];
    mysql.pool.query(insertAdmin, [password, shelterName, city, state, latitude, 
      longitude, aboutMe, fname, lname, email, website, phone], (err, result) =>{
      if(err){
        next(err);
        return;
      } 
      getData(res, getAdmin, result.insertId);
    });
  }).catch(function(err) {
    console.log(err);
  })
});

// Adds pet to PETS table.
app.post('/pets', upload.array('photo', 6), function(req,res,next){
  var { sellerId, status, animal, name, breed, sex, age, weight, size, 
    adoptionFee, aboutMe, city, state, photo1, photo2, photo3, photo4, 
    photo5, photo6, goodWithKids, goodWithDogs, goodWithCats, requiresFence, 
    houseTrained, neuteredSpayed, shotsUpToDate } = req.body;
  
  // Assign photos to store in DB
  photo1 = req.files[0].location;
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

  // Determine ageGroup based on age
  if (age < 1) {
    ageGroup = "Baby";
  }
  else if (age < 4) {
    ageGroup = "Young";
  }
  else if (age < 9) {
    ageGroup = "Adult"
  }
  else {
    ageGroup = "Senior"
  }
  
  // Get lat/long coordinates, then store in DB
  getCoordinates(city, state).then(function(val) {
    var latitude = val[0];
    var longitude = val[1];
    mysql.pool.query(insertPet, [sellerId, status, animal, name, breed, sex, age, ageGroup, 
      weight, size, adoptionFee, aboutMe, city, state, latitude, longitude, photo1, photo2, photo3, photo4, 
      photo5, photo6, goodWithKids, goodWithDogs, goodWithCats, requiresFence, houseTrained, 
      neuteredSpayed, shotsUpToDate], (err, result) =>{
      if(err){
        next(err);
        return;
      } 
      getData(res, getPet, result.insertId);
    });
  }).catch(function(err) {
    console.log(err);
  })
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
  // Get all admin's listed pets to delete photos from AWS S3
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
    // Delete all pet photos
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
  mysql.pool.query(updateAdmin, [password, shelterName, city, state, aboutMe, 
    fname, lname, email, website, phone, sellerId], (err, result) =>{
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
    adoptionFee, aboutMe, city, state, goodWithKids, goodWithDogs, goodWithCats, 
    requiresFence, houseTrained, neuteredSpayed, shotsUpToDate, petId } = req.body;
  
  // Determine ageGroup based on pet's age
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

  getCoordinates(city, state).then(function(val) {
    var latitude = val[0];
    var longitude = val[1];
    mysql.pool.query(updatePet, [sellerId, status, animal, name, breed, sex, age, 
      ageGroup, weight, size, adoptionFee, aboutMe, city, state, latitude, longitude, 
      goodWithKids, goodWithDogs, goodWithCats, requiresFence, houseTrained, 
      neuteredSpayed, shotsUpToDate, petId], (err, result) =>{
      if(err){
        next(err);
        return;
      } 
      getData(res, getPet, result.insertId);
    });
  }).catch(function(err) {
    console.err(err);
  });
});

// Edit pet page: Delete single photo
app.delete('/photo', function(req,res,next){
  var { petId, photoX, photoUrl } = req.body;
  mysql.pool.query(`UPDATE pets SET ${photoX}=null WHERE petId=${petId};`, (err, result) =>{
    if(err){
      console.log(err);
      next(err);
      return;
    }
    deletePhoto(photoUrl);
    getData(res, getPet, petId);
  });
});

// Edit pet page: Add single photo
app.post('/photo', upload.array('photo', 1), function(req,res,next) {
  var { petId, photoX } = req.body;

  if (photoX == 'photo1') {
    mysql.pool.query(`SELECT photo1 FROM pets WHERE petId=${petId}`, (err, rows, fields) => {
      if(err) {
        console.log(err);
        next(err);
        return;
      }
      deletePhoto(rows[0].photo1);
    });
  }

  mysql.pool.query(`UPDATE pets SET ${photoX}='${req.files[0].location}' WHERE petId=${petId};`, 
    (err, result) =>{
    if(err){
      console.log(err);
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
