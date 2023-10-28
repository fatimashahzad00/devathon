// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const auth = getAuth();
// function signUp() {
//    const email = document.getElementById('email').value;
//    const password = document.getElementById('password').value;

//    // Create user with email and password
//    createUserWithEmailAndPassword(auth, email, password)
//      .then((userCredential) => {
//        // User signed up successfully
//        const user = userCredential.user;
//        console.log('User signed up:', user);
//      })
//      .catch((error) => {
//        // Handle errors here
//        const errorCode = error.code;
//        const errorMessage = error.message;
//        console.error('Error:', errorCode, errorMessage);
//      });
//  }

 // Firebase initialization
const app = firebase.initializeApp(firebaseConfig);

// Signup function
const signup = () => {
    let username = document.getElementById('userName').value;
    // let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let repeatPassword = document.getElementById('repeatPassword').value;

    // Password validation
    if (password !== repeatPassword) {
        console.log("Passwords do not match.");
        return;
    }

    // Create user with email and password
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            // Store user data in Firebase Database
            firebase.database().ref('users/' + user.uid).set({
                uid: user.uid,
                username: username,
                email: email,
                password: password,
            })
            .then(() => {
                const user = { email: email, username: username };
                sessionStorage.setItem('user', JSON.stringify(user));
                console.log('User created successfully.');
                const data = sessionStorage.getItem('user')
                console.log(data);
                window.location.href = './Login.html';
                // sessionStorage.getItem('user', JSON)
            })
            .catch((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode + ': ' + errorMessage);
        });
        
}