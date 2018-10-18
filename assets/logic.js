/* // Initialize Firebase */

var config = {
  apiKey: "AIzaSyCYpjM23ivLhMJ5dQnaPzdYjhVu7En6cX4",
  authDomain: "train-schedule-a4c97.firebaseapp.com",
  databaseURL: "https://train-schedule-a4c97.firebaseio.com",
  projectId: "train-schedule-a4c97",
  storageBucket: "train-schedule-a4c97.appspot.com",
  messagingSenderId: "799742551703"
};

firebase.initializeApp(config);

var database = firebase.database();
database.ref().on("child_added", function(snapshot) {
  var trainName = snapshot.val().train;
  var destination = snapshot.val().destination;
  var frequency = snapshot.val().frequency;
  var first = snapshot.val().first;

  var firstTimeConverted = moment(first, "HH:mm").subtract(1, "years");

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // // Time apart (remainder)
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  // // Minute Until Train
  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var nextTrainFormat = moment(nextTrain).format("hh:mm");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  console.log(nextTrain);
  console.log(snapshot.val());
  $("#train-table tbody").append(
    `
            <tr>
                <td>${trainName}</td>
                <td>${destination}</td>
                <td>${frequency}</td>
                <td>${nextTrainFormat}</td>
                <td>${tMinutesTillTrain}</td>
            </tr>
        `
  );
});
$("button").on("click", function(event) {
  event.preventDefault();
  var trainName = $("#train-name").val();
  var destination = $("#destination").val();
  var frequency = $("#frequency").val();
  var first = $("#first-train").val();
  $("#train-name").val("");
  $("#destination").val("");
  $("#frequency").val("");
  $("#first-train").val("");
  database.ref().push({
    train: trainName,
    destination: destination,
    frequency: frequency,
    first: first
  });
  $("#train-table tbody").append(
    `
            <tr>
                <td>${trainName}</td>
                <td>${destination}</td>
                <td>${frequency}</td>
                <td>${nextTrainFormat}</td>
                <td>${tMinutesTillTrain}</td>
            </tr>
        `
  );
});
