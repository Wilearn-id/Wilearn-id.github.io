const addButtonWorkbench = document.getElementById('add-button-workbench');
const listWorkbench = document.getElementById('workbench_list');

addButtonWorkbench.addEventListener('click', () => {
  const title = prompt('Enter a title:');
  const description = prompt('Enter a description:');

  if (title && description) {
    const newItem = document.createElement('li');
    newItem.innerHTML = `<span id="titleOutput"></span><button class="delliBtnWorkbench">Delete</button><p id="descriptionOutput"></p>`;
    
    newItem.querySelector('#titleOutput').innerText = title;
    newItem.querySelector('#descriptionOutput').innerText = description;

    listWorkbench.appendChild(newItem);

    localStorage.setItem('workbench_title', title);
    localStorage.setItem('workbench_description', description);

    alert(`Title: ${title}\nDescription: ${description}`);

    let deleteTitleButton = newItem.querySelector('.delliBtnWorkbench');

    deleteTitleButton.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this item?')) {
        localStorage.removeItem('workbench_title');
        localStorage.removeItem('workbench_description');
        newItem.remove();
      }
    });
  }
});

// Memeriksa apakah ada data yang tersimpan di local storage saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  const savedTitle = localStorage.getItem('workbench_title');
  const savedDescription = localStorage.getItem('workbench_description');

  if (savedTitle && savedDescription) {
    const newItem = document.createElement('li');
    newItem.innerHTML = `<span id="titleOutput"></span><button class="delliBtnWorkbench">Delete</button><p id="descriptionOutput"></p>`;
    
    newItem.querySelector('#titleOutput').innerText = savedTitle;
    newItem.querySelector('#descriptionOutput').innerText = savedDescription;

    listWorkbench.appendChild(newItem);

    let deleteTitleButton = newItem.querySelector('.delliBtnWorkbench');

    deleteTitleButton.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this item?')) {
        localStorage.removeItem('workbench_title');
        localStorage.removeItem('workbench_description');
        newItem.remove();
      }
    });
  }
});

document.getElementById('askReschedule').addEventListener('click', function() {
  var email = prompt('Enter your email address:');
  
  if (email) {
    var date = prompt('Enter the date (YYYY-MM-DD):');
    var time = prompt('Enter the time (HH:MM to HH:MM):');
    var promptText = 'Email: ' + email + '\nDate: ' + date + '\nTime: ' + time;

    var confirmation = confirm('Do you want to send it?'+promptText);
        if (confirmation) {
          alert("Sent");
        }
  }
});

// Get reference to the tables
var table1 = document.getElementById('table_schedule_tutor');
var table2 = document.getElementById('table_schedule_tutor_detail');
// var table3 = document.getElementById('table_schedule_tutor_detail2')
// var table4 = document.getElementById('table_schedule_tutor_detail3');

// Set initial visibility
table1.style.display = 'block';
table2.style.display = 'none';
// table3.style.display = 'none';
// table3.style.display = 'none';

// Get references to the tutor rows in Table 1
var tutorRows = document.querySelectorAll('#table_schedule_tutor tr:not(.table_schedule_title_row)');

// Add click event listeners to the tutor rows
tutorRows.forEach(function(row) {
  var tutorNameCell = row.querySelector('td:first-child');
  var tutorName = tutorNameCell.textContent;

  // Check if the row belongs to Mr. Andre
  if (tutorName === 'Mr.Andre') {
    tutorNameCell.addEventListener('click', function() {
      toggleTables();
      console.log('Clicked Mr. Andre in Table 1');
    });
  }
});

// Get references to the tutor rows in Table 2
var tutorDetailRows = document.querySelectorAll('#table_schedule_tutor_detail tr:not(:first-child)');

// Add click event listeners to the tutor rows in Table 2
tutorDetailRows.forEach(function(row, index) {
  var tutorNameCell = row.querySelector('td:first-child');
  var tutorName = tutorNameCell.textContent;

  // Check if the row belongs to Mr. Andre
  if (tutorName === 'Mr. Andre') {
    tutorNameCell.addEventListener('click', function() {
      toggleTables();
      console.log('Clicked Mr. Andre in Table 2');
    });
  }
});

// Function to toggle the visibility of tables
function toggleTables() {
  if (table1.style.display === 'block') {
    table1.style.display = 'none';
    table2.style.display = 'block';
  } else {
    table1.style.display = 'block';
    table2.style.display = 'none';
  }
}
