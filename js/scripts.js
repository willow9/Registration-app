function validate() {
  var newName = document.getElementById("name");
  var newId = document.getElementById("id");
  var e = document.getElementById("spec");
  var strUser = e.options[e.selectedIndex].value;

  if (!newName.validity.valueMissing && !newId.validity.valueMissing && strUser!="") {
    
      addNewCustomer();
    }
  }

function dropdownValidation() {
  // var e = document.getElementById("spec");
  // var strUser = e.options[e.selectedIndex].value;

  // if (strUser == 0) {
  //   console.log("chose from dropdown..")

  // }
  return false;
}

function addNewCustomer() {
  var newName = document.getElementById("name").value;
  var newId = document.getElementById("id").value;
  var e = document.getElementById("spec");
  var strUser = e.options[e.selectedIndex].value;
  const persons = JSON.parse(localStorage.getItem("persons"));
  var person = {
    name: newName,
    id: newId,
    timestamp: Date.now(),
    servicedDate:"not served",
    specialist: strUser
  };
  persons.push(person);
  localStorage.setItem("persons", JSON.stringify(persons));
  reloadTable();
}

function reloadTable() {
  const newPersons = JSON.parse(localStorage.getItem("persons"));
  newPersons.forEach(element => {
    rowMaker(0, element.name, element.id, element.timestamp, "table");
  });
}

function loadCustomers() {
  console.log("Customers loading...");

  var person = {
    id: "",
    name: "",
    timestamp: "",
    servicedDate: "",
    specialist: ""

  };
  if (localStorage.getItem("persons") == null) {
    var persons = [];

    $.ajax({
      url: "words.json",
      dataType: "json",
      type: "get",
      cache: "false",
      success: function(data) {
        $(data).each(function(index, value) {
          person = {
            id: value.id,
            name: value.name,
            timestamp: value.timestamp,
            servicedDate: value.servicedDate,
            specialist: value.specialist
          };
          persons.push(person);

          persons.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1)

          rowMaker(0, value.name, value.id, value.timestamp, value.servicedDate, value.specialist, "table");
        });
        // firstClick=false;
        localStorage.setItem("persons", JSON.stringify(persons));
      }
    });
    // const newPersons = JSON.parse(localStorage.getItem("persons"));
    // newPersons.forEach(element => {
    //     rowMaker(0, element.name, element.id);
    // });
  } else {
    const newPersons = JSON.parse(localStorage.getItem("persons"));
    newPersons.forEach(element => {
      console.log(element.specialist);
      rowMaker(0, element.name, element.id, element.timestamp, element.servicedDate, element.specialist, "table");
    });
  }
}

// const a = "";

// function liMaker(a) {
//   const ul = document.getElementById("ul");
//   const li = document.createElement("li");
//   li.textContent = a;
//   ul.append(li);
// }

function rowMaker(index, name, id, timestamp, servicedDate, specialist, tableName) {
date = new Date(timestamp*1);

  const table = document.getElementById(tableName);
  const row = table.insertRow(index + 1);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);
  const cell5 = row.insertCell(4);
  cell1.innerHTML = id;
  cell2.innerHTML = name;
  cell3.innerHTML = date.toISOString().replace("T"," ").substr(0, 16);
  cell4.innerHTML = servicedDate;
  cell5.innerHTML = specialist;
}

// SPECIALIST PAGE

 function logSpecialist(){
  
    
     const newPersons = JSON.parse(localStorage.getItem("persons"));
     newPersons.forEach(element => {
       if(element.specialist==="Flying Specialist"){
       console.log(element.id);
       rowMaker(0, element.name, element.id, element.timestamp, element.servicedDate, element.specialist, "table2");
       }
      })
    //  });
    //es5 style
// var javscriptPersons = newPersons.filter(function(personObj){
//   return personObj.specialist.indexOf("Flying Specialist") > -1
// });console.log(javscriptPersons);
  }




