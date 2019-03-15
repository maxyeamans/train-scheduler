# Train Scheduler

## What it is
This is an app meant to simulate the schedule you would see at a train station. The table at the top lists the available train lines, how many minutes between arrivals, when the next arrival time is, and how many minutes til arrival.

## How to use it
The table at the top displays train information. To add a train, fill out the form at the bottom and submit.

## What I learned
Sooooo much. Where to start?
* Working with a database and a pseudo-intro to schemas
* Working with a library to deal with times. I tried to make sure that the logic prevented weird situations like a train with a frequency of 10 minutes but the next arrival being in 20 minutes.
* Working with forms. This was my first exposure to using `event.preventDefault()` to prevent page refreshes on form submission. This is where I also learned about using types on form inputs as a way of maintaining input validation.

## What I used
* Firebase for database to hold train info
* Moment.js for working with displaying and calculating times
* Bootstrap for table and form components
* A sprinkling of jQuery for DOM manipulation
