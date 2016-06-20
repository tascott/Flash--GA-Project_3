var mongoose = require("mongoose");

var databaseURL = 'mongodb://localhost:27017/flash-app';
mongoose.connect(databaseURL);

// var Project = require("../models/project"); 
var Buyer    = require("../models/buyer");
var Seller    = require("../models/seller");
var Ticket    = require("../models/ticket");

// This will clear what ever we have in the database :) 
Buyer.collection.drop();
Seller.collection.drop();
Ticket.collection.drop();

var ticket1 = new Ticket({
  event: "Coldplay",
  date: "10/10/2016",
  price: 200
})

ticket1.save(function(err, ticket) {
 if (err) return console.log(err);
 console.log("Ticket saved! ", ticket);
})

var ticket2 = new Ticket({
  event: "The Stone Roses",
  date: "11/10/2016",
  price: 50
})

ticket2.save(function(err, ticket) {
 if (err) return console.log(err);
 console.log("Ticket saved! ", ticket);
})


var ticket3 = new Ticket({
  event: "Incubus",
  date: "12/12/2016",
  price: 75
})

ticket3.save(function(err, ticket) {
 if (err) return console.log(err);
 console.log("Ticket saved! ", ticket);
})

var ticket4 = new Ticket({
  event: "The Flamming Lips",
  date: "09/09/2016",
  price: 30
})

ticket4.save(function(err, ticket) {
 if (err) return console.log(err);
 console.log("Ticket saved! ", ticket);
})

var ticket5 = new Ticket({
  event: "The Eagles",
  date: "03/03/2016",
  price: 500
})

ticket5.save(function(err, ticket) {
 if (err) return console.log(err);
 console.log("Ticket saved! ", ticket);
})

var ticket6 = new Ticket({
  event: "David Bowie",
  date: "02/01/2016",
  price: 700
})

ticket6.save(function(err, ticket) {
 if (err) return console.log(err);
 console.log("Ticket saved! ", ticket);
})

var ticket7 = new Ticket({
  event: "Vanilla Ice",
  date: "09/09/2016",
  price: 30
})

ticket7.save(function(err, ticket) {
 if (err) return console.log(err);
 console.log("Ticket saved! ", ticket);
})

var ticket8 = new Ticket({
  event: "Drake",
  date: "01/01/2017",
  price: 450
})

ticket8.save(function(err, ticket) {
 if (err) return console.log(err);
 console.log("Ticket saved! ", ticket);
})

var ticket9 = new Ticket({
  event: "Kayne West",
  date: "02/03/2017",
  price: 1000
})

ticket9.save(function(err, ticket) {
 if (err) return console.log(err);
 console.log("Ticket saved! ", ticket);
})

var buyer1 = new Buyer({
  firstName: "Mike",
  lastName: "Freyer",
  userName: "aussieMike",
  email: "mike@mike.com",
  phone: "44778899880",
  tickets: [ticket7]
})


var buyer2 = new Buyer({
  firstName: "Tom",
  lastName: "Scott",
  userName: "tascott",
  email: "scott@scott.com",
  phone: "44777711880",
  tickets: [ticket8]
})


var buyer3 = new Buyer({
  firstName: "Paul",
  lastName: "Crosby",
  userName: "Crozza",
  email: "paul@paul.com",
  phone: "44477771956",
  tickets: [ticket9]
})


var seller1 = new Seller({
  firstName: "Greg",
  lastName: "Butcher",
  userName: "Hook",
  email: "greg@greg.com",
  phone: "12345678910",
  location: "London",
  tickets: [ticket1, ticket2]
})


var seller2 = new Seller({
  firstName: "Pete",
  lastName: "Tobin",
  userName: "turbo",
  email: "pete@pete.com",
  phone: "12345678910",
  location: "London",
  tickets: [ticket3, ticket4]
})


var seller3 = new Seller({
  firstName: "Donald",
  lastName: "Draper",
  userName: "CoolKat",
  email: "don@don.com",
  phone: "12345678910",
  location: "London",
  tickets: [ticket5, ticket6]
})

// Save the buyers
buyer1.save(function(err, buyer) {
 if (err) return console.log(err);
 console.log("Buyer saved! ", buyer);
})
buyer2.save(function(err, buyer) {
 if (err) return console.log(err);
 console.log("Buyer saved! ", buyer);
})
buyer3.save(function(err, buyer) {
 if (err) return console.log(err);
 console.log("Buyer saved! ", buyer);
})


// Save the Sellers
seller1.save(function(err, seller) {
 if (err) return console.log(err);
 console.log("Seller saved! ", seller);
})
seller2.save(function(err, seller) {
 if (err) return console.log(err);
 console.log("Seller saved! ", seller);
})
seller3.save(function(err, seller) {
 if (err) return console.log(err);
 console.log("Seller saved! ", seller);
})