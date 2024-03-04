CREATE DATABASE projet;

CREATE TABLE Promo (
    Spe VARCHAR(255),
    School_year INTEGER,
    Year INTEGER,
    PRIMARY KEY (Spe, School_year, Year)

);

CREATE TABLE Users (
    User_id SERIAL PRIMARY KEY,
    Promo_Spe VARCHAR(255),
    Promo_School_year INTEGER,
    Promo_Year INTEGER,
    FOREIGN KEY (Promo_Spe, Promo_School_year, Promo_Year) REFERENCES Promo(Spe, School_year, Year),
    Name VARCHAR(255),
    Surname VARCHAR(255),
    Phone VARCHAR(255),
    Mail VARCHAR(255),
    User_name VARCHAR(255),
    Password VARCHAR(255)
);

CREATE TABLE Subject (
    Subject_id SERIAL PRIMARY KEY,
    Promo_Spe VARCHAR(255),
    Promo_School_year INTEGER,
    Promo_Year INTEGER,
    FOREIGN KEY (Promo_Spe, Promo_School_year, Promo_Year) REFERENCES Promo(Spe, School_year, Year),
    Name VARCHAR(255)
);

CREATE TABLE Document (
    Doc_id SERIAL PRIMARY KEY,
    Subject_id INTEGER,
    FOREIGN KEY (Subject_id) REFERENCES Subject(Subject_id),
    Name VARCHAR(255),
    Type VARCHAR(255),
    File_type VARCHAR(255),
    Link VARCHAR 
);

CREATE TABLE Message (
    Message_id SERIAL PRIMARY KEY,
    UserName VARCHAR(255),
    Mail VARCHAR(255), 
    Message VARCHAR,
    Date DATE
);

CREATE TABLE Subscription (
    Sub_id SERIAL PRIMARY KEY,
    Mail VARCHAR(255), 
    Date DATE
);



