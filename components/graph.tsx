"use client";
import { signOut } from "next-auth/react";

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
  import { faker } from "@faker-js/faker/locale/en";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart, args, options) => {
      const {ctx} = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = options.color || '#99ffff';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  };
  
  export const options = {
    responsive: true,
    plugins: {
        customCanvasBackgroundColor: {
            color: 'black',
          },
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Weight Graph',
      },
    },

  };
  

  
 
export default function Graph({ weightdata, wdate }) {
    const array1 = weightdata.split('ID')
    const popping = array1.pop()
    const array2 = wdate.split('ID')
    const popping2 = array2.pop()
    const labels = array2.map((x) => (x))
    const data = {
        labels,
        datasets: [
          {
            label: 'Patients Weight Over Time (Years)',
            data: array1.map((x) => (Number(x))),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };

  return (
    <>

<Line options={options} data={data} plugins={[plugin]} />
    </>
  );
}
