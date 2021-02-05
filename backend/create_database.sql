CREATE TABLE users (
    userId INT AUTO_INCREMENT PRIMARY KEY, 
    password VARCHAR(25) NOT NULL,
    fname VARCHAR(50) NOT NULL, 
    lname VARCHAR(50) NOT NULL, 
    email VARCHAR(100) NOT NULL, 
    UNIQUE (email)
);

CREATE TABLE admin (
    sellerId INT AUTO_INCREMENT PRIMARY KEY, 
    password VARCHAR(25) NOT NULL,
    shelterName VARCHAR(25),
    city VARCHAR(50) NOT NULL,
    state VARCHAR(2) NOT NULL,
    aboutMe TEXT,
    fname VARCHAR(50) NOT NULL, 
    lname VARCHAR(50) NOT NULL, 
    email VARCHAR(100) NOT NULL, 
    website VARCHAR(255), 
    phone VARCHAR(12),
    UNIQUE (email)
);

CREATE TABLE pets (
    petId INT AUTO_INCREMENT PRIMARY KEY, 
    sellerId INT NOT NULL,
    status VARCHAR(15) DEFAULT 'Available',
    animal VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL, 
    breed VARCHAR(100),
    sex VARCHAR(8) NOT NULL,
    age INT NOT NULL,
    weight INT NOT NULL,
    size VARCHAR(11) NOT NULL,
    adoptionFee INT NOT NULL,
    aboutMe TEXT,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(2) NOT NULL,
    photo1 VARCHAR(255) NOT NULL,
    photo2 VARCHAR(255),
    photo3 VARCHAR(255),
    photo4 VARCHAR(255),
    photo5 VARCHAR(255),
    photo6 VARCHAR(255),
    goodWithKids VARCHAR(7) DEFAULT 'UNKNOWN',
    goodWithDogs VARCHAR(7) DEFAULT 'UNKNOWN',
    goodWithCats VARCHAR(7) DEFAULT 'UNKNOWN',
    requiresFence VARCHAR(7) DEFAULT 'UNKNOWN',
    houseTrained VARCHAR(7) DEFAULT 'UNKNOWN',
    neuteredSpayed VARCHAR(7) DEFAULT 'UNKNOWN',
    shotsUpToDate VARCHAR(7) DEFAULT 'UNKNOWN',
    FOREIGN KEY (sellerId) REFERENCES admin(sellerId)
        ON DELETE CASCADE
);

CREATE TABLE favorites (
    userId INT NOT NULL,
    petId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(userId)
        ON DELETE CASCADE,
    FOREIGN KEY (petId) REFERENCES pets(petId)
        ON DELETE CASCADE
);

INSERT INTO users (password, fname, lname, email)
    VALUES ('password', 'Dyllan', 'Vangemert', 'vangemed@oregonstate.edu'),
            ('wordpass', 'Donkey', 'Kong', 'dk@dk.net'),
            ('drowssap', 'Pac', 'Man', 'pacattac@email.com');

INSERT INTO admin (password, shelterName, city, state, aboutMe, fname, lname, email, website, phone)
    VALUES ('swordpas', 'OSU Center For Animals', 'Corvallis', 'OR','We specialize in beaver rescue, but rescue all pets in need (except ducks).', 'Terry', 'Bogard', 'oregonstate@oregonstate.edu', 'oregonstate.edu', '111-111-1111'),
            ('sapwords', 'Exotic Pets', 'Wynnewood', 'OK', 'We resue exotic pets.',  'Joe', 'Exotic', 'joexotic@exotic.com', 'joe.com', '222-222-3333'),
            ('sapsword', 'Belmont Rescue', 'Unknown', 'WA', 'We rescue pets.', 'Richter', 'Belmont', 'spam@spam.com', 'belmonts.com', '333-333-3333');

INSERT INTO pets (sellerId, animal, name, breed, sex, age, weight, size, adoptionFee, aboutMe, city, state, photo1, goodWithKids, goodWithDogs, goodWithCats, requiresFence, houseTrained, neuteredSpayed, shotsUpToDate)
    VALUES (1, 'Dog', 'Javier', 'Border Collie', 'Male', 4, 52, 'Medium', 800, 'The bestest doge.', 'Woodinville', 'WA', 'https://elasticbeanstalk-us-east-2-181021098475.s3.us-east-2.amazonaws.com/cs467/javi.jpg', 'Yes', 'Yes', 'Yes', 'No', 'Yes', 'Yes', 'Yes'),
    (3, 'Dog', 'Duck Hunt', 'Bloodhound', 'Male', 36, 40, 'Medium', 500, 'Loves to camp', 'Redmond', 'WA', 'https://elasticbeanstalk-us-east-2-181021098475.s3.us-east-2.amazonaws.com/cs467/javi.jpg', 'Yes', 'No', 'No', 'No', 'Yes', 'No', 'Yes'),
    (3, 'Cat', 'Ganondorf', 'Demon', 'Male', 1000, 1000, 'XLarge', 0, 'King of Evil', 'Hyrule', 'WA', 'https://elasticbeanstalk-us-east-2-181021098475.s3.us-east-2.amazonaws.com/cs467/javi.jpg', 'No', 'No', 'No', 'Yes', 'No', 'No', 'No');

INSERT INTO pets (sellerId, animal, name, breed, sex, age, weight, size, adoptionFee, aboutMe, city, state, photo1)
    VALUES (2, 'Crocodile', 'King K. Rool', 'Unknown', 'Male', 40, 1000, 'XLarge', 1000, 'King', 'Seattle', 'WA', 'image.img'), 
    (2, 'Dragon', 'Ridley', 'Unknown', 'Male', 100, 1000, 'XLarge', 5000, 'Leader of the Space Pirates', 'Portland', 'OR', 'image.img'); 

INSERT INTO favorites (userId, petId)
    VALUES (1, 1), (1, 3), (2, 4), (2, 1), (3, 1), (3, 2), (3, 5);
