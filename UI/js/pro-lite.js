const hamburgerIcon=document.querySelector('#hamburger input');
const navbar=document.querySelector('.navbar');
const loginLink=document.querySelector('.login-redirect');
const listPropertyLink=document.querySelector('.list-property');
const myPropertyList=document.querySelector('.my-property-list');
const dashboardMyPropertyList=document.querySelector('.dashboard-my-list');
const ulDashboard=document.querySelector('.ul-dashboard');
const signupLink=document.querySelector('.signup-redirect');
const previousButton=document.querySelector('.buttons-div>span:first-child');
const nextButton=document.querySelector('.buttons-div>span:nth-child(2)');
const myProfile=document.querySelector('.my-profile');
const dashboardProfile = document.querySelector('.dashboard-my-profile');
const firstDivForm=document.querySelector('.first-div');
const secondDivForm=document.querySelector('.second-div');
const thirdDivForm=document.querySelector('.third-div');
const mainFormPage=document.querySelector('.main-form');
const signUpButton = document.querySelector('#signup-button');
const loginButton = document.querySelector('.login-submit-button');
const propertyListContainer = document.querySelector('.property-display-container')
const mainFormSubmitButton=document.querySelector('.main-form-submit-button');



 if (hamburgerIcon)hamburgerIcon.addEventListener('change', (event)=> {
  event.preventDefault();
  if(hamburgerIcon.checked===true) {
    navbar.style.display='flex';
  }
  else {
    navbar.style.display='none';
  }
});
window.addEventListener('mouseup', (event)=> {
  event.preventDefault();
  if (event.target !== hamburgerIcon && event.target.parentNode !== hamburgerIcon){
      hamburgerIcon.checked = false;
    navbar.style.display = 'none';
  }

});
 let nextScore=0;
if (previousButton) previousButton.addEventListener('click', (event)=> {
  if (nextScore===2) {
    thirdDivForm.style.left='100%';
    secondDivForm.style.left='0';
    firstDivForm.style.left='-100%';
    nextButton.style.display='inline';
    mainFormSubmitButton.style.display='none';
    thirdDivForm.style.opacity='0';
    secondDivForm.style.opacity='1';
    nextScore -=1;
  }
  else if (nextScore===1) {
    thirdDivForm.style.left='200%';
    secondDivForm.style.left='100%';
    firstDivForm.style.left='0';
    nextScore -=1;
    previousButton.style.display='none';
    secondDivForm.style.opacity='0';
    firstDivForm.style.opacity='1';
  }
});
 if (nextButton) nextButton.addEventListener('click', (event)=> {
  if(nextScore===0) {
    firstDivForm.style.left='-100%';
    secondDivForm.style.left='0';
    secondDivForm.style.opacity='1';
    thirdDivForm.style.left='100%';
    nextScore +=1;
    previousButton.style.display='inline';
    firstDivForm.style.opacity='0';
  }
  else if (nextScore===1) {
    firstDivForm.style.left='-200%';
    secondDivForm.style.left='-100%';
    thirdDivForm.style.left='0';
    mainFormSubmitButton.style.display='inline';
    nextButton.style.display='none';
    nextScore +=1;
    secondDivForm.style.opacity='0';
    thirdDivForm.style.opacity='1';
  }
});
 if (loginLink)loginLink.addEventListener('click', ()=> {
  location.href='login.html';
});
 if (myPropertyList) myPropertyList.addEventListener('click', ()=> {
  location.href='my-list.html';
});
 if (ulDashboard) ulDashboard.addEventListener('click', ()=> {
  location.href='dashboard.html';
});
 if (myProfile) myProfile.addEventListener('click', ()=> {
  location.href='profile.html';
});
if (dashboardProfile) dashboardProfile.addEventListener('click', (event)=> {
  event.stopPropagation();
  location.href='profile.html';
});
 if (dashboardMyPropertyList) dashboardMyPropertyList.addEventListener('click', ()=> {
  location.href='my-list.html';
});
 if (signupLink) signupLink.addEventListener('click', ()=> {
  location.href='signup.html';
});
 if (listPropertyLink) listPropertyLink.addEventListener('click', ()=> {
  location.href='listproperty.html';
});
if (signUpButton) signUpButton.addEventListener('click', ()=> {
  localStorage.setItem('signup', 'Hello');
  location.href='index.html';
});
if (loginButton) loginButton.addEventListener('click', ()=> {
  localStorage.setItem('login','Heyyo');
  location.href='index.html';
});
if (propertyListContainer) propertyListContainer.addEventListener('click', (event)=> {
  if (event.target.matches('.view-property')){
      const advert = Array.from(document.getElementsByClassName('display-rent'));
      let targetElement= null;
      for (let i = 0; i<advert.length; i++){
        if (event.target === advert[i] || event.target.parentElement === advert[i] || event.target.parentElement.parentElement ===advert[i]){
          targetElement = advert[i];
        }
      }
      const values = [];
    const imgSrc = targetElement.firstElementChild.firstElementChild.src;
    const title = targetElement.firstElementChild.nextElementSibling.firstElementChild.textContent;
      const propLocation = targetElement.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.textContent;
      const price = targetElement.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.textContent;
      values.push(imgSrc, title, propLocation, price);
      const localString = values.join('  ')
      localStorage.setItem('propInfo',localString);
      location.href = 'property-detail.html';
  }
});
if (document.querySelector('.property-information .image')){
  const retrievedValues = localStorage.getItem('propInfo');
  const splitValues = retrievedValues.split('  ');
  document.querySelector('.image>img').src = splitValues[0];
  document.querySelector('.price').textContent = splitValues[splitValues.length-1];
  document.querySelector('.property-title').textContent = splitValues[1];
}

const signupOne = document.querySelector('.signup-navbar-one');
const dashboardOne = document.querySelector('.dashboard-one');
const dashboardTwo = document.querySelector('.dashboard-two');
const signoutOne = document.querySelector('.signout-navbar-one');
const signupTwo = document.querySelector('.signup-navbar-two');
const signoutTwo = document.querySelector('.signout-navbar-two');
const loginOne = document.querySelector('.login-navbar-one');
const loginTwo = document.querySelector('.login-navbar-two');
const ulParent = document.querySelector('ul');
if (localStorage.getItem('signup') || localStorage.getItem('login')){
  signupOne.style.display = 'none';
  signupTwo.style.display = 'none';
  loginOne.style.display = 'none';
  loginTwo.style.display = 'none';
  signoutOne.style.display = 'flex';
  signoutTwo.style.display = 'flex';
  dashboardOne.style.display = 'flex';
  dashboardTwo.style.display = 'flex';
} else if (!localStorage.getItem('signup') && !localStorage.getItem('login')){
  signupOne.style.display = 'flex';
  signupTwo.style.display = 'flex';
  loginOne.style.display = 'flex';
  loginTwo.style.display = 'flex';
  signoutOne.style.display = 'none';
  signoutTwo.style.display = 'none';
  dashboardOne.style.display = 'none';
  dashboardTwo.style.display = 'none';
}

signoutOne.addEventListener('click',(event)=>{
  localStorage.removeItem('signup');
  localStorage.removeItem('login');
  location.href = 'index.html';
})