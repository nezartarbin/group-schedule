# Group Schedule
This is a Javascript / Node JS web app for scheduling availability times, 
and storing schedule times in a database so that they can be accessed
and viewed later. This makes it easy for groups to be able to visualize
other members' availability and time conflicts, and choose the time slots
most optimal for all.

![App interface](/screenshots/app-interface-top.PNG)

## Purpose
The purpose of this app was to practice Javascript and Node JS
This is the first application that I build completely independently, and was
my own idea, so please let me know if you find any logic errors or inefficiencies.
Thank you!

## Description
- Shows a grid of:
  - 7 columns constituting 7 days of the current week
  - 24 rows constituting each hour of the day, and one header row marking each
  day of the week and its date.
- Each cell (except in header) displays the hour it references to in 12-hour format
- Each cell shows a number in the corner (example: x2) which denotes the number of
times this exact slot was selected and submitted before, as retrieved from the database
- Upon clicking a cell, it is highlighted in green and stored in memory.
  - > clicking again un-highlights time slot and removes it from memory.
- The red arrow buttons at the top:
  - When clicked, switch to the week next (right button) or previous (left button)
  to the currently-displayed week, which changes the dates in the header row, and changes
  what is highlighed in green based on what is stored in memory for that specific week
- The "Reset" Button clears memory from selected time slots, and takes the user back
to display the current week.

### Logic and Code:
#### Front-end:
*to be added*
#### Back-end:
*to be added*

## Setup:
*to be added*

## Technologies Used
1. **Javscript (JS):** Front-end scripting language
2. **Node.js:** Javascript runtime environment for executing JS
code in the Back-end (or outside of the browser)
3. **Axios:** Promise-based Javascript HTTP client for making HTTP requests.
in this project, it was used for making requests from the client-side to the server.
4. **Express.js:** Web application framework for Node.js. In this project, it was 
used to handle HTTP requests from the client side and to manipulate the MongoDB
Database.
5. **MongoDB:** noSQL database program. MongoDB stores data in JSON-like
syntax, which makes it easy to use with Javascript and Node.
6. **MongoDB Node.js Native Driver:** MongoDB's native driver for Node, which
is used to communicate between the API and MongoDB.

## To add later:
- User Authentication
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
- ~~Ability to unhighlight and unselect a time slot by clicking again~~
- ~~Ability to change between weeks~~
- ~~Memorize selected time slots when changing between weeks without conflating selections~~
- ~~Submit selections to a database~~
- ~~retrieve and display previously-submitted time selections~~
- ~~Assign username to each submission~~
