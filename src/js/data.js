// 120个城市！！！（有些数据格式不匹配，最终只有81个城市数据被调用导入pity
export const cities = [
  { name: 'New York',           coords: [-74.0060, 40.7128], airQuality: 65 },
  { name: 'Los Angeles',        coords: [-118.2437, 34.0522], airQuality: 72 },
  { name: 'London',             coords: [-0.1276, 51.5074],   airQuality: 55 },
  { name: 'Tokyo',              coords: [139.6503, 35.6762],  airQuality: 88 },
  { name: 'Paris',              coords: [2.3522, 48.8566],    airQuality: 60 },
  { name: 'Beijing',            coords: [116.4074, 39.9042],  airQuality: 95 },
  { name: 'Shanghai',           coords: [121.4737, 31.2304],  airQuality: 80 },
  { name: 'Guangzhou',          coords: [113.2644, 23.1291],  airQuality: 75 },
  { name: 'Shenzhen',           coords: [114.0579, 22.5431],  airQuality: 70 },
  { name: 'Chengdu',            coords: [104.0665, 30.5728],  airQuality: 85 },
  { name: 'Wuhan',              coords: [114.3055, 30.5928],  airQuality: 90 },
  { name: 'Harbin',             coords: [126.6425, 45.7568],  airQuality: 65 },
  { name: 'Urumqi',             coords: [87.6177, 43.7928],   airQuality: 95 },
  { name: 'Hong Kong',          coords: [114.1095, 22.3964],  airQuality: 75 },
  { name: 'Taipei',             coords: [121.5654, 25.0330],  airQuality: 60 },
  { name: 'Seoul',              coords: [126.9780, 37.5665],  airQuality: 85 },
  { name: 'Bangkok',            coords: [100.5018, 13.7563],  airQuality: 80 },
  { name: 'Singapore',          coords: [103.8198, 1.3521],   airQuality: 55 },
  { name: 'Dubai',              coords: [55.2708, 25.2048],   airQuality: 70 },
  { name: 'Istanbul',           coords: [28.9784, 41.0082],   airQuality: 90 },
  { name: 'Moscow',             coords: [37.6173, 55.7558],   airQuality: 58 },
  { name: 'Vladivostok',        coords: [131.8869, 43.1332],  airQuality: 45 },
  { name: 'Khabarovsk',         coords: [135.0734, 48.4802],  airQuality: 50 },
  { name: 'Yakutsk',            coords: [129.7331, 62.0355],  airQuality: 40 },
  { name: 'Novosibirsk',        coords: [82.9346, 55.0084],   airQuality: 55 },
  { name: 'Cape Town',          coords: [18.4241, -33.9249],  airQuality: 55 },
  { name: 'Johannesburg',       coords: [28.0473, -26.2041],  airQuality: 75 },
  { name: 'Cairo',              coords: [31.2357, 30.0444],   airQuality: 100 },
  { name: 'Nairobi',            coords: [36.8219, -1.2921],   airQuality: 85 },
  { name: 'Lagos',              coords: [3.3792, 6.5244],     airQuality: 110 },
  { name: 'Accra',              coords: [-0.1869, 5.6037],    airQuality: 90 },
  { name: 'Kinshasa',           coords: [15.2663, -4.4419],   airQuality: 105 },
  { name: 'Casablanca',         coords: [-7.5898, 33.5731],   airQuality: 60 },
  { name: 'Addis Ababa',        coords: [38.7578, 9.0300],    airQuality: 80 },
  { name: 'Dakar',              coords: [-17.4439, 14.6928],  airQuality: 75 },
  { name: 'Buenos Aires',       coords: [-58.3816, -34.6037], airQuality: 60 },
  { name: 'Rio de Janeiro',     coords: [-43.1729, -22.9068], airQuality: 65 },
  { name: 'Mexico City',        coords: [-99.1332, 19.4326],  airQuality: 85 },
  { name: 'Lima',               coords: [-77.0428, -12.0464], airQuality: 70 },
  { name: 'Bogotá',             coords: [-74.0721, 4.7110],   airQuality: 85 },
  { name: 'Toronto',            coords: [-79.3832, 43.6532],  airQuality: 50 },
  { name: 'Montreal',           coords: [-73.5673, 45.5017],  airQuality: 45 },
  { name: 'Vancouver',          coords: [-123.1216, 49.2827], airQuality: 42 },
  { name: 'San Francisco',      coords: [-122.4194, 37.7749], airQuality: 50 },
  { name: 'Chicago',            coords: [-87.6298, 41.8781],  airQuality: 65 },
  { name: 'Boston',             coords: [-71.0589, 42.3601],  airQuality: 48 },
  { name: 'Houston',            coords: [-95.3698, 29.7604],  airQuality: 70 },
  { name: 'Berlin',             coords: [13.4050, 52.5200],   airQuality: 48 },
  { name: 'Madrid',             coords: [-3.7038, 40.4168],   airQuality: 52 },
  { name: 'Lisbon',             coords: [-9.1394, 38.7169],   airQuality: 50 },
  { name: 'Stockholm',          coords: [18.0686, 59.3293],   airQuality: 40 },
  { name: 'Oslo',               coords: [10.7522, 59.9139],   airQuality: 35 },
  { name: 'Copenhagen',         coords: [12.5683, 55.6761],   airQuality: 42 },
  { name: 'Vienna',             coords: [16.3738, 48.2082],   airQuality: 40 },
  { name: 'Helsinki',           coords: [24.9354, 60.1695],   airQuality: 38 },
  { name: 'Brussels',           coords: [4.3517, 50.8503],    airQuality: 55 },
  { name: 'Warsaw',             coords: [21.0122, 52.2298],   airQuality: 55 },
  { name: 'Prague',             coords: [14.4378, 50.0755],   airQuality: 50 },
  { name: 'Dublin',             coords: [-6.2603, 53.3498],   airQuality: 45 },
  { name: 'Sydney',             coords: [151.2093, -33.8688], airQuality: 45 },
  { name: 'Melbourne',          coords: [144.9631, -37.8136], airQuality: 50 },
  { name: 'Brisbane',           coords: [153.0251, -27.4698], airQuality: 42 },
  { name: 'Perth',              coords: [115.8575, -31.9505], airQuality: 40 },
  { name: 'Adelaide',           coords: [138.6007, -34.9285], airQuality: 48 },
  { name: 'Canberra',           coords: [149.1300, -35.2809], airQuality: 38 },
  { name: 'Toronto',            coords: [-79.3832, 43.6532], airQuality: 50 },
  { name: 'Vancouver',          coords: [-123.1216, 49.2827], airQuality: 42 },
  { name: 'Montreal',           coords: [-73.5673, 45.5017], airQuality: 45 },
  { name: 'Calgary',            coords: [-114.0719, 51.0447], airQuality: 38 },
  { name: 'Ottawa',             coords: [-75.6972, 45.4215], airQuality: 40 },
  { name: 'Edmonton',           coords: [-113.4909, 53.5461], airQuality: 48 },
  { name: 'São Paulo',          coords: [-46.6333, -23.5505], airQuality: 70 },
  { name: 'Rio de Janeiro',     coords: [-43.1729, -22.9068], airQuality: 65 },
  { name: 'Brasília',           coords: [-47.8825, -15.7942], airQuality: 50 },
  { name: 'Salvador',           coords: [-38.5016, -12.9714], airQuality: 55 },
  { name: 'Fortaleza',          coords: [-38.5239, -3.7319],  airQuality: 58 },
  { name: 'Belo Horizonte',     coords: [-43.9378, -19.9167], airQuality: 52 },
  { name: 'La Paz',             coords: [-68.1193, -16.5000], airQuality: 60 },
  { name: 'Santa Cruz',         coords: [-63.1821, -17.7833], airQuality: 65 },
  { name: 'Cochabamba',         coords: [-66.1653, -17.4139], airQuality: 55 },
  { name: 'Sucre',              coords: [-65.2627, -19.0333], airQuality: 50 }
];


// AQI 分段颜色函数
export function getAQIColor(aqi) {
  if (aqi <= 50) return '#00E400';   // Good
  if (aqi <= 100) return '#FFFF00';  // Moderate
  if (aqi <= 150) return '#FF7E00';  // Unhealthy for Sensitive Groups
  if (aqi <= 200) return '#FF0000';  // Unhealthy
  if (aqi <= 300) return '#8F3F97';  // Very Unhealthy
  return '#7E0023';                  // Hazardous
}


// 圆圈半径插值
export const circleRadiusExpression = [
  'interpolate', ['linear'], ['get', 'aqi'],
  0, 15,
  50, 25,
  100, 35,
  150, 45,
  200, 55,
  300, 65
  // 0, 8,
  // 50, 15,
  // 100, 25,
  // 150, 35,
  // 200, 45,
  // 300, 55
];


// 圆圈颜色插值
export const circleColorExpression = [
  'interpolate', ['linear'], ['get', 'aqi'],
  0, '#00E400',
  50, '#FFFF00',
  100, '#FF7E00',
  150, '#FF0000',
  200, '#8F3F97',
  300, '#7E0023'
];
