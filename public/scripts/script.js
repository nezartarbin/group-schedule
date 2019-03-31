//*****1st Section: Variable Declarations*****

// date obj with current time
const currentTime = new Date();

/*schedule time will reflect the time shown on schedule.
Preset to current time. Could be changed based on user input
(navigating another week, for example)*/
let scheduleTime = currentTime;
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

/*Variable storing user's chosen availability, which will
be reflected on DOM*/
var availability = {};

// availability retrieved from database
//reflected in "frequency count"
var dbAvailability = {};

const button = {
    leftArrow: document.getElementById("arrow-left"),
    reset: document.getElementById("reset"),
    rightArrow: document.getElementById("arrow-right"),
    submit: document.getElementById("submit-time")
};

//*****2nd Section: Executable Code *****

//make HTTP request to our server and retrieve availability to store in dbAvailability
axios.get("/time")
.then((res) => {
    console.log(res.data);
    //res.data contains schedule times separated by submission and user
    //We destructure and then combine all availabilities into one object,
    //wihtout user differentiation.
    for (i in res.data) {
        for (j in res.data[i].time) {
            if (dbAvailability.hasOwnProperty(j)) {
                for (hr in res.data[i].time[j]) {
                    if (dbAvailability[j].hasOwnProperty(hr)) {
                        dbAvailability[j][hr] = dbAvailability[j][hr] + 1;
                    }
                    else {
                        dbAvailability[j][hr] = 1;
                    }
                }
            }
            else {
                dbAvailability[j] = res.data[i].time[j];
            }
        }
    }
}).then(() => {
    //we should generate the DOM objects only after database info retrieved
    scheduleGenerate();
    timeConfig();
}).catch((err) => console.log(err))

button.leftArrow.addEventListener("click", () => {
    timeOffset(-7);
    timeConfig();
})

button.rightArrow.addEventListener("click", () => {
    timeOffset(7);
    timeConfig();
})

button.reset.addEventListener("click", () => {
    scheduleTime = currentTime;
    availability = {};
    timeConfig();
})

button.submit.addEventListener("click", postSchedule);




//*****3rd Section: Function Declarations*****

//change "scheduleTime" and offset it from "currentTime" by a given number of days
function timeOffset(dayOffset) {
    scheduleTime = new Date(scheduleTime.getFullYear(), scheduleTime.getMonth(), (scheduleTime.getDate() + dayOffset));
};

//checks if an object is completely empty and has no properties
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function clickDiv() {
    //"this" refers to the time slot that was clicked to activate this event listener.
    //querySelectorAll will return an array of all day divs.
    //We need the dayDiv that has the same "weekDay" property as the selected time slot
    //We only want the time object associated with the day div, hence .time at the end.
    let dayDivTime = document.querySelectorAll(".schedule-label")[this.weekDay].time;
    //create a string of the date attached to the clicked div, separated by underscore
    let dateOnDiv = `${dayDivTime.getDate()}_${dayDivTime.getMonth()}_${dayDivTime.getFullYear()}`;
    if (this.state.clicked == false) {
        // if availability does not contain a property with dateOnDiv, we create it
        if (availability.hasOwnProperty(dateOnDiv) == false) {
            availability[dateOnDiv] = {};
        }
        availability[dateOnDiv][this.hour] = 1;
        this.state.clicked = true;
        this.className = "schedule-cell-clicked";
    }
    //unselecting a time slot shall remove it from availability
    else {
        delete availability[dateOnDiv][this.hour];
        if (isEmpty(availability[dateOnDiv]) == true) {
            delete availability[dateOnDiv]
        };
        this.state.clicked = false;
        this.className = "schedule-cell";
    }
    console.log(availability);
}

//make a post request and submit user info to database
function postSchedule() {
    let submission = {
        _id: document.querySelector("#id").value,
        user: document.querySelector("#username").value,
        time: availability
    };
    console.log(submission);

    axios.post('/time', submission)
    .then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    })
}

