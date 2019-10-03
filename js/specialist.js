/* eslint-disable indent */
/* eslint-disable arrow-parens */
/* eslint-disable require-jsdoc */
function dropdownValidation() {
  const e = document.getElementById("spec1");
  const dropdownValue = e.options[e.selectedIndex].value;

  if (dropdownValue != "") {
    return dropdownValue;
  }
}

function passwordvalidation() {}

function logSpecialist() {
  console.log(dropdownValidation());
  if (dropdownValidation()) {
    console.log("Flyyyyyy...");
    const newPersons = JSON.parse(localStorage.getItem("persons"));
    newPersons.forEach(element => {
      if (element.specialist === "Flying Specialist") {
        console.log(element.id);
        rowMaker(
          0,
          element.name,
          element.id,
          element.timestamp,
          element.servicedDat,
          element.specialist,
          "table2"
        );
      }
    });
    //  });
    // es5 style
    // var javscriptPersons = newPersons.filter(function(personObj){
    //   return personObj.specialist.indexOf("Flying Specialist") > -1
    // });console.log(javscriptPersons);
  } else {
    console.log("didnt work");
  }
}
