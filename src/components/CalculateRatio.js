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
//   import { useState } from 'react';
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

  

export default function CalculateRatio() {



    let deltaT = 0.01;
    let planeSpeed;
    let rocketSpeed;

    let XPlane = 0;
    let YPlane = 100;


    let XRocket = 0;
    let YRocket = 0;

    let planeSpeedRatio = [];
    let rocketSpeedRatio = [];

    let ratio = [];

    function CalculateDistance(planeV, rocketV) {
        XPlane = 0;
        YPlane = 100;
        XRocket = 0;
        YRocket = 0;
        while (XPlane < 100) {

            XPlane = XPlane + (planeV * deltaT);
            XRocket = XRocket + (rocketV * deltaT * ((XPlane - XRocket) / (Math.sqrt(((XPlane - XRocket) ** 2) + ((YPlane - YRocket) ** 2)))));
            YRocket = YRocket + (rocketV * deltaT * ((YPlane - YRocket) / (Math.sqrt(((XPlane - XRocket) ** 2) + ((YPlane - YRocket) ** 2)))));
            // console.log((Math.sqrt(((XPlane - XRocket) ** 2) + ((YPlane - YRocket) ** 2))));
            if ((Math.sqrt(((XPlane - XRocket) ** 2) + ((YPlane - YRocket) ** 2))) < deltaT) {

                return true;
            }

        }
        return false;
    }




    for (rocketSpeed = 1; rocketSpeed <= 100; rocketSpeed++) {
        for (planeSpeed = 1; planeSpeed <= rocketSpeed; planeSpeed++) {
            if (CalculateDistance(planeSpeed, rocketSpeed)) {
                planeSpeedRatio.push(planeSpeed);
                rocketSpeedRatio.push(rocketSpeed);
                ratio.push(rocketSpeed/planeSpeed);
            }
            

        }

    }
    // planeSpeedRatio.forEach((item,i)=>ratio[item]=rocketSpeedRatio[i]);
    console.log(ratio);

    

  const options = {
    
    // scales: {
    //   x: {
    //     max: 100,
    //     min: 0,
    //     type: 'linear',
    //     ticks: {
    //       stepSize: 0.5
    //     }
    //   }
    // },
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
  for (let i = 0; i <= ratio.length; i++) {
    labels.push(i);
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'ratio',
        data: ratio,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      
    ],
  };

    return <div className=" p-10 bg-slate-300 m-2 rounded-lg">
      <Line options={options} data={data} />
    </div>
    
}