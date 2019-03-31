# Group Schedule
This is a Javascript / Node JS web app for scheduling availability times (for groups), 
and storing submitted availability times in a database so that they can be accessed
and viewed later. This makes it easy for groups to be able to visualize
other members' availability and time conflicts, and determine the best and most optimal time
for scheduling an event, and ensure the most people can meet during that time.

![App interface](/screenshots/app-interface-top-filled-02.PNG)

## Purpose
The purpose of this app was to practice Javascript and Node JS
This is the first application that I build completely independently, and was
my own idea, so please let me know if you find any logic errors or inefficiencies.
Thank you!

## Features
- Displays 7 days for each day of the week, and 24 hours\ time slots for each hour of the day
in a grid form for easier readability.
- Allows navigation to previous and next weeks, and select from any day of the year.
    - Navigating weeks does not erase another week's selection.
- Memorizes and shows user's current selection of time slots in the current session
by highlighting the slot in green.
- Shows the number of users who previously selected a given time slot.
- Saves user submissions in a database, which will later be reflected in the frequency
for another user or another session.

## Description
- Shows a grid of:
  - 7 columns constituting 7 days of the current week
  - 24 rows constituting each hour of the day, and one header row marking each
  day of the week and its date.
  ![Blank app interface](/screenshots/app-interface-top-blank-02.PNG)
- Each cell (except in header) displays the hour it references to in 12-hour format
- Each cell shows a number in the corner (example: x2) which denotes the number of
times this exact slot was selected and submitted before, as retrieved from the database
- Upon clicking a cell, it is highlighted in green and stored in memory.
  - clicking again un-highlights time slot and removes it from memory.
- The red arrow buttons at the top:
  - When clicked, switch to the week next (right button) or previous (left button)
  to the currently-displayed week, which changes the dates in the header row, and changes
  what is highlighed in green based on what is stored in memory for that specific week
- The "Reset" Button clears memory from selected time slots, and takes the user back
to display the current week.
- Submissions are saved in a local MongoDB database, and are organized by user
- Each submission has a unique ID.
    - The database will not allow more than one submission with the same ID.
    - At this time, the unique ID is entered by the user along with the username
    at the bottom. It is intended to change this later, and automatically assign a unique ID

## Logic and Code:
### Front-end:
*to be added*
### Back-end:
*to be added*

## Setup:
*MORE DETAILS WILL BE ADDED LATER*  

- Install Node.JS
- Install NPM
- Install MongoDB
- Set up and run MongoDB
- in repository, run: `npm install`
- in command line, run `index.js` with  Node.JS
- in browser, visit `localhost:3000`
- App should work.

## Technologies Used
1. **Javscript (JS):** Front-end scripting language
2. **Node.js:** Javascript runtime environment for executing JS
code in the Back-end (or outside of the browser)
3. **NPM:** Node.js package manager.
4. **Axios:** Promise-based Javascript HTTP client for making HTTP requests.
in this project, it was used for making requests from the client-side to the server.
5. **Express.js:** Web application framework for Node.js. In this project, it was 
used to handle HTTP requests from the client side and to manipulate the MongoDB
Database.
6. **MongoDB:** noSQL database program. MongoDB stores data in JSON-like
syntax, which makes it easy to use with Javascript and Node.
7. **MongoDB Node.js Native Driver:** MongoDB's native driver for Node, which
is used to communicate between the API and MongoDB.
8. **Google Fonts:** utilized Google's "Roboto" web font.

## To add later:
- User Authentication
- Use document fragments when populating DOM elements
- Make Responsive: Make grid full width for small screens
- Add scroll bar for the main grid, so only the grid is scrolled and not the entire page
- (Possibly a good idea?) Assign unique ID to each submission
- Choosing Scheduling events and separating them
- Using other databases
- Switch between 12-hour and 24-hour formats
- Ability to select time slots less than an hour
- Apply heatmap to show availability of other users
- Ability of viewing a specific user's availability
- Ability to view which users chose a specific time slot
- (Possibly a good idea?) dividing JS files
- Add links to technologies used
- Maybe host online??
- ~~Rename variables and functions with better names~~
- ~~Ability to unhighlight and unselect a time slot by clicking again~~
- ~~Ability to change between weeks~~
- ~~Memorize selected time slots when changing between weeks without conflating selections~~
- ~~Submit selections to a database~~
- ~~retrieve and display previously-submitted time selections~~
- ~~Assign username to each submission~~
- ~~Split large functions into smaller functins for code clarity~~