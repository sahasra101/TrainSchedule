var currentTime = moment().format("dddd, MMMM Do YYYY, HH:mm a");
$("#currentTime").append(currentTime);


var firebaseConfig = {
    apiKey: "AIzaSyBJu6jTvorm87AOEgyiT4n6uJrnNDDRvHI",
    authDomain: "test-app-82798.firebaseapp.com",
    databaseURL: "https://test-app-82798.firebaseio.com",
    projectId: "test-app-82798",
    storageBucket: "test-app-82798.appspot.com",
    messagingSenderId: "207425625217",
    appId: "1:207425625217:web:23c119b050842947abc180"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a variable to reference the database.
var database = firebase.database();

// If any errors are experienced, log them to console.
function checkError(errorObject) {
    console.log("The read failed: " + errorObject.code);
};

// Whenever a user clicks the submit-bid button
$("#submitInfo").on("click", function (event) {
    event.preventDefault();

    // Get the input values from index.html

    var tName = $("#iTrainName").val().trim();
    var tDestination = $("#iTrainDestination").val().trim();
    var tFrequency = $("#iTrainFrequency").val().trim();
    var tFirstArrival = $("#iFirstTrainArrival").val().trim();

    console.log(tName);
    console.log(tDestination);
    console.log(tFrequency);
    console.log(tFirstArrival);

    database.ref().push({
        trainName: tName,
        trainDestination: tDestination,
        trainFrequency: tFrequency,
        firstTrainArrival: tFirstArrival,
    });
});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.trainName);
    console.log(sv.trainDestination);
    console.log(sv.trainFrequency);
    console.log(sv.firstTrainArrival);

    var fiTrArrival = moment(sv.firstTrainArrival, "HH:mm");
    console.log(fiTrArrival);

    function addTrainToTable() {
        var table = document.getElementById("trainScheduleTable");
        var row = table.insertRow(1);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);

        cell0.innerHTML = sv.trainName;
        cell1.innerHTML = sv.trainDestination;
        cell2.innerHTML = sv.trainFrequency;
        cell3.innerHTML = moment(nextTrain).format("HH:mm");
        cell4.innerHTML = tMinutesTillTrain;

    }



    var tFreq = sv.trainFrequency;
    var fTrArr = moment(sv.firstTrainArrival, "HH:mm");
    console.log(tFreq);
    console.log(fTrArr);

    // Current Time
    var currentTime = moment().format("HH:mm");
    console.log(moment(currentTime));

    // Difference between the times
    var diffTime = moment().diff(moment(fTrArr), "minutes"); // in milliseconds?
    console.log(`Difference in time: ${diffTime}`);

    // Time apart (remainder)
    var tRemainder = diffTime % tFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));




    addTrainToTable();
});


