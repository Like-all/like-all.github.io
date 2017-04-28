$.ajax({
  url: 'http://healthchecks.it-the-drote.tk/healthchecks.json',
  dataType: 'json',
  //data: data,
  timeout: 1000,
  success:  function(data, textStatus, xhr) {
    if(xhr.status !== 200) {
      document.getElementById('main-status').innerHTML = document.getElementById('main-status').innerHTML + "down";
      document.body.style.background = "red";
    } else {
      document.getElementById('main-status').innerHTML = document.getElementById('main-status').innerHTML + "operational";
      document.body.style.background = "#36c184";
    }
    for (var i = 0; i < data.length; i++) {
      switch (data[i].status) {
        case 0:
          document.getElementById('services-health-status').innerHTML += '<li class="list-group-item list-group-item-success">' + data[i].name + '</li>'
          break;
        case 1:
          document.getElementById('services-health-status').innerHTML += '<li class="list-group-item list-group-item-warning">' + data[i].name + '</li>'
          break;
        case 2:
          document.getElementById('services-health-status').innerHTML += '<li class="list-group-item list-group-item-danger">' + data[i].name + '</li>'
          break;
      }
    }
  },
  error: function(jqXHR, status, errorThrown){
    document.getElementById('main-status').innerHTML = document.getElementById('main-status').innerHTML + "down";
    document.body.style.background = "red";
  }
});
