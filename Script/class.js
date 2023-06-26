const renameClassBtn = document.getElementById('renameClassName');

  // Menambahkan event listener untuk meng-handle klik pada elemen img
  renameClassBtn.addEventListener('click', function() {
    // Menampilkan prompt untuk memasukkan teks
    const newNameClass = prompt('Masukkan nama baru:');

    // Memperbarui teks pada semua elemen dengan id "rename_agenda_child"
    const renameElementsClass = document.querySelectorAll('#rename_agenda_child');
    renameElementsClass.forEach(function(element) {
      element.textContent = newNameClass;
    });

    // Menyimpan perubahan ke local storage
    localStorage.setItem('newNameAgendaChild', newNameClass);
  });
    

  // Memeriksa apakah ada nilai teks yang tersimpan di local storage saat halaman dimuat
  document.addEventListener('DOMContentLoaded', function() {
    const savedName = localStorage.getItem('newNameAgendaChild');
    if (savedName) {
      const renameElementsClass = document.querySelectorAll('#rename_agenda_child');
      renameElementsClass.forEach(function(element) {
        element.textContent = savedName;
      });
    }
  });


  //Description text
  const saveButton = document.getElementById("saveButtonDescriptionEdit");
const descriptionEdit = document.getElementById("DescriptionEdit");

descriptionEdit.style.resize = "none"; // Prevent manual resizing

function adjustTextareaHeight() {
  descriptionEdit.style.height = "auto";
  descriptionEdit.style.height = descriptionEdit.scrollHeight + "px";
}

descriptionEdit.addEventListener("input", adjustTextareaHeight);

saveButton.style.display = "none";

descriptionEdit.addEventListener("input", function() {
  if (descriptionEdit.value.trim() !== "") {
    saveButton.style.display = "block";
  } else {
    saveButton.style.display = "none";
  }
});

saveButton.addEventListener("click", function() {
  localStorage.setItem("savedText", descriptionEdit.value);
  alert("Your changes have been saved successfully!");
});

window.addEventListener("load", function() {
  const savedText = localStorage.getItem("savedText");
  if (savedText) {
    descriptionEdit.value = savedText;
    adjustTextareaHeight(); // Adjust textarea height with saved content
  }
});


  // Table Students

// Retrieve existing table data from local storage or initialize an empty array
let tableDataClass = JSON.parse(localStorage.getItem('tableDataClass')) || [];

// Function to render the table rows
function renderTable() {
  const tableBodyClassPage = document.getElementById('table-body-class-page');
  const totalStudentsText = document.getElementById('total_students_text');
  tableBodyClassPage.innerHTML = ''; // Clear the existing content of the tbody

  tableDataClass.forEach((row, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${index + 1}</td>
      <td>${row.Name}</td>
      <td>${row.DateBirth}</td>
      <td>${row.Class}</td>
      <td>${row.Address}</td>
      <td>${row.ParentsNumber}</td>
      <td>
        <button onclick="editRow(${index})" class="class_edit_btn">Edit</button>
        <button onclick="deleteRow(${index})" class="class_del_btn">Delete</button>
      </td>
    `;
    tableBodyClassPage.appendChild(newRow);
  }); 

  const totalStudents = tableDataClass.length;
  totalStudentsText.textContent = `${totalStudents} Students`;

  

  saveToLocalStorage();
}


// Function to add a new row
function addRowClass() {
  const Name = prompt('Enter Name:');
  const DateBirth = prompt('Enter Date of Birth:');
  const Class = prompt('Enter Class:');
  const Address = prompt('Enter Address:');
  const ParentsNumber = prompt("Enter Parent's Number:");

  const newRow = { Name, DateBirth, Class, Address, ParentsNumber };
  tableDataClass.push(newRow);

  renderTable();
  saveToLocalStorage();
}

// Function to edit a row
function editRow(index) {
  const { Name, DateBirth, Class, Address, ParentsNumber } = tableDataClass[index];

  const newName = prompt('Enter Name:', Name);
  const newDateBirth = prompt('Enter Date of Birth:', DateBirth);
  const newClass = prompt('Enter Class:', Class);
  const newAddress = prompt('Enter Address:', Address);
  const newParentsNumber = prompt("Enter Parent's Number:", ParentsNumber);

  if (newName !== null && newDateBirth !== null && newClass !== null && newAddress !== null && newParentsNumber !== null) {
    tableDataClass[index] = { Name: newName, DateBirth: newDateBirth, Class: newClass, Address: newAddress, ParentsNumber: newParentsNumber };
  }

  renderTable();
  saveToLocalStorage();
}

// Function to delete a row
function deleteRow(index) {
  // Show an alert message before deleting the row
  const confirmation = confirm('Are you sure you want to delete this row?');
  
  if (confirmation) {
    tableDataClass.splice(index, 1);

    renderTable();
    saveToLocalStorage();
  }
}

// Function to save table data to local storage
function saveToLocalStorage() {
  localStorage.setItem('tableDataClass', JSON.stringify(tableDataClass));
}

// Initial rendering
renderTable();


document.addEventListener("DOMContentLoaded", function() {
      var elements = document.getElementsByTagName("body")[0].getElementsByTagName("*");
      
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        
        if (element.textContent.trim() === "H") {
          element.classList.add("hadir");
        } else if (element.textContent.trim() === "S") {
          element.classList.add("sakit");
        }
        else if (element.textContent.trim() === "A") {
          element.classList.add("absent");
        }
        else if (element.textContent.trim() === "I") {
          element.classList.add("izin");
        }
      }
    });