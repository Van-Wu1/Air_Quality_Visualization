const chartContainer = document.getElementById('chartContainer');
const ctx = document.getElementById('airChart').getContext('2d');

// 灰层
const overlay = document.createElement('div');
overlay.id = 'chartOverlay';
overlay.style.position = 'absolute';
overlay.style.top = '35%';
overlay.style.left = '2%';
overlay.style.width = '96%';
overlay.style.height = '30%';
overlay.style.borderRadius = '8px';
overlay.style.backgroundColor = 'rgba(56, 56, 56, 0.85)';
overlay.style.display = 'none';
overlay.style.alignItems = 'center';
overlay.style.justifyContent = 'center';
overlay.style.flexDirection = 'column';
overlay.style.fontSize = '20px';
overlay.style.color = 'white';
overlay.innerHTML = '😢 No forecast data is available for the city 😢';
overlay.style.textAlign = 'center';
chartContainer.appendChild(overlay); 

//柱状图
const pm25Chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [], 
        datasets: [
            {
                label: 'Avg',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 0.5,
                barThickness: 20, 
                categoryPercentage: 1
            },
            {
                label: 'Estimated',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 0.5,
                barThickness: -20, 
                categoryPercentage: 1 
            },
            {
                label: 'Trend', 
                data: [],
                type: 'line',
                borderColor: 'rgba(0, 0, 0, 1)',
                pointBackgroundColor: 'rgba(0, 0, 0, 1)',
                pointRadius: 3,
                fill: false,
                tension: 0.3
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { 
                title: { display: true, text: 'Date' },
                ticks: { autoSkip: false }
            },
            y: { title: { display: true, text: 'PM2.5 (µg/m³)' } }
        },
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: '🤩 Click cities to explore forecast data 🤩'
            }
        }
    }
});

// 更新图表
export function updateAirChart(city) {
    if (!city.forecast || city.forecast.length === 0) {
        overlay.style.display = 'flex';
        return;
    } else {
        overlay.style.display = 'none';
    }

    // 获取日期
    const today = new Date();
    today.setDate(today.getDate() + 1);

    const next7Days = [];
    for (let i = 0; i < 7; i++) {
        let nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);
        next7Days.push(nextDate.toISOString().split('T')[0]);
    }

    // 从 forecast 获取数据
    let validForecast = city.forecast.filter(entry => next7Days.includes(entry.day));

    // 最后一个有真实数据的点
    let lastValidValue = validForecast.length > 0 ? validForecast[validForecast.length - 1].avg : city.forecast[city.forecast.length - 1].avg;

    const forecastMap = new Map(validForecast.map(entry => [entry.day, entry.avg]));
    const avgData = [];
    const estimatedData = [];
    const trendLine = [];

    next7Days.forEach((day) => {
        if (forecastMap.has(day)) {
            let value = forecastMap.get(day);
            avgData.push(value); 
            estimatedData.push(null);
            trendLine.push(value); 
        } else {
            avgData.push(null); 
            estimatedData.push(lastValidValue); 
            trendLine.push(lastValidValue);
        }
    });

    // 更新图表标题
    pm25Chart.options.plugins.title.text = `PM2.5 forecast for the next 7 days (${city.name})`;

    // 更新数据
    pm25Chart.data.labels = next7Days;
    pm25Chart.data.datasets[0].data = avgData; 
    pm25Chart.data.datasets[1].data = estimatedData;
    pm25Chart.data.datasets[2].data = trendLine; 
    pm25Chart.update();
}

window.updateAirChart = updateAirChart;
