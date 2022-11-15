document.querySelector('.name').addEventListener('focus', deleteNameValue);

function deleteNameValue() {
  document.querySelector('.name').value = '';
}

function getUserName() {
  let userName = document.querySelector('.name').value;
  return userName;
}

function setMaxDate() {
  let datePickerId = document.getElementById('datePickerId');
  datePickerId.max = new Date().toISOString().split('T')[0];
}

document.addEventListener('DOMContentLoaded', setMaxDate);

document.querySelector('.input-group').addEventListener('submit', submitForm);

function submitForm(event) {
  event.preventDefault();
  deleteInput();
  if (!checkName()) {
    showError('Please enter valid name');
    console.log('ggg');
    return;
  }
  if (!checkAge()) {
    showError('Please enter valid date of birth');
    return;
  }

  let userAge = calculateAge();
  showAge(userAge);
  let daysTillBirthday = calculateDaysToBirthday();
  showDaysToBirthday(daysTillBirthday);
}

function calculateAge() {
  let enteredDate = document.querySelector('.dateofbirth').value;
  let userBirthDate = new Date(enteredDate).getTime();
  let today = new Date().getTime();

  let userFullYears = String(Math.floor((today - userBirthDate) / 31557600000));
  return userFullYears;
}

function showAge(userAge) {
  let userName = getUserName();
  let yearAlert = document.querySelector('.yearsAlert');
  let spanYearsAlert = document.createElement('span');
  spanYearsAlert.innerHTML = `${userName}, your age is ${userAge} years!`;
  yearAlert.prepend(spanYearsAlert);
  spanYearsAlert.classList.add('spanYearsAlert');
}

function deleteInput() {
  document.querySelector('.yearsAlert').innerHTML = '';
  document.querySelector('.daysToBirthdayAlert').innerHTML = '';
}

function calculateDaysToBirthday() {
  let today = new Date();
  let enteredDate = document.querySelector('.dateofbirth').value;
  let enteredMonth = new Date(enteredDate).getMonth();
  let enteredDay = new Date(enteredDate).getDate();

  let userNextBirthdayThisYear = new Date(
    today.getFullYear(),
    enteredMonth,
    enteredDay
  );
  let userNextBirthdayNextYear = new Date(
    today.getFullYear() + 1,
    enteredMonth,
    enteredDay
  );

  let diffDays = 0;

  if (enteredMonth > today.getMonth()) {
    diffDays = Math.floor(
      (userNextBirthdayThisYear.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24) +
        1
    );
  } else if (
    enteredMonth < today.getMonth() ||
    (enteredMonth == today.getMonth() && enteredDay <= today.getDate())
  ) {
    diffDays = Math.floor(
      (userNextBirthdayNextYear.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24) +
        1
    );
  }

  return diffDays;
}

function showDaysToBirthday(daysTillBirthday) {
  let daysToBirthdayAlert = document.querySelector('.daysToBirthdayAlert');
  let spanDaysToBirthdayAlert = document.createElement('span');

  spanDaysToBirthdayAlert.innerHTML = `Your next Birthday is in ${daysTillBirthday} days.`;
  daysToBirthdayAlert.prepend(spanDaysToBirthdayAlert);
  spanDaysToBirthdayAlert.classList.add('spanDaysToBirthdayAlert');
}

function checkName() {
  let userName = getUserName();
  if (!userName) {
    return false;
  } else return true;
}

function checkAge() {
  let userAge = calculateAge();
  if (userAge == 'NaN') {
    return false;
  } else return true;
}

function showError(errorStr) {
  clearErrorBox();
  let errorMessage = document.querySelector('.error');
  let spanErrorMessage = document.createElement('span');

  spanErrorMessage.innerHTML = errorStr;
  errorMessage.prepend(spanErrorMessage);
}

function clearErrorBox() {
  document.querySelector('.error').innerHTML = '';
}