//Day Divs are the first row divs containing day names and dates
function createDayDiv(container) {
    let dayDiv = document.createElement("div");
    dayDiv.className= "schedule-label";
    container.appendChild(dayDiv);
}

function createTimeSlot(hour, container) {
    var timeSlot = document.createElement("div");
    timeSlot.hour = hour;
    timeSlot.className = "schedule-cell";

    let ampm = hour >= 12 ? " PM" : " AM";
    hour = hour%12;
    hour = hour ? hour : 12;
    timeSlot.textContent = hour + ampm;
    timeSlot.weekDay = weekDay;
    timeSlot.state = {clicked: false};
    container.appendChild(timeSlot);
    timeSlot.addEventListener("click", clickDiv);
    return timeSlot;
}

function createFrequencyCounter(hour,weekDay,container) {
    var frequency = document.createElement("div");
    frequency.className = "freqcount";
    frequency.count = 0;
    frequency.hour = hour;
    frequency.weekDay = weekDay;
    container.appendChild(frequency);
}

//populate grid onto the DOM
function scheduleGenerate() {
    const labelContainer = document.getElementById("labels");
    const timeSlotContainer = document.querySelector("#schedule-div");

    for (weekDay=0; weekDay<7;weekDay++){
        createDayDiv(labelContainer);
        for (i=0; i < 24; i++) {
            const timeSlot = createTimeSlot(i,timeSlotContainer);
            createFrequencyCounter(i,weekDay,timeSlot);
        }
    }
}

//Fill in day names and date strings inside Day Divs.
function labelDayDivs(dayDivs) {
    for (let i=0,weekday=0,len=dayDivs.length;i<len;i++,weekday++) {
        let monthDate = scheduleTime.getDate() + (weekday - scheduleTime.getDay());
        dayDivs[i].time = new Date(scheduleTime.getFullYear(), scheduleTime.getMonth(), monthDate);

        dayDivs[i].innerHTML = dayNames[weekday] + "<br>" + monthNames[dayDivs[i].time.getMonth()] + " " + dayDivs[i].time.getDate();
    }
}

/*This tells each time slot to display either "clicked=true" or "clicked=false"
and then displays the slot as green or not accordingly.
It is used when changing to another week. In future, will use for
loading data from same user's previous session*/
function updateClickedState(divs, dayDivs) {
    for (let i=0,len=divs.length;i<len;i++) {
        let div=divs[i];
        let time = dayDivs[div.weekDay].time;
        let today = time.getDate() + "_" + time.getMonth() + "_" + time.getFullYear();
        if (availability.hasOwnProperty(today)) {
            if (availability[today].hasOwnProperty(div.hour)) {
                div.state.clicked = true;
                div.className = "schedule-cell-clicked";
            }
        }
        else {
            div.state.clicked = false;
            div.className = "schedule-cell";
        }
    }
}

//Similar to above function, but updated frequency counters instead of the slots
function updateFrequencyCount(freqs, dayDivs) {
    for (let i=0,len=freqs.length;i<len;i++) {
        let freq = freqs[i];
        let time = dayDivs[freq.weekDay].time;
        let dayDivTime = `${time.getDate()}_${time.getMonth()}_${time.getFullYear()}`;
        if (dbAvailability.hasOwnProperty(dayDivTime) && dbAvailability[dayDivTime].hasOwnProperty(freq.hour)) {
            freq.count = dbAvailability[dayDivTime][freq.hour];
        }
        else {
            freq.count = 0;
        }
        freq.textContent = "x " + freq.count;
    }
}

function timeConfig() {
    //label header
    var dayDivs = document.getElementById("labels").children;
    labelDayDivs(dayDivs);

    //display a cell as clicked or unclicked based on what is in "availability".
    updateClickedState(document.querySelector("#schedule-div").children, dayDivs);
    updateFrequencyCount(document.querySelectorAll(".freqcount"), dayDivs);
}