/*
 * This files holds all the code to for your card game
 */


var user;
//Run once broswer has loaded everything
window.onload = function () {
   window.onscroll = function() {myFunction()};
   var navbar = document.getElementById("navbar");
   var sticky = navbar.offsetTop;

   function myFunction() {
      if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky")
      } 
      else {
       navbar.classList.remove("sticky");
      }
   }   
   document.getElementById("Login").addEventListener("click", sign_in);

   //All your Front end code should be here!
   function sign_in(){
        firebase.initializeApp( {
            apiKey: "AIzaSyAJwAw_6KAg7Fciqbn3W3Q2CFbxfM_8hi4",
            authDomain: "capstone-18afe.firebaseapp.com",
            projectId: "capstone-18afe"
        });
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth()
      .signInWithPopup(provider).then(function(result) {
         var token = result.credential.accessToken;
         user = result.user;
         const db = firebase.firestore();
         console.log(token)
         console.log(user)
         // db.collection('accounts').get().then((snapshot) => {
       //     console.log(snapshot.docs)
       //  })
      if(user) {
         localStorage.setItem("email",result.user.email);
         db.collection('users').doc(result.user.email).set({
            userName: result.user.displayName,
         }).then(()=>{
            window.location = 'account.html';
         })   
        // window.location = 'home.html'; //After successful login, user will be redirected to home.html
         }
      }).catch(function(error) {
         var errorCode = error.code;
         var errorMessage = error.message;
            
         console.log(error.code)
         console.log(error.message)
      });
   }

   //All your Front end code should be here!
    
     
        //  function googleSignout() {
        //     firebase.auth().signOut()
            
        //     .then(function() {
        //        console.log('Signout Succesfull')
        //     }, function(error) {
        //        console.log('Signout Failed')  
        //     })
        // }
    };
    //module.exports.user = user;
