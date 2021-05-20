/* globals Chart:false, feather:false */

(function () {
  var request = new XMLHttpRequest();
 
  request.open('GET', 'https://script.google.com/macros/s/AKfycbwWtyT2mHBKVGHRox5d4VA5cV5rHmDRWEhMCDiJM8osiAu_4EPz5fO0qh2E-Ih_CtfdCg/exec', true);
  request.responseType = 'json';
 
  request.onload = function () {
    window.data = this.response;
    window.datalen = data.length - 1;
     for(let i = 0;i <= datalen;i++){
       $(`.tablebody`).append(`<tr class="tabletr${i}"></tr>`);
       let dateformat = new Date(data[i].date);
       let month = dateformat.getMonth() + 1;
       let date = dateformat.getDate();
       $(`.tabletr${i}`).append(`<td>${month}月${date}日</td>`).append(`<td>${data[i].day}</td>`).append(`<td>${data[i].studyplan}</td>`).append(`<td>${data[i].actualystudy}</td>`).append(`<td>${data[i].studyplantime}</td>`).append(`<td>${data[i].actualystudytime}</td>`);
     }
     $("#dropdownMenuButton1").append(`<option value="0"><a class="dropdown-item" href="#">今日</a></option>`);
     for(let i = 1;i <= datalen / 7 - 1;i++){
       $("#dropdownMenuButton1").append(`<option value="${i*7}"><a class="dropdown-item" href="#">${i}週間前</a></option>`);
    }
       feather.replace()
       // Graphs
       let ctx = document.getElementById('myChart')

       window.dayarr = [];
       window.AStimearr = [];
       window.SPtimearr = [];
       // eslint-disable-next-line no-unused-vars
       data.forEach(function( value ) {
        dayarr.push(value.day);
        AStimearr.push(value.actualystudytime);
        SPtimearr.push(value.studyplantime);
   });
       window.drawChart = () => {
         window.myChart = new Chart(ctx, {
           type: 'line',
           data: {
             labels: [
              
             ],
             datasets: [{
               label: '実際の勉強時間',
               data: [
                
               ],
               lineTension: 0,
               borderColor: "rgba(254,97,132,0.8)",
               backgroundColor: 'transparent',
               borderWidth: 4,
               pointBackgroundColor: '#007bff'
             },
             {
               label: '勉強予定時間',
               data: [
                
               ],
               lineTension: 0,
               backgroundColor: 'transparent',
               borderColor: '#007bff',
               borderWidth: 4,
               pointBackgroundColor: '#007bff'
             }]
           },
           options: {
             scales: {
               yAxes: [{
                 ticks: {
                   beginAtZero: false
                 }
               }]
             },
             legend: {
               display: true
             }
           }
         });
       }
     drawChart();
     for(let i = 0;i <= datalen;i++){
      myChart.data.labels.push(dayarr[i]);
      myChart.data.datasets[0].data.push(AStimearr[i]);
      myChart.data.datasets[1].data.push(SPtimearr[i]);
    }
    myChart.update();
    };
  request.send();
  'use strict'
})()
