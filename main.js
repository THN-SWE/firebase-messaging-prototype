window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  e.returnValue = "";
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

let messagesRef = firebase.database().ref("usermessages");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  let name = getInputVal("name");
  let email = "email@example.com";
  saveMessage(name);
  document.getElementById("contactForm").reset();
}

function getInputVal(id) {
  return document.getElementById(id).value;
}

function saveMessage(name) {
  let newMessageRef = messagesRef.push();
  let date = new Date();
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

function dateSession() {
  let today = new Date();
  let dd = String(today.getDate().toString().padStart(2, "0"));
  let mm = (today.getMonth() + 1).toString().padStart(2, "0");
  let yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  const newpara = document.createElement("p");
  newpara.style.textAlign = "center";
  newpara.style.color = `rgba(240, 255, 255, 0.372)`;
  newpara.style.fontSize = `17px`;
  newpara.innerHTML = `
            <hr>
             <span >${today}</span>`;
  parentelement.appendChild(newpara);
}

function dateBreakEveryDay() {
  var desiredTime = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    0,
    0,
    0,
    0
  ); // 10:00 AM

  var timeDifference = desiredTime - new Date();
  if (timeDifference < 0) {
    timeDifference += 86400000; // add 24 hours
  }

  setTimeout(function () {
    // Call your function here
    console.log("another awesome day");
    dateSession()
  }, timeDifference);
  
  
}

dateBreakEveryDay();
