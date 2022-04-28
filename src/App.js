import { useState } from "react";
import Card from "./components/Card";
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function App() {
  const [list,setList]=useState(['empty','is it!?'])
  const [content,setContent]=useState('');
  return (
    <div className=" ">
      <div className=" bg-slate-300 m-2  h-16">
        <p className=" text-center items-center">hi</p>
      </div>
      <div className=" bg-slate-300 m-2  h-16">
        <p className=" text-center">
          my name is mohammadreza
        </p>
      </div>
      <div className=" bg-slate-300 m-2 h-16 ">
        <p className=" text-center">
          im trying to learn react and this is my website im gonna try to make it better over time.
        </p>
      </div>
      <Card text='lets see if this works' />
      <Card text='yeah it does ok lets try and make a list' />
      <div className=" w-full p-2 text-center">
        <input onChange={(event)=>{setContent(event.target.value)}} value={content} className="inpot bg-slate-200 text-xl w-11/12 p-2 rounded-lg" />
        <button onClick={()=>{setList([...list,content])}} className=" ml-2 bg-gray-300 p-2 rounded-lg drop-shadow-lg hover:drop-shadow-2xl hover:bg-white">ADD</button>
      </div>
      {list.map((item)=>{return <Card text={item}/>})}
      <div className=" p-10 bg-slate-300 m-2 rounded-lg">
        <Line options={options} data={data} />
      </div>
      
    </div>
  );
}

export default App;
