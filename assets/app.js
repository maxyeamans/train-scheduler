// Initialize Firebase
var config = {
    apiKey: "AIzaSyBvcyTVrEsTpSi01NWo93FMRk-3mvA3mKc",
    authDomain: "choo-choo-melon-farmer.firebaseapp.com",
    databaseURL: "https://choo-choo-melon-farmer.firebaseio.com",
    projectId: "choo-choo-melon-farmer",
    storageBucket: "choo-choo-melon-farmer.appspot.com",
    messagingSenderId: "153922397437"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train").on("click", function (event) {
    // Prevent form from refreshing page
    event.preventDefault();

    // Variables to hold form input
    var inputName = $("#name-input").val().trim();
    var inputDest = $("#dest-input").val().trim();
    var inputTime = $("#time-input").val().trim();       // Stored in 24h format
    var inputFreq = $("#freq-input").val().trim();

    // Push stored values to database
    database.ref().push({
        name: inputName,
        destination: inputDest,
        time: inputTime,
        frequency: inputFreq
    });

    // Clear the form on submit
    $("#name-input").val("");
    $("#dest-input").val("");
    $("#time-input").val("");
    $("#freq-input").val("");

});

// Global scope variables because that's the only way I could get them to work
var difference;
var minsAway;
var nextArrival;
var momentFirstArrival;

// Add train values to page when added to database
database.ref().on("child_added", function (snapshot) {


    console.log(snapshot.val());

    // Shortcut for getting values because Firebase is annoyingggggg
    var snap = snapshot.val();

    // Get the first arrival time and arrival frequency
    momentFirstArrival = moment(snap.time, "hh:mm");
    var freq = snap.frequency;

    /*  This is my attempt to code around the fact that trains have to stop
        running at some point. So, I thought it'd be fun to code around the 
        limitation of having the trains stop running at midnight. This was 
        not a fun exercise.
    */

    // If the current time is *after* the first arrival of the train
    if (moment().isAfter(momentFirstArrival)) {
        console.log("Current time is after first arrival");
        console.log(momentFirstArrival);
        difference = moment().diff(momentFirstArrival, "minutes");
        console.log("Difference", difference, "Frequency", freq);
        // This makes sure that you don't wind up with a train with a
        // frequency of 10 and a next arrival of 20 minutes.
        if (difference % freq == 0) {
            minsAway = 0;
        }
        else {
            minsAway = freq - (difference % freq);
        };
    }
    // Else if the train's first arrival hasn't happened for the day...
    else {
        console.log("Current time is before first arrival");
        minsAway = (momentFirstArrival.diff(moment(), "minutes")) + 1;
        console.log(minsAway + " minutes til next arrival");
    }
    // TODO: add statement that checks if 1st arrival and frequency mean a next arrival will never come.

    // Calculate the next arrival time
    nextArrival = moment().add(minsAway, "minutes").format("hh:mm A");
    console.log(nextArrival);

    // Create new row element to hold the database data
    var tblRow = $("<tr>");

    // Add database data to table data elements
    var tblName = $("<td>").text(snap.name);
    var tblDest = $("<td>").text(snap.destination);
    var tblFreq = $("<td>").text(snap.frequency);
    var tblNxtArr = $("<td>").text(nextArrival);
    var tblMinsAway = $("<td>").text(minsAway);

    // Add table data elements to the table row
    tblRow.prepend(tblName, tblDest, tblFreq, tblNxtArr, tblMinsAway);

    // Add the filled table row to the table
    $("#train-data").prepend(tblRow);

});