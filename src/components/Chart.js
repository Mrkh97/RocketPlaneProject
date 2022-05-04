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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  let deltaT = 0.2;

  let planeV = 12;
  let XPlane = 0;
  let YPlane = 100;
  let XtPlane = [];
  let YtPlane = [];
  let planeCordinates = {};
  
  let rocketV = 20;
  let XRocket = 0;
  let YRocket = 0;
  let XtRocket = [];
  let YtRocket = [];
  let rocketCordinates = {};
  
  while( XPlane < 100 ){
    XtPlane.push(XPlane);
    YtPlane.push(YPlane);
    XtRocket.push(XRocket);
    YtRocket.push(YRocket);
    XPlane = XPlane + (planeV*deltaT);
    XRocket = XRocket + (rocketV*deltaT*((XPlane-XRocket)/(Math.sqrt(((XPlane-XRocket)**2)+((YPlane-YRocket)**2)))));
    YRocket = YRocket + (rocketV*deltaT*((YPlane-YRocket)/(Math.sqrt(((XPlane-XRocket)**2)+((YPlane-YRocket)**2)))));
    console.log((Math.sqrt(((XPlane-XRocket)**2)+((YPlane-YRocket)**2))));
    if((Math.sqrt(((XPlane-XRocket)**2)+((YPlane-YRocket)**2)))<deltaT){
      //having problem with this at last have to use deltaT value fro breaking
      break;
    }
  
  }
  
  XtPlane.forEach((item,i)=>planeCordinates[item.toFixed(10)]=YtPlane[i]);
  XtRocket.forEach((item,i)=>rocketCordinates[item]=YtRocket[i]);
  

const totalDuration = 10000;
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

export const options = {
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





export const data = {
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

export default function Chart(){
  return <div className=" p-10 bg-slate-300 m-2 rounded-lg">
    <Line options={options} data={data} />
  </div>
}