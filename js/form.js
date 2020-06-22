var login = document.querySelector('.login-form');
var signUp = document.querySelector('.signup-form');
var button1 = document.getElementById('btn1');
var button2 = document.getElementById('btn2');
var box2 = document.getElementById('box2');
var box1 = document.getElementById('box1');
var signUpBtn = document.getElementById('inregistrare');


button1.addEventListener('click', function () {
    login.style.display = "none";
    signUp.style.visibility = "visible";
    box2.style.border = "5px solid #9DE0AD";
    box1.style.backgroundColor = "#9DE0AD";
    button1.style.display = "none";
    button2.style.display = "block";

});

button2.addEventListener("click", function () {
    login.style.display = "flex";
    box1.style.backgroundColor = "#ece1b6";
    box2.style.border = "5px solid #ece1b6";
    signUp.style.visibility = "hidden";
    button1.style.display = "block";
    button2.style.display = "none";

});

// signUpBtn.addEventListener('click', function(e){
//     e.preventDefault();
// });



///form validation
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('passwordConfirm');
const inputField = document.getElementsByClassName('input-field');
//form
const form = document.getElementById('myForm');
//aleg culori
const green = '#4CAF50';
const red = '#F44336';

function validateFirstName() {
    //verificam daca este gol
    if (checkEmpty(firstName)) return;
    //verificam daca are doar 
    if (!checkOnlyLetters(firstName)) return;
    return true;
}
function validateLastName() {
    //verificam daca este gol
    if (checkEmpty(lastName)) return;
    //verificam daca are doar 
    if (!checkOnlyLetters(lastName)) return;
    return true;
}
function validatePassword() {
    //pass emply

    if (checkEmpty(password)) return;
    //length
    if (!meetLength(password, 6, 100)) return;



    //vez
    //1-a
    //2- a 1
    //3- A a 1  
    //4 - A a 1 @
    if (!containsCharacters(password, 4)) return;
    return true;
}
function validateConfirmPassword() {
    if (checkEmpty(passwordConfirm)) return;

    if (!password.classList.contains('valid')) {

        setInvalid(passwordConfirm, "Parola nu e valida");

        return;
    }
    //match passwords
    if (password.value !== passwordConfirm.value) {
        setInvalid(passwordConfirm, "parolele nu sunt aceleasi");
        return;

    } else {
        setValid(passwordConfirm);
    }
    return true;
}
function validateEmail() {
    if (checkEmpty(email)) return;
    if (!containsCharacters(email, 5)) return;
    return true;
}
function checkEmpty(field) {
    if (isEmpty(field.value.trim())) {
        setInvalid(field, "nu ati completat");
        //invalid
        return true;
    } else {
        setValid(field)
        return false;
    }

}
function isEmpty(value) {
    if (value === "") return true;
    return false;
}

function setInvalid(field, message) {
    field.classList.add('invalid');

    field.previousElementSibling.innerHTML = message;
    field.previousElementSibling.style.color = red;
    field.setAttribute("style", "border:1px solid red;");


}
function setValid(field) {
    field.classList.add('valid');
    field.previousElementSibling.innerHTML = "";
    // field.nextElementSibling.style.color=green;
    field.setAttribute("style", "border-bottom:5px solid green;");
}
function checkOnlyLetters(field) {
    if (/^[a-zA-Z ]+$/.test(field.value)) {
        setValid(field);
        return true;
    }
    else {
        setInvalid(field, `${field.name} trebuie sa contina numai litere`);
        return false;
    }
}
function meetLength(field, minLength, maxLength) {
    if (field.value.length >= minLength && field.value.length < maxLength) {
        setValid(field);
        return true;
    } else if (field.value.length < minLength) {
        setInvalid(field, `${field.name} trebuie minim ${minLength} caractere`);
        return false;
    } else {
        setInvalid(field, `${field.name} trebuie maxim ${maxLength} caractere`);
        return false;
    }
}
function containsCharacters(field, code) {
    let regEx = /(?=.*[a-zA-Z])/;
    switch (code) {
        case 1:
            //letter
            regEx = /(?=.*[a-zA-Z])/;
            return matchWithRegEx(regex, field, "trebuie sa contina minim o litera");

        case 2:
            //letter and numbers
            regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
            return matchWithRegEx(regEx, field, 'trebuie sa containa o litera si un numar');

        case 3:
            //uppercase, lowecase and number
            regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
            return matchWithRegEx(regEx, field, "trebuie o litara mare, una mica si un numar");
        case 4:
            //uppercase, lowercase, numbers special char

            regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
            return matchWithRegEx(regEx, field, "1 litera mare,1 mica, 1 nr,1 caracter special");

        case 5:
            regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return matchWithRegEx(regEx, field, 'trebuie sa fie un email valid');
        default:
            return false;
    }
}
function matchWithRegEx(regEx, field, message) {
    if (field.value.match(regEx)) {
        setValid(field);
        return true;
    } else {
        setInvalid(field, message);
        return false;
    }
}

firstName.addEventListener('focusout', validateFirstName);
lastName.addEventListener('focusout', validateLastName);
password.addEventListener('focusout', validatePassword);
passwordConfirm.addEventListener('focusout', validateConfirmPassword);
email.addEventListener('focusout', validateEmail);



// autentificare, autorizare

var logEmail = document.getElementById("logEmail");
var logPass = document.getElementById("logPass");
var logBtn = document.getElementById("logBtn");

logBtn.addEventListener("click", logare);
function logare(e) {
    e.preventDefault();
    var body = {
        email: logEmail,
        password: logPass
    };
    JSON.stringify(body);
    fetch("http://localhost:3000/api/auth/login", {
        method: 'POST',
        body

    })
        .then((response) => response.json())
        .then((response) => {
            sessionStorage.setItem("token", response.token);
            window.location.assign('collectionParf.html');

            console.log(response.token);
        })
}