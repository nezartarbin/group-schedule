var availability = {};
var dbAvailability = {};

axios.get("/time")
.then((res) => {
    console.log(res.data);
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
    console.log("db");
    console.log(dbAvailability);
}).then(() => timeConfig()).catch((err) => console.log(err))

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


function timeOffset(days) {
    scheduleTime = new Date(scheduleTime.getFullYear(), scheduleTime.getMonth(), (scheduleTime.getDate() + days));
};

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
        if (isEmpty(availability[today]) == true) {delete availability[today]};
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
        console.log(response);
    }).catch((err) => {
        console.log(err);
    })
}

// sep

const currentTime = new Date();
            var scheduleTime = currentTime;

            const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

            function scheduleGenerate() {

                for (weekday=0; weekday<7; weekday++) {
                    let labelDiv = document.createElement("div");
                    labelDiv.className= "schedule-label";
                    document.querySelector("#labels").appendChild(labelDiv);
                }

                for (weekday=0; weekday<7;weekday++){
                    for (i=0; i < 24; i++) {
                        var childDiv = document.createElement("div");
                        childDiv.hour = i;
                        childDiv.className = "schedule-cell";

                        let ampm = i >= 12 ? " PM" : " AM";
                        let hour = i%12;
                        hour = hour ? hour : 12;
                        childDiv.textContent = hour + ampm;
                        childDiv.weekDay = weekday;
                        childDiv.state = {clicked: false};

                        var freqCount = document.createElement("div");
                        freqCount.className = "freqcount";
                        freqCount.count = 0;
                        freqCount.hour = childDiv.hour;
                        freqCount.weekDay = childDiv.weekDay;

                        document.querySelector("#schedule-div").appendChild(childDiv);
                        childDiv.appendChild(freqCount);
                    }
                }
            }

            function timeConfig() {
                let weekday = 0;
                let labelDivs = document.querySelector("#labels").childNodes;
                labelDivs.forEach((div) => {
                    let monthDate = scheduleTime.getDate() + (weekday - scheduleTime.getDay());
                    div.time = new Date(scheduleTime.getFullYear(), scheduleTime.getMonth(), monthDate);

                    div.innerHTML = dayName[weekday] + "<br>" + monthNames[div.time.getMonth()] + " " + div.time.getDate();
                    weekday++;
                })

                Array.from(document.querySelector("#schedule-div").children).forEach((div) => {
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
                })

                Array.from(document.querySelectorAll(".freqcount")).forEach((freq) => {
                    console.log("enter");
                    let time = labelDivs[freq.weekDay].time;
                    let today = time.getDate() + "_" + time.getMonth() + "_" + time.getFullYear();
                    if (dbAvailability.hasOwnProperty(today)) {
                        if (dbAvailability[today].hasOwnProperty(freq.hour)) {
                            console.log(dbAvailability[today][freq.hour]);
                            freq.count = dbAvailability[today][freq.hour];
                            console.log(freq.count);
                        }
                        else {
                            freq.count = 0;
                        }
                    }
                    else {
                        freq.count = 0;
                    }
                    freq.textContent = "x " + freq.count;
                })
            }

            scheduleGenerate();
            // timeConfig();

            var cells = document.querySelectorAll(".schedule-cell");
            cells.forEach((div) => {div.addEventListener("click",clickDiv)});