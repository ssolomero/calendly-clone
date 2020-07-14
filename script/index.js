var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var timesAvailable = ["9:00am", "10:00am", "11:00am", "2:00pm", "3:00pm"];

var event = JSON.parse(sessionStorage.getItem("eventObj"));
console.log(event);

document.getElementById("event").textContent = event.name;
document.getElementById("scheduler").textContent = event.organizer;
document.getElementById("duration").textContent = event.duration + "min";
document.getElementById("description").textContent = event.description;


// Calendar
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        height: 'auto',
        showNonCurrentDates: false,
        selectable: true,
        select: function(info) {
            var currentDay = new Date();
            var daySelected = info.start;
            if (daySelected >= currentDay) {

                var timeDiv = document.getElementById("available-times-div");

                while (timeDiv.firstChild) {
                    timeDiv.removeChild(timeDiv.lastChild);
                }

                //Heading - Date Selected
                var h4 = document.createElement("h4");
                var h4node = document.createTextNode(
                    days[daySelected.getDay()] + ", " +
                    months[daySelected.getMonth()] + " " + 
                    daySelected.getDate());
                h4.appendChild(h4node);

                timeDiv.appendChild(h4);

                //Time Buttons
                for (var i = 0; i < timesAvailable.length; i++) {
                    var timeSlot = document.createElement("div");
                    timeSlot.classList.add("time-slot");

                    var timeBtn = document.createElement("button");

                    var btnNode = document.createTextNode(timesAvailable[i]); 
                    timeBtn.classList.add("time-btn");

                    timeBtn.appendChild(btnNode);
                    timeSlot.appendChild(timeBtn);

                    timeDiv.appendChild(timeSlot);

                    // When time is selected
                    var last = null;
                    timeBtn.addEventListener("click", function() {
                        if (last != null) {
                            console.log(last);
                            last.parentNode.removeChild(last.parentNode.lastChild);
                        }
                        var confirmBtn = document.createElement("button");
                        var confirmTxt = document.createTextNode("Confirm");
                        confirmBtn.classList.add("confirm-btn");
                        confirmBtn.appendChild(confirmTxt);
                        this.parentNode.appendChild(confirmBtn);
                        event.time = this.textContent;
                        confirmBtn.addEventListener("click", function() { 
                            event.date = 
                                days[daySelected.getDay()] + ", " +
                                months[daySelected.getMonth()] + " " + 
                                daySelected.getDate();
                            sessionStorage.setItem("eventObj", JSON.stringify(event));
                            console.log(event);
                            window.location.href = "register.html";
                        });
                        last = this;
                    });
                }

                var containerDiv = document.getElementsByClassName("container")[0];
                containerDiv.classList.add("time-div-active");
                
                document.getElementById("calendar-section").style.flex = "2";

                timeDiv.style.display = "initial";

            } else {alert("Sorry that date has already past. Please select another date.");}
        },
    });
    calendar.render();
});

