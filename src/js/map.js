import { circleRadiusExpression, circleColorExpression } from './data.js';

export let map;

// 初始化地图
export function initMap() {
  mapboxgl.accessToken = 'pk.eyJ1IjoidmFuMTEyMDEwMTZ3dSIsImEiOiJjbTd1b2JodnMwMmV1MmpzYTlhcXJxNWJ1In0.PC95-6c3OQtSQoxlvNAWOA';
  
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [90.657104, 29.432596],
    zoom: 1.5
  });
  map.addControl(new mapboxgl.NavigationControl());
}

export function flyto(){
    // 大洲中心坐标
    const continentCenters = {
      "Asia": [90.0, 34.0],
      "Europe": [15.0, 50.0],
      "North America": [-100.0, 40.0],
      "South America": [-60.0, -15.0],
      "Africa": [20.0, 0.0],
      "Oceania": [134.0, -25.0]
    };
  
    // 按钮添加事件
    document.querySelectorAll("#flytobutton button").forEach(button => {
      button.addEventListener("click", function () {
        const continent = this.id;
        if (continentCenters[continent]) {
          console.log(`Flying to ${continent}:`, continentCenters[continent]);
          map.flyTo({
            center: continentCenters[continent],
            zoom: 1.5,
            speed: 0.5,
            pitch: 0
          });
        } else {
          console.warn(`No coordinates found for: ${continent}`);
        }
      });
    });
};
 

// AQI 圆点图层
export function updateMapData(geojson) {
  if (map.getSource('airQualityData')) {
    map.getSource('airQualityData').setData(geojson);
  } else {
    map.addSource('airQualityData', {
      type: 'geojson',
      data: geojson
    });
    map.addLayer({
      id: 'airQualityCircles',
      type: 'circle',
      source: 'airQualityData',
      paint: {
        'circle-radius': circleRadiusExpression,
        'circle-color': circleColorExpression,
        'circle-opacity': 0.8
      }
    });

    // MouseEnter
    let popup;
    map.on('mouseenter', 'airQualityCircles', (e) => {
      map.getCanvas().style.cursor = 'pointer';
      const coordinates = e.features[0].geometry.coordinates.slice();
      const props = e.features[0].properties;
      popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      })
      .setLngLat(coordinates)
      .setHTML(`<h4>${props.name}</h4>
                <p>AQI：${props.aqi}</p>
                <p>pm10: ${props.pm10}</p>
                <p>pm25: ${props.pm25}</p>
                <p>so2: ${props.so2}</p>
                <p>no2: ${props.no2}</p>`)
      .addTo(map);
      console.log("MouseOver city:",props.name);
    });
    map.on('mouseleave', 'airQualityCircles', () => {
      map.getCanvas().style.cursor = '';
      if (popup) {
        popup.remove();
        popup = null;
      }
    });


    // MouseClick
    map.on('click', 'airQualityCircles', (e) => {
    const props = e.features[0].properties;

    // 构造 city 对象（与 ui.js 的 city 结构一致）
    const city = {
      name: props.name,
      airQuality: props.aqi,
      pm10: props.pm10,
      pm25: props.pm25,
      so2: props.so2,
      no2: props.no2,
      forecast: window.cities.find(c => c.name === props.name)?.forecast || []
    };

    console.log("Clicked city:", city.name);
    window.updateAirChart(city);
  });
  }
}

