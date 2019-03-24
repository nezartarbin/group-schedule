const currentTime = new Date();
let scheduleTime = currentTime;
const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
var availability = {};
var dbAvailability = {};

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
    scheduleGenerate();
    timeConfig();
}).catch((err) => console.log(err))

function timeOffset(dayOffset) {
    scheduleTime = new Date(scheduleTime.getFullYear(), scheduleTime.getMonth(), (scheduleTime.getDate() + dayOffset));
};

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function clickDiv() {
    let daydiv = document.querySelectorAll(".schedule-label")[this.weekDay].time;
    let today = daydiv.getDate() + "_" + daydiv.getMonth() + "_" + daydiv.getFullYear();
    if (this.state.clicked == false) {
        let d = new Date(daydiv.getFullYear(),daydiv.getMonth(),daydiv.getDate(),this.hour);
        if (availability.hasOwnProperty(today) == false) {availability[today] = new Object()};
        availability[today][this.hour] = 1;
        this.state.clicked = true;
        this.className = "schedule-cell-clicked";
    }
    else {
        delete availability[today][this.hour];
        if (isEmpty(availability[today]) == true) {
            delete availability[today]
        };
        this.state.clicked = false;
        this.className = "schedule-cell";
    }
    console.log(availability);
}

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

function createDayLabel(container) {
    let labelDiv = document.createElement("div");
    labelDiv.className= "schedule-label";
    container.appendChild(labelDiv);
}

function createTimeSlot(hour, container) {
    var childDiv = document.createElement("div");
    childDiv.hour = hour;
    childDiv.className = "schedule-cell";

    let ampm = hour >= 12 ? " PM" : " AM";
    hour = hour%12;
    hour = hour ? hour : 12;
    childDiv.textContent = hour + ampm;
    childDiv.weekDay = weekDay;
    childDiv.state = {clicked: false};
    container.appendChild(childDiv);
    return childDiv;
}

function createFrequencyCounter(hour,weekDay,container) {
    var freqCount = document.createElement("div");
    freqCount.className = "freqcount";
    freqCount.count = 0;
    freqCount.hour = hour;
    freqCount.weekDay = weekDay;
    container.appendChild(freqCount);
}

function scheduleGenerate() {
    const labelContainer = document.getElementById("labels");
    const timeSlotContainer = document.querySelector("#schedule-div");

    for (weekDay=0; weekDay<7;weekDay++){
        createDayLabel(labelContainer);
        for (i=0; i < 24; i++) {
            const timeSlot = createTimeSlot(i,timeSlotContainer);
            createFrequencyCounter(i,weekDay,timeSlot);
        }
    }
}

function labelDayLabels(labelDivs) {
    let weekday = 0;
    console.log(labelDivs);
    for (let i=0,len=labelDivs.length;i<len;i++) {
        let monthDate = scheduleTime.getDate() + (weekday - scheduleTime.getDay());
        labelDivs[i].time = new Date(scheduleTime.getFullYear(), scheduleTime.getMonth(), monthDate);

        labelDivs[i].innerHTML = dayName[weekday] + "<br>" + monthNames[labelDivs[i].time.getMonth()] + " " + labelDivs[i].time.getDate();
        weekday++;
    }
}

function updateClickedState(divs, labelDivs) {
    for (let i=0,len=divs.length;i<len;i++) {
        let div=divs[i];
        let time = labelDivs[div.weekDay].time;
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

function updateFrequencyCount(freqs, labelDivs) {
    for (let i=0,len=freqs.length;i<len;i++) {
        let freq = freqs[i];
        let time = labelDivs[freq.weekDay].time;
        let today = `${time.getDate()}_${time.getMonth()}_${time.getFullYear()}`;
        if (dbAvailability.hasOwnProperty(today) && dbAvailability[today].hasOwnProperty(freq.hour)) {
            freq.count = dbAvailability[today][freq.hour];
        }
        else {
            freq.count = 0;
        }
        freq.textContent = "x " + freq.count;
    }
}

function timeConfig() {
    //label header
    var labelDivs = document.querySelector("#labels").children;
    labelDayLabels(labelDivs);

    //display a cell as clicked or unclicked based on what is in "availability".
    updateClickedState(Array.from(document.querySelector("#schedule-div").children), labelDivs);
    updateFrequencyCount(Array.from(document.querySelectorAll(".freqcount")), labelDivs);
}

var cells = document.querySelectorAll(".schedule-cell");
cells.forEach((div) => {div.addEventListener("click",clickDiv)});