var firebaseConfig =_{}
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


document.getElementById("loader").style.display="none";
let isSignIn=true;
document.getElementById("switch").addEventListener("click",function(){
  isSignIn=!isSignIn;
  if(isSignIn){ 
    document.getElementById("submit").innerText="Sign In";
    document.getElementById("switch").innerText="Switch to sign up"
  }else{
    document.getElementById("submit").innerText="Sign Up";
    document.getElementById("switch").innerText="Switch to sign in"
  }
});


document.getElementById("submit").addEventListener("click",function(){
  let email=document.getElementById("email-field").value;
  let password=document.getElementById("password-field").value;
  if(email!==""&&password!==""){
    if(isSignIn){
    
      signUserIn(email,password);
    }else{
      signUserUp(email,password);
    }

  }
});


function signUserIn(email,password){
    document.getElementById("loader").style.display="block";
  console.log(email +" " + password,"sign in")
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
document.getElementById("loader").style.display="none";
    console.log("no error");
        window.location.href="./library.html";

  }).catch(function(error) {
    // Handle Errors here.
    document.getElementById("loader").style.display="none";
   var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode,errorMessage);

  });

}
function signUserUp(email,password){
    document.getElementById("loader").style.display="block";
  console.log(email +" " + password,"sign up")
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(error) {
    // Handle Errors here.
   document.getElementById("loader").style.display="none";
        console.log("no error");
        window.location.href="./library.html";


    // ...
  }).catch(function(error) {
    // Handle Errors here.
  document.getElementById("loader").style.display="none";
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode,errorMessage);

    // ...
  });
}
