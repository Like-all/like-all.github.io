fetch('http://api.dev.it-the-drote.tk/status/example.json')
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