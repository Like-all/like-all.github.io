
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}


function humanReadableTime(sec) {
    var sec_num = parseInt(sec, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

fetch('http://api.dev.it-the-drote.tk/status/status.json')
  .then(
    function(response) {
      if (response.status !== 200) {
        document.getElementById('main-status').innerHTML = document.getElementById('main-status').innerHTML + "down";
        document.body.style.background = "red";
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        switch (data.server) {
          case 0:
            document.getElementById('main-status').innerHTML = document.getElementById('main-status').innerHTML + "operational";
            break;
          case 1:
            document.getElementById('main-status').innerHTML = document.getElementById('main-status').innerHTML + "under maintenance";
            break;
          default:
        }
        for (var i = 0; i < data.services.length; i++) {
          switch (data.services[i].health) {
            case 0:
              document.getElementById('services-health-status').innerHTML += '<li class="list-group-item list-group-item-success">' + data.services[i].name + '</li>'
              break;
            case 1:
              document.getElementById('services-health-status').innerHTML += '<li class="list-group-item list-group-item-warning">' + data.services[i].name + '</li>'
              break;
            case 2:
              document.getElementById('services-health-status').innerHTML += '<li class="list-group-item list-group-item-danger">' + data.services[i].name + '</li>'
              break;
          }
        }
      });
    }
  )
  .catch(function(err) {
    document.getElementById('main-status').innerHTML = document.getElementById('main-status').innerHTML + "down";
    document.body.style.background = "red";
  });

fetch('events/example.json')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Unable to fetch event log');
        return;
      }

      response.json().then(function(data) {
        for (var i = 0; i < data.length; i++) {
          var currentDate = timeConverter(data[i].timeStart);
          var eta = humanReadableTime(data[i].timeEnd - data[i].timeStart);
          var item = '<div class="messagebox"><h6 class="time-marker">' + data[i].type
                        + ' at '
                        + currentDate
                        + '; ETA '
                        + eta
                        + '</h6><h5>'
                        + data[i].description
                        + '</h5></div>';
          if (data[i].timeStart > Math.floor(Date.now() / 1000)) {
            document.getElementById('events').innerHTML = item + document.getElementById('events').innerHTML;
          } else {
            document.getElementById('log').innerHTML = item + document.getElementById('log').innerHTML;
          }
        }
      });
    }
  ).catch(function(err) {
      console.log('Something went wrong: ' + err);
  });
