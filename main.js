const firebaseConfig = {
    apiKey: "AIzaSyDn3dbwBckev8sK-GlujD_Dgon2nV9UotM",
    authDomain: "iampavam-427a7.firebaseapp.com",
    projectId: "iampavam-427a7",
    storageBucket: "iampavam-427a7.appspot.com",
    messagingSenderId: "555949833881",
    appId: "1:555949833881:web:4ea6281f4230ef98a6c208",
    measurementId: "G-LT3Y5RL7HP"
  };
  firebase.initializeApp(firebaseConfig);

  var messagesRef = firebase.database().ref("usermessages");

  document.getElementById("contactForm").addEventListener("submit", submitForm);

  function submitForm(e) {
    e.preventDefault();
    var name = getInputVal("name");
    var email = "email@example.com"
    saveMessage(name, email);
    document.getElementById("contactForm").reset();
  }

  function getInputVal(id) {
    return document.getElementById(id).value;
  }

  function saveMessage(name, email) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
      name: name,
      email: email,
    });
  }
  let parentelement = document.getElementById("messages");

function appendPElement(msg){
   
    const newpara =document.createElement('p');
    newpara.innerHTML = msg;
    parentelement.appendChild(newpara);

}
 
// messagesRef.on('value', function(snapshot) {
//     snapshot.forEach(function(childSnapshot) {
//       let childData = childSnapshot.val().name;
//         appendPElement(childData);
        
//     });
    
// });
messagesRef.on('child_added', function(snapshot) {
    let childData = snapshot.val().name;
    appendPElement(childData);
    console.log(childData); 
});