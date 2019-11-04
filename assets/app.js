// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyBeFqMuGswUHWfJqR5sOixD5MFHw5eSTU0",
  authDomain: "trainschedule-583e0.firebaseapp.com",
  databaseURL: "https://trainschedule-583e0.firebaseio.com",
  projectId: "trainschedule-583e0",
  storageBucket: "trainschedule-583e0.appspot.com",
  messagingSenderId: "364232814777",
  appId: "1:364232814777:web:01ddec25aaa566ff07ab68",
  measurementId: "G-10YS0N8YH6"
};
// Initialize Firebase
firebase.initializeApp(config);

var database = firebase.database();

//Fill Firebase with initial data when button is clicked

$("#addTrain").on("click", function(event) {
  event.preventDefault();

  //User input from fields and assign to variables
  trainName = $("#trainName")
    .val()
    .trim();
  destination = $("#destination")
    .val()
    .trim();
  firstTrain = $("#firstTrain")
    .val()
    .trim();
  frequency = $("#frequency")
    .val()
    .trim();

  //Place for local temporary storage to operate on the train data

  var tempTrain = {
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  //Upload train data to Firebase database
  database.ref().push(tempTrain);

  //Testing in console.log
  console.log("These values were pushed to Firebase");
  console.log(tempTrain.trainName);
  console.log(tempTrain.destination);
  console.log(tempTrain.firstTrain);
  console.log(tempTrain.frequency);

  alert("Train successfully added");

  //reset the input boxes

  $("trainName"), val("");
  $("destination"), val("");
  $("firstTrain"), val("");
  $("frequency"), val("");
});

//This handles the Firebase event that pulls the data into the html and formats correctly

database.ref().on(
  "child_added",
  function(snapshot, previousChildKey) {
    console.log(snapshot.val());

    //store all in a variable

    var dbName = snapshot.val().trainName;
    var dbDestination = snapshot.val().destination;
    var dbFirstTrain = snapshot.val().firstTrain;
    var dbFrequency = snapshot.val().frequency;

    var timeArr = dbFirstTrain.split(" : ");
    var trainTime = moment()
      .hours(timeArr[0])
      .minutes(timeArr[1]);

    var maxMoment = moment.max(moment(), trainTime);
    var tMinutes;
    var tArrival;

    // If the first train is later than the current time, set arrival to be first train time

    if (maxMoment === trainTime) {
      tArrival = trainTime.format("HH:mm A");
      tMinutes = trainTime.diff(moment(), "minutes");
    } else {
      // calculate minutes until arrival

      var differenceTimes = moment().diff(trainTime, "minutes");
      var tRemainder = differenceTimes % dbFrequency;
      tMinutes = dbFrequency - tRemainder;

      //calculate arrival time of train and adding the tMinutes to the current time

      tArrival = moment()
        .add(tMinutes, "m")
        .format("HH:mm A");
    }

    console.log("tMinutes:  ", tMinutes);
    console.log("tArrival:  ", tArrival);

    //add data to applicable column on table

    $("#train-list").append(
      "<tr><td>" +
        dbName +
        "</td><td>" +
        dbDestination +
        "</td><td>" +
        dbFrequency +
        "</td><td>" +
        tArrival +
        "</td><td>" +
        tMinutes +
        "</td></tr>"
    );
  },
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
  //<tr>
  //      <th scope="row" $(dbName)</th>
  //      <td> $(dbDestination)</td>
  //       <td> $(dbFrequency)</td>
  //      <td> $(tArrival)</td>
  //       <td> $(tMinutes)</td>
  //      </tr>       `);
);
