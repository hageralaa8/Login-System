// all inputs
var signupName = document.getElementById('signupName')
var signupEmail = document.getElementById('signupEmail')
var signupPassword = document.getElementById('signupPassword')
var signinEmail = document.getElementById('signinEmail')
var signinPassword = document.getElementById('signinPassword')
// var loginButton = document.querySelector("a"); // ana hna anhe a fehom
var loginButton = document.getElementById("Login")
var signUpButton = document.getElementById("signup")

var heading = document.querySelector("h1");

//array (signup) + save in localstorage
var signUpArray = []

if (localStorage.getItem('users') != null) {
    signUpArray = JSON.parse(localStorage.getItem('users'))
}


// ============= for login================
//for check login inputs is empty or not
function isLoginEmpty() {

    if (signinPassword.value == "" || signinEmail.value == "") {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    } else {
        return true
    }
}

//click 3la button yatn2lny ll saf7a
//validate
//if true
//navigate
//dom 
if (loginButton != null) {
    loginButton.addEventListener("click", function () {

        if (isLoginEmpty() == false) {
            return false
        } // call function en lw el input empty

        var email = signinEmail.value;
        var password = signinPassword.value; // ba5od el value el haga eli ana haktnha fe el input

        for (var i = 0; i < signUpArray.length; i++) // hadwor fe array 3la en fe email zy eli ana 3amlah mat5zn fe array abl keda wla la
        {
            // email ,password el awel hwa el email bta3 sinup eli ban5do mn array ,email  tany bta3 el login
            if (signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].password.toLowerCase() == password.toLowerCase()) //chek en email w password fe signin = signup
            {
                localStorage.setItem('sessionUsername', signUpArray[i].name)
                loginButton.href = "./home.html"
            }
            else {
                document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
            }
        }
    })
}
// for check email is exist (ashof fe email mawgod wla la)

function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return true
        }
    }
}
// ============= for signUp================
//for check signUp inputs is empty or not
function isSignUpEmpty() {

    if (signupName.value == "" || signupPassword.value == "" || signupEmail.value == "") {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    } else {
        return true
    }
}
//valdiate
function validate() {
    if (signUpNameRegex.test(signupName.value)==false || signUpEmailRegex.test(signupEmail.value)==false ||signUpPasswordRegex.test(signupPassword.value)==false ) {
        document.getElementById('exist').innerHTML = '<span class="p-2 text-danger">invalid name or email or password</span>'

        return false
    }
}
var signUpNameRegex = /^[a-zA-Z]{2,}$/;
var signUpEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
var signUpPasswordRegex = /^(?=.*\d)[a-zA-Z\d]{7,}$/;
//.test --->true / false
function isValidInputsField(regex, element) {
    {
      if (regex.test(element.value) == true) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSibling.classList.replace("d-block" ,"d-none")
        return true;
      }
       else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        element.nextElementSibling.classList.replace("d-none" , "d-block")
        return false;
      }
    }
  };

// sighnup 
function signUp() {

    // to store (ya5zn) all value as object
    if (isSignUpEmpty() == false) {
        return false
    }
    if ( validate() == false) {
        return false
    }
    var signUp = { // object ba5zn feh data 3ashn lma a3ml signin ashof el email matsgl wla la
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    }
    if (signUpArray.length == 0) {
        signUpArray.push(signUp) // push el object eli ma5zn el data
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.getElementById('exist').innerHTML = '<span class="text-success text-center m-3">Success</span>'
        return true
    }
    if (isEmailExist() == true) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email already exists</span>'

    } else {
        signUpArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'

    }

}
//
if (signUpButton != null)
    signUpButton.addEventListener("click", function () {
        signUp();
    });

    

// to say welcome in home page

var username = localStorage.getItem('sessionUsername') // store el variable in user name
if (username != null) {
    document.getElementById('heading').innerHTML = "Welcome" + username;
}
