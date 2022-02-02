import dayjs from 'dayjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useGetDeliveriesQuery } from '../../../../Redux/services/deliveries';
import { useState } from 'react';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
    const { data: deliveries } = useGetDeliveriesQuery();
    const deliveriesF = deliveries?.map((delivery) => parseInt(dayjs(delivery.updatedAt).format('MM')));
    const counts: any = [];

    deliveriesF?.forEach((index: any) => {
        counts[index - 1] = (counts[index - 1] || 0) + 1;
    });
    console.log(counts);
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const
            }
        }
    };
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Deliveries accepted per month',
                data: counts,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
            }
        ]
    };
    return <Line options={options} data={data} />;
};

export default LineChart;
