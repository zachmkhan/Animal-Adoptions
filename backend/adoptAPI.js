var express = require('express');
var mysql = require('./dbcon.js');
var CORS = require('cors');

var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(CORS());
app.set('port', 4256);


const getUser = `SELECT * FROM users WHERE userId=?`;
const getAllUsers = `SELECT * FROM users;`;
const getAdmin = `SELECT * FROM admin WHERE sellerId=?`;
const getPet = `SELECT * FROM pets WHERE petId=?`;
const getAllPets = `SELECT * FROM pets;`
const getFavorites = `SELECT p.* FROM pets p
                        JOIN favorites f ON f.petId = p.petId
                        WHERE f.userId=?;`;

const insertUser = `INSERT INTO users (password, fname, lname, email) 
                        VALUES (?,?,?,?);`;
const insertAdmin = `INSERT INTO admin (password, shelterName, aboutMe, fname, 
                        lname, email, website, phone)
                        VALUES (?,?,?,?,?,?,?,?);`;                    
const insertPet = `INSERT INTO pets (sellerId, animal, name, breed, sex, age,
                        weight, size, adoptionFee, aboutMe, city, state, photo1,
                        photo2, photo3, photo4, photo5, photo6, goodWithKids,
                        goodWithDogs, goodWithCats, requiresFence, houseTrained,
                        neuteredSpayed, shotsUpToDate)
                        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`;
const insertFavorite = `INSERT INTO favorites (userId, petId) VALUES (?,?);`;

const updateUser = `UPDATE users SET password=?, fname=?, lname=?, email=?
                    WHERE userId=?;`;
const updateAdmin = `UPDATE admin SET password=?, shelterName=?, aboutMe=?, 
                        fname=?, lname=?, email=?, website=?, phone=?
                        WHERE sellerId=?;`;
const updatePet = `UPDATE pets SET sellerId=?, animal=?, name=?, breed=?, sex=?, age=?,
                        weight=?, size=?, adoptionFee=?, aboutMe=?, city=?, state=?, photo1=?,
                        photo2=?, photo3=?, photo4=?, photo5=?, photo6=?, goodWithKids=?,
                        goodWithDogs=?, goodWithCats=?, requiresFence=?, houseTrained=?,
                        neuteredSpayed=?, shotsUpToDate=?
                        WHERE petId=?;`;

const deleteUser = `DELETE FROM users WHERE userId=?;`;
const deleteAdmin = `DELETE FROM admin WHERE adminId=?;`;
const deletePet = `DELETE FROM pets WHERE petsId=?;`;
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

// Get all users data for USERS table <<<FOR TESTING ONLY>>>
app.get('/users',function(req,res,next){
  getAllData(res, getAllUsers);
});  

  // Get single users data for USERS table
app.get('/users/:userId',function(req,res,next){
    getData(res, getUser, req.params.userId);
});

  // Get single admin data for ADMIN table
app.get('/admin/:adminId',function(req,res,next){
  getData(res, getAdmin, req.params.adminId);
});

  // Get all pets data for PETS table
app.get('/pets',function(req,res,next){
  getAllData(res, getAllPets);
});

  // Get single pet data for PETS table
app.get('/pet/:petId',function(req,res,next){
  getData(res, getPet, req.params.petId);
});

// Get user's favorite pets data from FAVORITES/PETS tables
app.get('/favorites/:userId',function(req,res,next){
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
      getData(res, getUser, result.userId);
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
    getData(res, getAdmin, result.adminId);
  });
});

// Adds pet to PETS table
app.post('/pets', function(req,res,next){
  var { sellerId, password, status, animal, breed, sex, age, weight, size, 
    adoptionFee, aboutMe, city, state, photo1, photo2, photo3, photo4, photo5, 
    photo6, goodWithKids, goodWithDogs, goodWithCats, requiresFence, houseTrained, 
    neuteredSpayed, shotsUpToDate } = req.body;
  mysql.pool.query(insertPet, [sellerId, password, status, animal, breed, 
    sex, age, weight, size, adoptionFee, aboutMe, city, state, photo1, photo2, 
    photo3, photo4, photo5, photo6, goodWithKids, goodWithDogs, goodWithCats, 
    requiresFence, houseTrained, neuteredSpayed, shotsUpToDate], (err, result) =>{
    if(err){
      next(err);
      return;
    } 
    getData(res, getPet, result.petId);
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
app.delete('/users',function(req,res,next){
  var { userId } = req.body
  mysql.pool.query(deleteUser, [userId], (err, result)=> {
    if(err){
      next(err);
      return;
    }
  });
});

// Delete admin
app.delete('/admin',function(req,res,next){
  var { adminId } = req.body
  mysql.pool.query(deleteAdmin, [adminId], (err, result)=> {
    if(err){
      next(err);
      return;
    }
  });
});

// Delete pet
app.delete('/pets',function(req,res,next){
  var { petId } = req.body
  mysql.pool.query(deletePet, [petId], (err, result)=> {
    if(err){
      next(err);
      return;
    }
  });
});

// Delete favorite
app.delete('/favorites',function(req,res,next){
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
app.put('/users/:userId',function(req,res,next){
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
app.put('/admin/:adminId',function(req,res,next){
  var { password, shelterName, city, state, aboutMe, fname, lname, 
    email, website, phone, adminId } = req.body;
  mysql.pool.query(updateAdmin, [password, shelterName, city, state, aboutMe, fname, lname, 
    email, website, phone, adminId], (err, result) =>{
    if(err){
      next(err);
      return;
    }
    getData(res, getAdmin, adminId);
  });
});

// Update pet info
app.put('/pets/:petId',function(req,res,next){
  var { sellerId, password, status, animal, breed, sex, age, weight, size, 
    adoptionFee, aboutMe, city, state, photo1, photo2, photo3, photo4, photo5, 
    photo6, goodWithKids, goodWithDogs, goodWithCats, requiresFence, houseTrained, 
    neuteredSpayed, shotsUpToDate, petId } = req.body;
  mysql.pool.query(updatePet, [sellerId, password, status, animal, breed, sex, age, 
    weight, size, adoptionFee, aboutMe, city, state, photo1, photo2, photo3, photo4, 
    photo5, photo6, goodWithKids, goodWithDogs, goodWithCats, requiresFence, 
    houseTrained, neuteredSpayed, shotsUpToDate, petId], (err, result) =>{
    if(err){
      next(err);
      return;
    }
    getData(res, getPet, petId);
  });
});
  
// 404 Error
app.use(function(req,res){
  res.status(404);
  res.render('404');
});
  
// 500 Error
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});
  
app.listen(app.get('port'), function(){
  console.log('Express started on http://flip2.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
  
