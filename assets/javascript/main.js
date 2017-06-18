//=======================
//GLOBAL VARIABLES
//=======================

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDIXjfHrNm-LzFJZT-wUc5nMNxXhWVorq0",
  authDomain: "train-scheduler-77d8d.firebaseapp.com",
  databaseURL: "https://train-scheduler-77d8d.firebaseio.com",
  //projectId: "train-scheduler-77d8d",
  storageBucket: "train-scheduler-77d8d.appspot.com",
  messagingSenderId: "441578825451"
};

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
    event.preventDefault();

  //Takes User Input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var firstTrain = moment($("#first-train-input").val().trim(), "DD/MM/YY").format("HHmm");
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
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");

}); //End btn click


database.ref().on("child_added", (childSnapshot) => {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;

  //Log Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(firstTrain);
  console.log(trainFrequency);

  //Variables for ccalculations
  //First time for intial value
  var startTime = moment(firstTrain, 'hh:mm');
  //Current time to find out difference
  var currentTime = moment();
  //Difference between initial and current
  var difference = moment().diff(moment(startTime), "minutes");
  //modular math to figure out time
  var remainder = difference % trainFrequency;
  //minutes away time calculation
  var minsAway = trainFrequency - remainder;
  //calculate the next train arrival time
  var nextArrival = moment().add(minsAway, "minutes");

  // Add each train's data into the table
  $("#train-table").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minsAway + "</td></tr>");

}); //End database.ref().on()
