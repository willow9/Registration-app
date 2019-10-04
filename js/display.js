function loadPage() {
  loadBoardBySpecialist('Flying Specialist', 'table3');
  loadBoardBySpecialist('Invisibility Specialist', 'table4');
  loadBoardBySpecialist('Transformation Specialist', 'table5');
}

function loadBoardBySpecialist(spec, tableId) {
  const persons = JSON.parse(localStorage.getItem('persons'));
  const specialist = spec;
  specCustomers = persons
    .filter(function(p) {
      return p.specialist == specialist && p.servicedDate == 'not served';
    })
    .sort((a, b) => (a.color > b.color ? 1 : -1));

  specCustomers.forEach(element => {
    listMaker(element.id, element.timestamp, tableId);
  });
}

function listMaker(id, timestamp, tableId) {
  date = new Date(timestamp * 1);

  const table = document.getElementById(tableId);
  const row = table.insertRow(1);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);

  cell1.innerHTML = id;
  cell2.innerHTML = date.toString().substr(3, 18);
}
