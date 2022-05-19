import Chart from "./components/Chart";
import Navbar from "./components/Navbar"
import Home from "./components/Home";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CalculateRatio from "./components/CalculateRatio";

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import {addDoc, collection, getDocs } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD8ZlNaErghnkndW_-safjeiYM2z6nxA7Q",
//   authDomain: "bold-vent-312916.firebaseapp.com",
//   projectId: "bold-vent-312916",
//   storageBucket: "bold-vent-312916.appspot.com",
//   messagingSenderId: "931849978865",
//   appId: "1:931849978865:web:c025021515246086eaba50",
//   measurementId: "G-8FSDQ8LLY6"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// async function main() {  
//   try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Alan",
//     middle: "Mathison",
//     last: "Turing",
//     born: 1912
//   });

//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// } } 
// let data
// async function main(){
//   const querySnapshot = await getDocs(collection(db, "httpDateSize"));
//   querySnapshot.forEach((doc) => {
//   //console.log(doc);
//   data = (doc._document.data.value.mapValue.fields)
//   console.log(data)
// });
// }
// main()



function App() {
  return (<Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/chart" element={<Chart/>} />
      <Route path="/calculateratio" element={<CalculateRatio/>} />
    </Routes>
  </Router>
  );
}

export default App;
