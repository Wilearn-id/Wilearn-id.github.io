const months2 = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let dateSc = new Date();

function getCurrentDate(element, asString) {
  if (element) {
    if (asString) {
      return (element.textContent =
        weekdays[dateSc.getDay()] +
        ", " +
        dateSc.getDate() +
        " de " +
        months2[dateSc.getMonth()] +
        " de " +
        dateSc.getFullYear());
    }
    return (element.value = dateSc.toISOString().substr(0, 10));
  }
  return dateSc;
}

function generateCalendar() {
  const calendar = document.getElementById("calendarSchedule");
  if (calendar) {
    calendar.remove();
  }

  const table = document.createElement("table");
  table.id = "calendarSchedule";

  const trHeader = document.createElement("tr");
  trHeader.className = "weekendsSchedule";
  weekdays.map((week) => {
    const th = document.createElement("th");
    const w = document.createTextNode(week.substring(0, 3));
    th.appendChild(w);
    trHeader.appendChild(th);
  });

  table.appendChild(trHeader);

  const weekDay = new Date(dateSc.getFullYear(), dateSc.getMonth(), 1).getDay();
  const lastDay = new Date(
    dateSc.getFullYear(),
    dateSc.getMonth() + 1,
    0
  ).getDate();

  let tr = document.createElement("tr");
  let td = "";
  let empty = "";
  let btn = document.createElement("button");
  let week = 0;

  while (week < weekDay) {
    td = document.createElement("td");
    empty = document.createTextNode(" ");
    td.appendChild(empty);
    tr.appendChild(td);
    week++;
  }

  for (let i = 1; i <= lastDay; ) {
    while (week < 7) {
      td = document.createElement("td");
      let text = document.createTextNode(i);
      btn = document.createElement("button");
      btn.className = "btn-day-schedule";
      btn.addEventListener("click", function () {
        changeDate(this);
      });
      week++;

      if (dateSc.getMonth() === 5 && i === 25) {
        btn.addEventListener("mouseenter", showBox);
        btn.addEventListener("mouseleave", hideBox);
        btn.addEventListener("mouseenter",hideHeaderCalendar);
        btn.addEventListener("mouseleave",showHeaderCalendar);
        
        const dot = document.createElement("span");
        dot.className = "dot";
        btn.appendChild(dot);
      }

      if (i <= lastDay) {
        i++;
        btn.appendChild(text);
        td.appendChild(btn);
      } else {
        text = document.createTextNode(" ");
        td.appendChild(text);
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
    tr = document.createElement("tr");
    week = 0;
  }

  const content = document.getElementById("tableCalendarSchedule");
  content.appendChild(table);
  changeActive();
  changeHeader(dateSc);
  // document.getElementById("dateSc").textContent = dateSc;
  getCurrentDate(document.getElementById("currentDateSchedule"), true);
  getCurrentDate(document.getElementById("dateSc"), false);

}

function setDate(form) {
  let newDate = new Date(form.dateSc.value);
  dateSc = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1);
  generateCalendar();
  return false;
}

function changeHeader(dateHeader) {
  const month2 = document.getElementById("month-header");
  if (month2.childNodes[0]) {
    month2.removeChild(month2.childNodes[0]);
  }
  const headerMonth = document.createElement("h4");
  const textMonth = document.createTextNode(
    months2[dateHeader.getMonth()].substring(0, 3) +
      " " +
      dateHeader.getFullYear()
  );
  headerMonth.appendChild(textMonth);
  month2.appendChild(headerMonth);
}

function changeActive() {
  let btnList = document.querySelectorAll("button.active");
  btnList.forEach((btn) => {
    btn.classList.remove("active");
  });
  btnList = document.getElementsByClassName("btn-day-schedule");
  for (let i = 0; i < btnList.length; i++) {
    const btn = btnList[i];
    if (btn.textContent === dateSc.getDate().toString()) {
      btn.classList.add("active");
    }
  }
}

function resetDate() {
  dateSc = new Date();
  generateCalendar();
}

function changeDate(button) {
  let newDay = parseInt(button.textContent);
  dateSc = new Date(dateSc.getFullYear(), dateSc.getMonth(), newDay);
  generateCalendar();
}

function nextMonth() {
  dateSc = new Date(dateSc.getFullYear(), dateSc.getMonth() + 1, 1);
  generateCalendar();
}

function prevMonth() {
  dateSc = new Date(dateSc.getFullYear(), dateSc.getMonth() - 1, 1);
  generateCalendar();
}

function prevDay() {
  dateSc = new Date(dateSc.getFullYear(), dateSc.getMonth(), dateSc.getDate() - 1);
  generateCalendar();
}

function nextDay() {
  dateSc = new Date(dateSc.getFullYear(), dateSc.getMonth(), dateSc.getDate() + 1);
  generateCalendar();
}

function showBox() {
  const box = document.getElementById("box");
  box.style.display = "block";
}

function hideBox() {
  const box = document.getElementById("box");
  box.style.display = "none";
}

function hideHeaderCalendar(){
  const hideHeadCal = document.getElementsByClassName("monthSchedule");
  const hideButtonsCal = document.getElementsByClassName("buttons");
  for (let i = 0; i < hideHeadCal.length; i++) {
    hideHeadCal[i].style.display = "none";
    hideButtonsCal[i].style.display="none";
  }
}

function showHeaderCalendar(){
  const hideHeadCal = document.getElementsByClassName("monthSchedule");
  const hideButtonsCal = document.getElementsByClassName("buttons");
  for (let i = 0; i < hideHeadCal.length; i++) {
    hideHeadCal[i].style.display = "flex";
    hideButtonsCal[i].style.display="flex";
  }
}


window.onload = generateCalendar;