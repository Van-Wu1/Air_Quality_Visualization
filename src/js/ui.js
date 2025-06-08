import { cities } from './data.js';
window.cities = cities;
import { updateMapData } from './map.js';
import { updateAirChart } from './chart.js';

// 实时时间
export function updateRealTimeAQDate() {
  function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  function updateDateTime() {
    const now = new Date();
    const formattedTime = formatDateTime(now);
    const realtimeElement = document.getElementById('realtime');

    if (realtimeElement) {
      realtimeElement.innerText = `The time is: ${formattedTime}`;
    } else {
      console.error("Element with id 'realtime' not found!");
    }
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);
}

// 更新抓取日期
export function updateAQDate(dateStr) {
  const finalStr = dateStr && dateStr.length > 0 ? dateStr : 'No time data is available';
  document.getElementById('aqDate').innerText = `Last updated：${finalStr}`;
}

// 调用 AQICN
export function updateTodayData() {
  const token = '470b837d8b732793e83abee9fa998335994bc711';
  const promises = cities.map(city => {
    const lat = city.coords[1];
    const lng = city.coords[0];
    const url = `https://api.waqi.info/feed/geo:${lat};${lng}/?token=${token}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.status === "ok") {
          city.airQuality = data.data.aqi;
          city.pm10 = data.data.iaqi?.pm10.v;
          city.pm25 = data.data.iaqi?.pm25.v;
          city.so2 = data.data.iaqi?.so2.v;
          city.no2 = data.data.iaqi?.no2.v;

          city.forecast = data.data.forecast?.daily?.pm25;

          if (data.data.time && data.data.time.s) {
            updateAQDate(data.data.time.s);
          } else {
            updateAQDate('');
          }
        } else {
          console.error('API error for ' + city.name, data);
        }
      })
      .catch(err => console.error('Normal fetch error for ' + city.name, err));
  });

  Promise.all(promises).then(() => {
    const geojson = {
      type: 'FeatureCollection',
      features: cities.map(city => ({
        type: 'Feature',
        properties: {
          name: city.name,
          aqi: city.airQuality,
          pm10: city.pm10,
          pm25: city.pm25,
          so2: city.so2,
          no2: city.no2
        },
        geometry: {
          type: 'Point',
          coordinates: city.coords
        }
      }))
    };
    updateMapData(geojson);
  });
}


// text导出
export function exportReport() {
  console.log(cities.length);
  const reportTitle = "Air_Quality_Report";
  const separator = "=".repeat(reportTitle.length);
  const exportDate = new Date().toLocaleString();

  let reportContent = "";

  // 头
  reportContent += `${reportTitle}\n`;
  reportContent += `${separator}\n`;
  reportContent += `Export Date: ${exportDate}\n\n`;

  // 城市
  reportContent += "City Data:\n";
  const header =
    "City".padEnd(15) + " | " +
    "AQI".padEnd(5) + " | " +
    "PM10".padEnd(6) + " | " +
    "PM2.5".padEnd(7) + " | " +
    "SO2".padEnd(5) + " | " +
    "NO2".padEnd(5);
  reportContent += header + "\n";
  reportContent += "-".repeat(15) + "-|-" +
    "-".repeat(5) + "-|-" +
    "-".repeat(6) + "-|-" +
    "-".repeat(7) + "-|-" +
    "-".repeat(5) + "-|-" +
    "-".repeat(5) + "\n";

  cities.forEach(city => {
    const line =
      city.name.padEnd(18) + " | " +
      String(city.airQuality).padEnd(7) + " | " +
      String(city.pm10).padEnd(6) + " | " +
      String(city.pm25).padEnd(7) + " | " +
      String(city.so2).padEnd(5) + " | " +
      String(city.no2).padEnd(5);
  });

  reportContent += "\n";

  // 预测
  reportContent += "Forecast Data (PM2.5):\n";
  cities.forEach(city => {
    reportContent += `\n${city.name} Forecast:\n`;
    if (Array.isArray(city.forecast) && city.forecast.length > 0) {
      const forecastHeader =
        "Day".padEnd(12) + " | " +
        "Avg".padEnd(5) + " | " +
        "Max".padEnd(5) + " | " +
        "Min".padEnd(5);
      reportContent += forecastHeader + "\n";
      reportContent += "-".repeat(12) + "-|-" +
        "-".repeat(5) + "-|-" +
        "-".repeat(5) + "-|-" +
        "-".repeat(5) + "\n";
      city.forecast.forEach(forecast => {
        const day = forecast.day || "N/A";
        const avg = forecast.avg !== undefined ? forecast.avg : "N/A";
        const max = forecast.max !== undefined ? forecast.max : "N/A";
        const min = forecast.min !== undefined ? forecast.min : "N/A";
        reportContent += day.padEnd(12) + " | " +
          String(avg).padEnd(5) + " | " +
          String(max).padEnd(5) + " | " +
          String(min).padEnd(5) + "\n";
      });
    } else {
      reportContent += "No forecast data available\n";
    }
  });

  reportContent += "\nEnd of Report\n";

  // Blob 下载
  const blob = new Blob([reportContent], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'Air_Quality_Report.txt';
  link.click();
}

// 图例
export function createLegend() {
  const legend = document.getElementById('legend');
  legend.innerHTML = '';
  const levels = [
    { color: '#00E400', label: '0 ~ 50 Good' },
    { color: '#FFFF00', label: '51 ~ 100 Moderate' },
    { color: '#FF7E00', label: '101 ~ 150 Unhealthy (Sensitive)' },
    { color: '#FF0000', label: '151 ~ 200 Unhealthy' },
    { color: '#8F3F97', label: '201 ~ 300 Very Unhealthy' },
    { color: '#7E0023', label: '301+ Hazardous' }
  ];
  levels.forEach(l => {
    const item = document.createElement('div');
    item.className = 'legend-item';

    const colorBox = document.createElement('span');
    colorBox.className = 'color-box';
    colorBox.style.backgroundColor = l.color;
    item.appendChild(colorBox);

    const label = document.createElement('span');
    label.textContent = l.label;
    item.appendChild(label);

    legend.appendChild(item);
  });
}
