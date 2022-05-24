import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// firebaseApps previously initialized using initializeApp()
const app = initializeApp(firebaseConfig)
const db = getFirestore(app);
connectFirestoreEmulator(db, 'localhost', 8080);


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// let data = 


// let testing = [{'name':"ali"},{'name':'mohammad'},{'name':123}]

// testing.forEach((item)=>console.log(item['name']))


const options = {
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  
  const labels = []

//   const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
  

export default function HttpChart(){
    const [isRenderd,setIsRenderd] = useState(false)
    const [getRequestData,setGetRequestData]=useState([{'size':10,'timeStamp':1652075157}])
    const [dataByMonth,setDataByMonth]=useState({'January':0, 'February':0, 'March':0, 'April':0, 'May':0, 'June':0, 'July':0,'August':0,'September':0,'October':0,'November':0,'December':0})
    

    function getMonthName(ts){
        const names=['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December']
        var date = new Date(ts*1000);
        var month = date.getMonth();
        return names[month];

    }

    function handleClick(){
        getRequestData.map((item)=> {
            let movagat = dataByMonth
            movagat[getMonthName(item['timeStamp'])] = movagat[getMonthName(item['timeStamp'])]+item['size']
            console.log(dataByMonth)

            setDataByMonth(movagat)
        })
        isRenderd?setIsRenderd(false):setIsRenderd(true)
    }

    console.log(getMonthName(1652254259))
    useEffect(()=>{
        const UserCollectionRef = collection(db,"GetRequests")
        const getData = async () => {
            const data = await getDocs(UserCollectionRef);
            setGetRequestData(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
        }
        getData();
    },[])
      console.log(getRequestData)

      const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: dataByMonth,
            backgroundColor: 'rgb(255, 99, 132)',
          },
          {
            label: 'Dataset 2',
            data: labels.map((item,index) => dataByMonth[index]),
            backgroundColor: 'rgb(75, 192, 192)',
          },
        ],
      };
    return <div className="p-10 bg-slate-300 m-2 rounded-lg  col-span-3">
        <button className='bg-slate-700 m-2 text-slate-200 p-1 rounded-lg hover:shadow-lg hover:scale-105 ' onClick={handleClick}>Render Chart</button>
        {isRenderd?<Bar options={options} data={data} />:""}
    </div>
}
