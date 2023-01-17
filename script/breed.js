'use strict';
// Import Functions
import { saveToStorage, getFromStorage } from './storage.js';
// Variables Declaration
const inputBreed = document.querySelector('#input-breed');
const inputType = document.querySelector('#input-type');
const submitBtn = document.querySelector('#submit-btn');
const breedTable = document.querySelector('#breedTable');
const breedTableBody = document.querySelector('#breedTableBody');
const deleteBtn = document.querySelector('#delete-btn');
const loadBtn = document.getElementById('load-btn');
let breedArr;

// Delete Current Breed on Local Storage Function
deleteBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let userAnswer = confirm(
    'Are you sure you want to delete Current Breed Data on your Local Storage'
  );
  if (userAnswer) {
    localStorage.removeItem('myBreedList');
    alert('Breed Data DELETED');
    window.location.reload();
  } else return;
});

// Load Breed Template Function
const breedTemplate = [
  { breed: 'Tabby', type: 'Cat' },
  { breed: 'Mixed Breed', type: 'Cat' },
  { breed: 'Mixed Breed', type: 'Dog' },
  { breed: 'Husky', type: 'Dog' },
  { breed: 'Domestic Short Hair', type: 'Cat' },
  { breed: 'Dobeman Pinscher', type: 'Dog' },
];
loadBtn.addEventListener('click', (e) => {
  e.preventDefault;
  let userAnswer = confirm('Do you want to LOAD a Breed Template?');
  if (userAnswer) {
    if (localStorage.getItem('myBreedList') === null) {
      localStorage.setItem('myBreedList', JSON.stringify(breedTemplate));
      breedArr = JSON.parse(getFromStorage('myBreedList'));
      renderBreedTable(breedArr);
    } else {
      breedArr = JSON.parse(getFromStorage('myBreedList'));
      renderBreedTable(breedArr);
    }
  } else return;
  console.table(breedArr);
  return breedArr;
});
// ===
// Check Null Breed on LocalStorage Function
function checkNullBreedLocalStorage() {
  if (localStorage.getItem('myBreedList') === null) {
    breedArr = [];
  } else {
    breedArr = JSON.parse(localStorage.getItem('myBreedList'));
  }
  return breedArr;
}
// Add New Breed Function
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  checkNullBreedLocalStorage();
  renderBreedTable(breedArr);
  const breedData = {
    breed: inputBreed.value,
    type: inputType.value,
  };
  if (validateBreed()) {
    breedArr.push(breedData);
    clearInput();
    saveToStorage('myBreedList', JSON.stringify(breedArr));
    renderBreedTable(breedArr);
  }
  console.table(breedArr);
  return breedArr;
});

// Clear Input Function
function clearInput() {
  inputBreed.value = '';
  inputType.value = 'Select Type';
}

// Validate Input Breed Field
function validateInput() {
  if (inputBreed.value === '') {
    alert('Please fill Input Breed Field');
    return false;
  } else return true;
}
// Validate Intput Type Field
function validateType() {
  if (inputType.value === 'Select Type') {
    alert('Please select a breed Type');
    return false;
  } else return true;
}
// Validate Breed Function
function validateBreed() {
  if (validateInput() && validateType()) {
    alert('Validate breed successfully');
    return true;
  } else {
    alert('Validate breed failed');
    return false;
  }
}
// Render Table Data Function
function renderBreedTable(array) {
  breedTableBody.innerHTML = '';
  if (Array.isArray(array) && array.length != 0) {
    for (let i = 0; i < array.length; i++) {
      var newRow = breedTableBody.insertRow();
      var cell1 = newRow.insertCell(0);
      cell1.innerHTML = i + 1;
      var cell2 = newRow.insertCell(1);
      cell2.innerHTML = array[i].breed;
      var cell3 = newRow.insertCell(2);
      cell3.innerHTML = array[i].type;
      var cell4 = newRow.insertCell(3);
      cell4.innerHTML = `<button
      type="button"
      class="btn btn-danger delete"
      >Delete</button>`;
    }
  }
}

// Delete Button Function
document.querySelector('#breedTableBody').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    let userAnswer = confirm('Are you sure you want to delete this breed?');
    if (userAnswer) {
      let deletedRow = e.target.parentElement.parentElement;
      let deleteIndex = deletedRow.rowIndex - 1;
      breedArr.splice(deleteIndex, 1);
      localStorage.removeItem('myBreedList');
      localStorage.setItem('myBreedList', JSON.stringify(breedArr));
      renderBreedTable(breedArr);
      console.table(breedArr);
      return breedArr;
    }
  }
  console.table(breedArr);
  return breedArr;
});
