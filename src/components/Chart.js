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
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart() {
  const [deltaValue,setDeltaValue] =useState(0.02)
  const [deltaT, setDeltaT] = useState(0.02);

  const [planeSpeedValue,setPlaneSpeedValue] = useState(12);
  const [planeV,setPlaneV] = useState(12);

  const [rocketSpeedValue,setRocektSpeedValue] = useState(20);
  const [rocketV,setRocketV] = useState(20);

  // const [isCaught,setIsCought] = useState(false);
  
  let XPlane = 0;
  let YPlane = 100;
  let XtPlane = [];
  let YtPlane = [];
  let planeCordinates = {};

  let XRocket = 0;
  let YRocket = 0;
  let XtRocket = [];
  let YtRocket = [];
  let rocketCordinates = {};

  let isIt = false;

  while (XPlane < 100) {
    XtPlane.push(XPlane);
    YtPlane.push(YPlane);
    XtRocket.push(XRocket);
    YtRocket.push(YRocket);
    XPlane = XPlane + (planeV * deltaT);
    XRocket = XRocket + (rocketV * deltaT * ((XPlane - XRocket) / (Math.sqrt(((XPlane - XRocket) ** 2) + ((YPlane - YRocket) ** 2)))));
    YRocket = YRocket + (rocketV * deltaT * ((YPlane - YRocket) / (Math.sqrt(((XPlane - XRocket) ** 2) + ((YPlane - YRocket) ** 2)))));
    console.log((Math.sqrt(((XPlane - XRocket) ** 2) + ((YPlane - YRocket) ** 2))));
    if ((Math.sqrt(((XPlane - XRocket) ** 2) + ((YPlane - YRocket) ** 2))) < 0.1) {
      //having problem with this at last have to use deltaT value fro breaking
      // setIsCought(true);
      // isIt=true;
      break;
    }
    // console.log(isCaught);
  }

  

  XtPlane.forEach((item, i) => planeCordinates[item.toFixed(10)] = YtPlane[i]);
  XtRocket.forEach((item, i) => rocketCordinates[item] = YtRocket[i]);

  const totalDuration = 4000;
  const delayBetweenPoints = totalDuration / XtPlane.length;
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

  const options = {
    animation,
    scales: {
      x: {
        max: 100,
        min: 0,
        type: 'linear',
        ticks: {
          stepSize: 0.5
        }
      }
    },
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

  //commit on test branch

  let labels = [];
  // for (let i = 0; i <= 100; i++) {
  //   labels.push(i);
  // }

  const data = {
    labels,
    datasets: [
      {
        label: 'Plane',
        data: planeCordinates,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Rocket',
        data: rocketCordinates,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  // if ((Math.sqrt(((XPlane - XRocket) ** 2) + ((YPlane - YRocket) ** 2))) < 0.1){
  //   setIsCought(true);
  // }

  return <div>
    <div className=" p-10 bg-slate-300 m-2 rounded-lg">
      <Line options={options} data={data} />
    </div>
    <div className=" m-2 bg-slate-300 rounded-lg text-center">
      <div className=' inline-block mx-2'>
      <input className=' bg-slate-100 m-2 rounded-lg h-8' type="number" value={deltaValue} onChange={(event)=>setDeltaValue(event.target.value)}/>
      <button className='bg-slate-700 text-slate-200 p-1 rounded-lg hover:shadow-lg hover:scale-105 ' onClick={()=>setDeltaT(deltaValue)}>Set Delta T</button>
      </div>
      <div className=' inline-block mx-2'>
      <input className=' bg-slate-100 m-2 rounded-lg h-8' type="number" value={planeSpeedValue} onChange={(event)=>setPlaneSpeedValue(event.target.value)}/>
      <button className='bg-slate-700 text-slate-200 p-1 rounded-lg hover:shadow-lg hover:scale-105' onClick={()=>setPlaneV(planeSpeedValue)}>Set Plane Speed</button>
      </div>
      <div className=' inline-block mx-2'>
      <input className=' bg-slate-100 m-2 rounded-lg h-8' type="number" value={rocketSpeedValue} onChange={(event)=>setRocektSpeedValue(event.target.value)}/>
      <button className=' bg-slate-700 text-slate-200 p-1 rounded-lg hover:shadow-lg hover:scale-105  ' onClick={()=>setRocketV(rocketSpeedValue)}>Set Rocket Speed</button>
      </div>
    </div>
    <div className={XPlane<99?' h-10 m-2 rounded-lg flex justify-center items-center bg-red-500':'h-10 m-2 rounded-lg flex justify-center items-center bg-green-500'}>
      <p className=' text-slate-200 text-xl'>{XPlane<99?"rocket hits the plane D;":"plane ran away :D"}</p>
    </div>
  </div>

}

