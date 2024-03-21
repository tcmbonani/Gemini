import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, 
    createUserWithEmailAndPassword, 
    signOut, 
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"

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
const auth = new getAuth(app);
auth.languageCode = 'en'

// Initialize Firebase Authentication and get a reference to the service
const provider = new GoogleAuthProvider();
// Get the logout button element
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", () => {
    // Clear session storage
    sessionStorage.clear();

    // Perform logout functionality
    console.log("User signed out");

    // Redirect to the login page
    window.location.href = "/signin.html";

    // Prevent going back to the index page by replacing the current history entry
    history.replaceState(null, "", "/signin.html");
});


