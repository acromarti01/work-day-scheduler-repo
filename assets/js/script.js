const arrayOfTimes = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
const arrayOfLabelEls = document.querySelectorAll(".lbl");
const arrayOfTextareaEls = document.querySelectorAll(".textarea");

function fillTimesAndCurrentDay() {    
    $("#currentDay").text(moment().format("dddd, MMMM, Do"));
    for (let i = 0; i < arrayOfLabelEls.length; i++) { arrayOfLabelEls[i].textContent = arrayOfTimes[i]; }    
}
function populateTextareas()
{
    const arrayOfTimes = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
    for (let i = 0; i < arrayOfTimes.length; i++)
    {
        if (localStorage.getItem(arrayOfTimes[i]) === null || localStorage.getItem(arrayOfTimes[i]) === "") { continue; }
        else { arrayOfTextareaEls[i].value = localStorage.getItem(arrayOfTimes[i]); }
    }    
}
function colorCodeTimeBlocks() {    
    const getCurrentHour = String(moment().hour())
    const currentTime = moment(`${getCurrentHour}:00`,"HH:mm a");    
    let timeSlot;
    let hourTime;
    let amOrPm;
    for (let i = 0; i < arrayOfLabelEls.length; i++) {
        const time = arrayOfLabelEls[i].textContent;
        if (time.length === 3) {
            hourTime = time.substring(0, 1);
            amOrPm = time.substring(1);
        }
        else {
            hourTime = time.substring(0, 2);
            amOrPm = time.substring(2);
        }
        timeSlot = moment(`${hourTime}:00 ${amOrPm}`, "HH:mm a");
        if (currentTime.isBefore(timeSlot)) { arrayOfTextareaEls[i].style.backgroundColor = "lightgreen"; }
        else if (currentTime.isAfter(timeSlot)) { arrayOfTextareaEls[i].style.backgroundColor = "lightgrey"; }
        else { arrayOfTextareaEls[i].style.backgroundColor = "#F08080"; }
    }
}
function submitClick(event) {
    event.preventDefault();
    const buttonId = document.getElementById(this.id); //the button that is clicked  
    const txtVal = buttonId.parentNode.parentNode.querySelector("textarea").value;
    const labelVal = buttonId.parentNode.parentNode.querySelector("label").textContent.trim();
    localStorage.setItem(`${labelVal}`, `${txtVal}`);
}


fillTimesAndCurrentDay();
populateTextareas();
colorCodeTimeBlocks();
$(".btn").on("click", submitClick);
//$("#first-btn").on("submit", submitClick);   //DOES NOT WORK ASK WHY??!!!!!!!!!!!!!!


