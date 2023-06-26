// Retrieve existing table data from local storage
let tableDataClass = JSON.parse(localStorage.getItem('tableDataClass')) || [];

// Function to render the names in the table
function renderNamesTable() {
  const tableBodyClassPage = document.getElementById('table-body-class-page');

  tableDataClass.forEach((row, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${index + 1}</td>
      <td>${row.Name}</td>
      <td>${row.Class}</td>
      <td>${row.ParentsNumber}</td>
    `;
    tableBodyClassPage.appendChild(newRow);
  });
}

// Initial rendering
renderNamesTable();


