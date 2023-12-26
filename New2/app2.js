document.addEventListener('DOMContentLoaded', () => {
  // Fetch data from the API
  function getData() {
    fetch('https://api.tfl.gov.uk/Line/Mode/tube/Status')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
   .then(data => {
  console.log(data); // Logging the received data from the API
  data.forEach((line, index) => {
    console.log(line); // Logging the individual line object
    let lineName = line.name;
    let status = line.statusSeverityDescription;
    createStatusBar(lineName, status);
  });
})
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }

  // Create a status bar based on line data
  function createStatusBar(lineName, status) {
    let lineStatusBars = document.getElementById('lineStatusBars');
    let statusBar = document.createElement('div');
    statusBar.classList.add('line-status-bar');
    let barClass = getBarColorClass(lineName);
    statusBar.classList.add(barClass);
    statusBar.innerHTML = `<strong>${lineName}</strong>: ${status}`;
    lineStatusBars.appendChild(statusBar);
  }

  // Determine the color class for the status bar based on the line name
  function getBarColorClass(lineName) {
    switch (lineName) {
      case 'Bakerloo':
        return 'bakerloo-class';
      case 'Central':
        return 'central-class';
      case 'Circle':
        return 'circle-class';
      case 'District':
        return 'district-class';
      case 'Hammersmith & City':
        return 'hammersmith-city-class';
      case 'Jubilee':
        return 'jubilee-class';
      case 'Metropolitan':
        return 'metropolitan-class';
      case 'Northern':
        return 'northern-class';
      case 'Piccadilly':
        return 'piccadilly-class';
      case 'Victoria':
        return 'victoria-class';
      case 'Waterloo & City':
        return 'waterloo-city-class';
      default:
        return 'default-class';
    }
  }

  // Fetch and display line status data
  getData();
});