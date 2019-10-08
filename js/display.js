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

function showDateAndTime() {
  var time = new Date();
  var date = time.toString().substr(3, 12);
  var h = time.getHours();
  var m = time.getMinutes();
  var s = time.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('time').innerHTML = h + ':' + m + ':' + s;
  document.getElementById('date').innerHTML = date;
  var t = setTimeout(showDateAndTime, 500);
}
function checkTime(i) {
  if (i < 10) {
    i = '0' + i;
  } // add zero in front of numbers < 10
  return i;
}
