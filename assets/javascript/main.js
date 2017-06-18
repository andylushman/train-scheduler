//=======================
//GLOBAL VARIABLES
//=======================

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDIXjfHrNm-LzFJZT-wUc5nMNxXhWVorq0",
  authDomain: "train-scheduler-77d8d.firebaseapp.com",
  databaseURL: "https://train-scheduler-77d8d.firebaseio.com",
  projectId: "train-scheduler-77d8d",
  storageBucket: "train-scheduler-77d8d.appspot.com",
  messagingSenderId: "441578825451"
};

//Initialize Friebase
firebase.initializeApp(config);
var database = firebase.database();

//=======================
//FUNCTIONS
//=======================



//=======================
//MAIN PROCESS
//=======================

// Button for adding Trains
$("#add-train-btn").on("click", (event) => {
  debugger;
  //Takes User Input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  //var firstTrain = moment($("#first-train-time").val().trim(), "DD/MM/YY").format("HHmm");
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: firstTrain,
    frequency: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  //Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  //Alert
  alert("Train successfully added");

  //Clears All Text Boxes
  $("#train-input-name").empty();
  $("#destination-input").empty();
  $("#first-train-time").empty();
  $("#frequency-input").empty();

}) //End btn click
