import { map, initMap, flyto} from './map.js';
import {
  createLegend,
  updateRealTimeAQDate,
  updateTodayData,
  exportReport
} from './ui.js';
import './chart.js';


// 初始化地图
initMap();


// 地图加载-执行初始化操作
map.on('load', () => {
  createLegend();
  updateTodayData();
  flyto();
  updateRealTimeAQDate();
});


// 导出报告按钮
document.getElementById('exportButton').addEventListener('click', exportReport);
