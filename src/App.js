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

const totalDuration = 5000;
const delayBetweenPoints = totalDuration / 100;
const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
const animation = {
  x: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: NaN, // the point is initially skipped
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.xStarted) {
        return 0;
      }
      ctx.xStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  },
  y: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: previousY,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.yStarted) {
        return 0;
      }
      ctx.yStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  }
};

export const options = {
  animation,
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

let labels = [];
for (let i=1;i<=100;i++){
  labels.push(i);
}

export const data = {
  labels,
  datasets: [
    {
      label: 'Plane',
      data: labels.map(() => 300),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map((item) => item*3),
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
