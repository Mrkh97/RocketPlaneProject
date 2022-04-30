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
for (let i = 1; i <= 100; i++) {
  labels.push(i);
}

export const taziTavsan = {
  labels,
  datasets: [
    {
      label: 'Plane',
      data: labels.map(() => 300),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Rocket',
      data: labels.map((item) => item * 3),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export const taziHizZaman = {
  labels,
  datasets: [
    {
      label: 'Plane',
      data: labels.map(() => 300),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    
  ],
};

export const tavsanHizZaman = {
  labels,
  datasets: [
    
    {
      label: 'Rocket',
      data: labels.map((item) => item * 3),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export default function Chart() {
  return <div className=" p-10 bg-slate-300 m-2 rounded-lg">
    <Line options={options} data={taziTavsan} />
    <div className=''>
      <Line className=' ' options={options} data={taziHizZaman} />
      <Line className='' options={options} data={tavsanHizZaman} />
    </div>

  </div>
}