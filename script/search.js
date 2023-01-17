'use strict';

const idInput = document.querySelector('#input-id');
const nameInput = document.querySelector('#input-name');
const typeInput = document.querySelector('#input-type');
const breedInput = document.querySelector('#input-breed');
const vaccinatedInput = document.querySelector('#input-vaccinated');
const dewormedInput = document.querySelector('#input-dewormed');
const sterilizedInput = document.querySelector('#input-sterilized');
const myTable = document.querySelector('#myTable');
const myTableBody = myTable.querySelector('#myTableBody');
const findBtn = document.querySelector('#find-btn');
const findByIdBtn = document.querySelector('#findById-btn');
const findByNameBtn = document.querySelector('#findByName-btn');
const findByTypeBtn = document.querySelector('#findByType-btn');
const findByBreedBtn = document.querySelector('#findByBreed-btn');
const showAllDataBtn = document.querySelector('#showAllData-btn');
const hideAllDataBtn = document.querySelector('#hideAllData-btn');

let petArr = [];
petArr = JSON.parse(localStorage.getItem('myPetList'));

// Filter Pets Functions
function filterArr(id, name, type, breed, vac, sterilized, dewormed, arr) {
  let con1 = id.toString();
  let con2 = name.toString();
  let con3 = type.toString();
  let con4 = breed.toString();
  let con5 = Boolean(vac);
  let con6 = Boolean(sterilized);
  let con7 = Boolean(dewormed);
  let filterPetArr = arr.filter((item) => {
    return (
      item.id.match(con1) &&
      item.name.match(con2) &&
      item.type.match(con3) &&
      item.breed.match(con4) &&
      item.vaccinated === con5 &&
      item.sterilized === con6 &&
      item.dewormed === con7
    );
  });
  if (filterPetArr.length === 0) {
    alert('no records found, please try again');
  } else {
    console.table(filterPetArr);
    renderTableData(filterPetArr);
    alert('records found');
  }
  return filterPetArr;
}

findBtn.addEventListener('click', (e) => {
  filterArr(
    idInput.value,
    nameInput.value,
    typeInput.value,
    breedInput.value,
    vaccinatedInput.checked,
    sterilizedInput.checked,
    dewormedInput.checked,
    petArr
  );
});

// Find By ID Function
function filterArrById(id, arr) {
  let con1 = id.toString();
  let filterPetArrById = arr.filter((item) => {
    return item.id.match(con1);
  });
  if (filterPetArrById.length === 0) {
    alert('no records found');
  } else {
    alert('records found');
    console.table(filterPetArrById);
    renderTableData(filterPetArrById);
  }
  return filterPetArrById;
}
findByIdBtn.addEventListener('click', () => {
  filterArrById(idInput.value, petArr);
});
// Find By Name Function
function filterArrByName(name, arr) {
  let con2 = name.toString();
  let filterPetArrByName = arr.filter((item) => {
    return item.name.match(con2);
  });
  if (filterPetArrByName.length === 0) {
    alert('no records found');
  } else {
    alert('records found');
    console.table(filterPetArrByName);
    renderTableData(filterPetArrByName);
  }
  return filterPetArrByName;
}
findByNameBtn.addEventListener('click', () => {
  filterArrByName(nameInput.value, petArr);
});
// Find By Type Function
function filterArrByType(type, arr) {
  let con3 = type.toString();
  let filterPetArrByType = arr.filter((item) => {
    return item.type.match(con3);
  });
  if (filterPetArrByType.length === 0) {
    alert('no records found');
  } else {
    alert('records found');
    console.table(filterPetArrByType);
    renderTableData(filterPetArrByType);
  }
  return filterPetArrByType;
}
findByTypeBtn.addEventListener('click', () => {
  filterArrByType(typeInput.value, petArr);
});
// Find By Breed Function
function filterArrByBreed(breed, arr) {
  let con4 = breed.toString();
  let filterPetArrByBreed = arr.filter((item) => {
    return item.breed.match(con4);
  });
  if (filterPetArrByBreed.length === 0) {
    alert('no records found');
  } else {
    alert('records found');
    console.table(filterPetArrByBreed);
    renderTableData(filterPetArrByBreed);
  }
  return filterPetArrByBreed;
}
findByBreedBtn.addEventListener('click', () => {
  filterArrByBreed(breedInput.value, petArr);
});
// Display All Data
showAllDataBtn.addEventListener('click', () => {
  renderTableData(petArr);
});
// Hide All Data
hideAllDataBtn.addEventListener('click', () => {
  myTableBody.innerHTML = '';
});
// ===
// Retrieve breedList from LocalStorage
let breedList = JSON.parse(localStorage.getItem('myBreedList'));
function clearBreedInput() {
  breedInput.innerHTML = '';
  const defaultOption = document.createElement('option');
  breedInput.appendChild(defaultOption);
  defaultOption.innerHTML = `<option>Select Breed</option>`;
}
// Render Breed Function
function renderBreed(arr) {
  clearBreedInput();
  arr.forEach((i) => {
    const option = document.createElement('option');
    breedInput.appendChild(option);
    option.innerHTML = `<option>${i.breed}</option>`;
  });
}

// Add Click Event To Type Input
breedInput.addEventListener('mouseover', (e) => {
  e.preventDefault();
  renderBreed(breedList);
});

// ===
// Render Table Data Function

function renderTableData(array) {
  myTableBody.innerHTML = '';
  if (Array.isArray(array) && array.length != 0) {
    for (let i = 0; i < array.length; i++) {
      var newRow = myTableBody.insertRow();
      var cell1 = newRow.insertCell(0);
      cell1.innerHTML = array[i].id;
      var cell2 = newRow.insertCell(1);
      cell2.innerHTML = array[i].name;
      var cell3 = newRow.insertCell(2);
      cell3.innerHTML = array[i].age;
      var cell4 = newRow.insertCell(3);
      cell4.innerHTML = array[i].type;
      var cell4 = newRow.insertCell(4);
      cell4.innerHTML = `${array[i].weight} kg`;
      var cell5 = newRow.insertCell(5);
      cell5.innerHTML = `${array[i].length} cm`;
      var cell6 = newRow.insertCell(6);
      cell6.innerHTML = array[i].breed;
      // cell6.innerHTML = 'breed';
      var cell7 = newRow.insertCell(7);
      cell7.innerHTML = `<i
      class="bi bi-square-fill"
      style="color: ${array[i].color}"></i>`;
      var cell8 = newRow.insertCell(8);
      cell8.innerHTML = array[i].vaccinated;
      if (array[i].vaccinated) {
        cell8.innerHTML = `<i class="bi bi-check-circle-fill"></i>`;
      } else cell8.innerHTML = `<i class="bi bi-x-circle-fill"></i>`;

      var cell9 = newRow.insertCell(9);
      if (array[i].dewormed) {
        cell9.innerHTML = `<i class="bi bi-check-circle-fill"></i>`;
      } else cell9.innerHTML = `<i class="bi bi-x-circle-fill"></i>`;
      var cell10 = newRow.insertCell(10);
      if (array[i].sterilized) {
        cell10.innerHTML = `<i class="bi bi-check-circle-fill"></i>`;
      } else cell10.innerHTML = `<i class="bi bi-x-circle-fill"></i>`;
      var cell11 = newRow.insertCell(11);
      // cell11.innerHTML = `${array[i].date.getDate()}/${array[i].date.getMonth() + 1}/${array[i].date.getFullYear()}`;
      // cell11.innerHTML = 'date';
      cell11.innerHTML = array[i].date;
    }
  }
}
