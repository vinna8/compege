import { useSelector } from "react-redux";
import * as selectors from "../../redux/selectors";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const statistic = useSelector(selectors.statistic);
    
    const data = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
        datasets: [{
            label: 'Статистика',
            data: statistic.statistic,
            backgroundColor: [
                'rgba(219, 205, 254, 0.6)'
            ],
            borderColor: [
                'rgba(219, 205, 254, 0.6)'
            ],
        }]
    };

    const config = {
        type: 'Bar',
        data: data,
        options: {
            scales: {
                x: {
                    
                },
                y: {
                    
                    beginAtZero: true
                }
            }
        },
    };

    return (
        <div>
            <Bar data={data}
            options={config}/>
        </div>
    )
}

export default BarChart;