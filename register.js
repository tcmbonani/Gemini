import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js'
import { getDatabase,set,ref,update} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";


// TODO: Replace the following with your app's Firebase project configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCm0THFaR9OBSAJjz35ImhwD6wk7p8AjEk",
    authDomain: "gemini-724be.firebaseapp.com",
    projectId: "gemini-724be",
    storageBucket: "gemini-724be.appspot.com",
    messagingSenderId: "207457504076",
    appId: "1:207457504076:web:23d2c33c57b587c3b3dde9",
    databaseURL: 'https://gemini-724be-default-rtdb.firebaseio.com/'
  };


const app = new initializeApp(firebaseConfig);
const auth = new getAuth();
const database = getDatabase(app);

submitData.addEventListener('click', (e) => {

  
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;


createUserWithEmailAndPassword(auth,email,password)
.then((userCredential) => {

  // Signed up 
  const user = userCredential.user;
  // ...user.uid
  set(ref(database, 'users/' + user.uid), {
    email: email,
    password: password
  })
.then(() => {
  // Data saved successfully!
  alert('user created');
  window.location.href = "/signin.html";
})
.catch((error) => {
  // The write failed...
  alert('user error');
});

})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  // ..
  alert('error signing up');
});

});