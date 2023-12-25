$(() => {
  function getData() {
    $.ajax({
      url: 'https://api.tfl.gov.uk/Line/Mode/tube/Status',
      method: 'GET',
      success: function(data) {
        data.forEach(line => {
          let lineName = line.name;
          let status = line.statusSeverityDescription;
          appendToTable(lineName, status);
        });
      }
    });
  }

  function appendToTable(lineName, status) {
    let newRow = `<tr><td>${lineName}</td><td>${status}</td></tr>`;
    $('#lineStatusBody').append(newRow);
  } 

  getData();
});