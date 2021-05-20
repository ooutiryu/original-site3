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
       data[i].date = `${month}月${date}日`;
       $(`.tabletr${i}`).append(`<td>${month}月${date}日</td>`).append(`<td>${data[i].day}</td>`).append(`<td>${data[i].studyplan}</td>`).append(`<td>${data[i].actualystudy}</td>`).append(`<td>${data[i].studyplantime}</td>`).append(`<td>${data[i].actualystudytime}</td>`);
     }
     $("#dropdownMenuButton1").append(`<option value="0"><a class="dropdown-item" href="#">今日</a></option>`);
     for(let i = 1;i <= datalen / 7 - 1;i++){
       $("#dropdownMenuButton1").append(`<option value="${i*7}"><a class="dropdown-item" href="#">${i}週間前</a></option>`);
    }
       feather.replace()
       // Graphs
       let ctx = document.getElementById('myChart')
       // eslint-disable-next-line no-unused-vars

       window.drawChart = () => {
         window.myChart = new Chart(ctx, {
           type: 'line',
           data: {
             labels: [
               `${data[datalen - 6].day}曜日`,
               `${data[datalen - 5].day}曜日`,
               `${data[datalen - 4].day}曜日`,
               `${data[datalen - 3].day}曜日`,
               `${data[datalen - 2].day}曜日`,
               `${data[datalen - 1].day}曜日`,
               `${data[datalen].day}曜日`
             ],
             datasets: [{
               label: '実際の勉強時間',
               data: [
                 `${data[datalen - 6].actualystudytime}`,
                 `${data[datalen - 5].actualystudytime}`,
                 `${data[datalen - 4].actualystudytime}`,
                 `${data[datalen - 3].actualystudytime}`,
                 `${data[datalen - 2].actualystudytime}`,
                 `${data[datalen - 1].actualystudytime}`,
                 `${data[datalen].actualystudytime}`,
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
                 `${data[datalen - 6].studyplantime}`,
                 `${data[datalen - 5].studyplantime}`,
                 `${data[datalen - 4].studyplantime}`,
                 `${data[datalen - 3].studyplantime}`,
                 `${data[datalen - 2].studyplantime}`,
                 `${data[datalen - 1].studyplantime}`,
                 `${data[datalen].studyplantime}`,
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
    };
  request.send();
  'use strict'

  window.changeChart = () => {
    if (myChart) {
      myChart.destroy();
    }
    drawChart(); // グラフを再描画
  }
  window.changeDatalen = (val) => {
    datalen = data.length - 1 -val;
  }
  $(function() {
    $('#lineshare').on('click', function(){
        window.open("https://social-plugins.line.me/lineit/share?url=" + encodeURIComponent($('#qrvalue').val()),
                "_blank",   "top=50,left=50,width=500,height=500,scrollbars=1,location=0,menubar=0,toolbar=0,status=1,directories=0,resizable=1");
        return false;
    });
});
  $(function() {
    $('#export').on('click',downloadCSV)
  });
  $(function() {
    $("#search-input").submit(searchResult);
  });
  
//jsonをcsv文字列に編集する
function jsonToCsv(json, delimiter) {
  var header = "日付,曜日,勉強予定内容,実際に勉強した内容,勉強予定時間,実際に勉強した時間" + "\n";
  var body = json.map(function(d){
      return Object.keys(d).map(function(key) {
          return d[key];
      }).join(delimiter);
  }).join("\n");
  return header + body;
}

//csv変換
function exportCSV(items, delimiter, filename) {

  //文字列に変換する
  var csv = jsonToCsv(items, delimiter);

  //拡張子
  var extention = delimiter==","?"csv":"tsv";

  //出力ファイル名
  var exportedFilename = (filename  || 'export') + '.' + extention;

  //BLOBに変換
  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

  if (navigator.msSaveBlob) { // for IE 10+
      navigator.msSaveBlob(blob, exportedFilename);
  } else {
      //anchorを生成してclickイベントを呼び出す。
      var link = document.createElement("a");
      if (link.download !== undefined) {
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", exportedFilename);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
  }
}
let downloadCSV = () => {
  exportCSV(data,",","studyCSV");
}

let searchResult = () => {
  let searchvalue = $("#search-input").value;
  for(let i = 0;i <= datalen;i++){
      if(searchvalue == data[i].date){
          window.searchI = i;
          console.log(searchI);
        }else{
          console.log(error);
        }
      
  }

}



  
  
})()

