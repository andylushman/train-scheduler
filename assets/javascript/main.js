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
  var firstTrain = $("#first-train-input").val().trim();
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


database.ref().orderByChild("destination").on("child_added", (childSnapshot) => {
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

// Train time pushed back 1 year to make sure it comes before current time.
	var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
	console.log(firstTimeConverted); // Works

  // Current time.
	var currentTime = moment();
	console.log("Current Time: " + moment(currentTime).format("HH:mm")); // Works

	// Difference between firstTrain and currentTime in minutes.
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("Difference in time: " + diffTime); // Works

	// Time apart (remainder).
	var tRemainder = diffTime % trainFrequency;
	console.log(tRemainder); // Works

	// Minutes until next train arrives.
	var tMinutesTillTrain = trainFrequency - tRemainder;
	console.log("Minutes till train: " + tMinutesTillTrain); // Works

  // Next train from current time.
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var nextTrainPretty = moment(nextTrain).format("HH:mm");

  // Add each train's data into the table
  $("#train-table").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + nextTrainPretty + "</td><td>" + tMinutesTillTrain + "</td></tr>");

}, (errorObject) => {
  console.log("Aww snap: " + errorObject.code);
}); //End database.ref().on()
