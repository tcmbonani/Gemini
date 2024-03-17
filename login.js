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

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    var lgDate = new Date(); 
    update(ref(database, 'users/' + user.uid), {
      last_login: lgDate,
    })

  .then(() => {
    // Data saved successfully!
    alert('user logged in successfully');
    window.location.href = "/index.html";
  })
  .catch((error) => {
    // The write failed...
    alert('user error');
  });

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });

});