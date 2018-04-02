
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDAd2GC35HfUE8fVB4KkX_xI40wqjjrAoc",
    authDomain: "andyproject-68a3c.firebaseapp.com",
    databaseURL: "https://andyproject-68a3c.firebaseio.com",
    projectId: "andyproject-68a3c",
    storageBucket: "andyproject-68a3c.appspot.com",
    messagingSenderId: "624859218122"
  };
  firebase.initializeApp(config);



var database = firebase.database();

$("#submitBtn").on("click", function (event) {
  event.preventDefault();

  var trainName = $("#trainName")
    .val()
    .trim();
  var trainDestination = $("#destination")
    .val()
    .trim();
  var firstTrainTime = $("#firstTrainTime")
    .val()
    .trim();
  var frequency = $("#frequency")
    .val()
    .trim();

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  };


  database.ref().push(newTrain);


  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrainTime").val("");
  $("#frequency").val("");
});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().firstTrainTime;
  var frequency = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(trainDestination);
  console.log(firstTrainTime);
  console.log(frequency);

  var firstTrainTimeConverted = moment(firstTrainTime, "hh:mm").subtract(
    1,
    "years"
  );

  var currentTime = moment();

  var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");

  var remainder = diffTime % frequency;

  var tMinutesTillTrain = frequency - remainder;


  var nextTrain = moment()
    .add(tMinutesTillTrain, "minutes")
    .format("hh:mm");

  $("#trainTable > tbody").append(
    "<tr><td>" +
    trainName +
    "</td><td>" +
    trainDestination +
    "</td><td>" +
    frequency +
    "</td><td>" +
    nextTrain +
    "</td><td>" +
    tMinutesTillTrain +
    "</td><td>"
  );
});
  