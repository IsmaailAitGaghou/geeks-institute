// Exercise 6:
let calendarContainer = document.getElementById("calendar");

function createCalendar(year, month) {
  const calendar = document.createElement("table");
  const header = document.createElement("tr");
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  weekdays.forEach((day) => {
    const th = document.createElement("th");
    th.textContent = day;
    header.appendChild(th);
  });
  calendar.appendChild(header);

  const daysInMonth = new Date(year, month, 0).getDate();
  let currentDay = 1;

  for (let week = 0; week < 6; week++) {
    const tr = document.createElement("tr");

    for (let day = 0; day < 7; day++) {
      const td = document.createElement("td");

      if (currentDay <= daysInMonth) {
        td.textContent = currentDay;
        currentDay++;
      }

      tr.appendChild(td);
    }

    calendar.appendChild(tr);
  }

  calendarContainer.appendChild(calendar);
}


createCalendar(2025, 9);