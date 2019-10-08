function loadPage() {
  loadBoardBySpecialist('Flying Specialist', 'table3');
  loadBoardBySpecialist('Invisibility Specialist', 'table4');
  loadBoardBySpecialist('Transformation Specialist', 'table5');
  showDateAndTime();
}

function loadBoardBySpecialist(spec, tableId) {
  const persons = JSON.parse(localStorage.getItem('persons'));
  const specialist = spec;
  specCustomers = persons
    .filter(function(p) {
      return p.specialist == specialist && p.servicedDate == 'not served';
    })
    .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));

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

function showDateAndTime() {
  var dateAndTime = new Date();
  var date = dateAndTime.toString().substr(3, 12);
  var time = dateAndTime.toString().substr(16, 8);
  document.getElementById('date').innerHTML = date;
  document.getElementById('time').innerHTML = time;
  setTimeout(showDateAndTime, 500);
}
