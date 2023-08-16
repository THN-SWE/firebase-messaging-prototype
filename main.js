 
window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    e.returnValue = ''
  });


const firebaseConfig = {
  apiKey: "AIzaSyDn3dbwBckev8sK-GlujD_Dgon2nV9UotM",
  authDomain: "iampavam-427a7.firebaseapp.com",
  projectId: "iampavam-427a7",
  storageBucket: "iampavam-427a7.appspot.com",
  messagingSenderId: "555949833881",
  appId: "1:555949833881:web:4ea6281f4230ef98a6c208",
  measurementId: "G-LT3Y5RL7HP",
};
firebase.initializeApp(firebaseConfig);

var messagesRef = firebase.database().ref("usermessages");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  var name = getInputVal("name");
  var email = "email@example.com";
  saveMessage(name);
  document.getElementById("contactForm").reset();
}

function getInputVal(id) {
  return document.getElementById(id).value;
}

function saveMessage(name) {
  var newMessageRef = messagesRef.push();
  var date = new Date();
  let newtime = String(date.getHours()) + " : " + String(date.getMinutes());
  newMessageRef.set({
    name: name,

    time: newtime, //add a zero to the end of the date so it sorts correctly in Firebase
  });
}
let parentelement = document.getElementById("messages");

function appendPElement(msg, time) {
  const newpara = document.createElement("p");
  newpara.innerHTML = msg + " ... " + ":" + "[" + time + "]";

  parentelement.appendChild(newpara);
}

// messagesRef.on('value', function(snapshot) {
//     snapshot.forEach(function(childSnapshot) {
//       let childData = childSnapshot.val().name;
//         appendPElement(childData);

//     });

// });
messagesRef.on("child_added", function (snapshot) {
  let childData = snapshot.val().name;
  let childDatatime = snapshot.val().time;
  appendPElement(childData, childDatatime);

  console.log(childData);
});
