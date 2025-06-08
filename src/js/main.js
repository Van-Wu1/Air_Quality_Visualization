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


// 初始化地图后执行
initMap().then(() => {
  createLegend();
  updateTodayData();
  flyto();
  updateRealTimeAQDate();
});


// 导出报告按钮
document.getElementById('exportButton').addEventListener('click', exportReport);
