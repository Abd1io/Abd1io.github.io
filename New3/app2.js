document.addEventListener('DOMContentLoaded', () => {
  // Function to fetch data from the API
  function getData() {
    fetch('https://api.tfl.gov.uk/Line/Mode/tube/Status')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        data.forEach((line, index) => {
          let lineName = line.name;
          let status = line.lineStatuses[0].statusSeverityDescription;
          createStatusBar(lineName, status);
        });
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }

  // Function to create a status bar based on line data
  function createStatusBar(lineName, status) {
    let lineStatusBars = document.getElementById('lineStatusBars');
    let statusBar = document.createElement('div');
    statusBar.classList.add('line-status-bar');
    statusBar.setAttribute('onclick', 'toggleDetails(this)'); // Add onclick event listener
    let barClass = getBarColorClass(lineName);
    statusBar.classList.add(barClass);
    statusBar.innerHTML = `<strong>${lineName}</strong>: ${status}`;
    let detailsElement = document.createElement('div');
    detailsElement.classList.add('details', 'hidden');
    detailsElement.innerHTML = 'More details about the line status';
    statusBar.appendChild(detailsElement);
    lineStatusBars.appendChild(statusBar);
  }

  // Function to determine the color class for the status bar based on the line name
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

  // Function to toggle the visibility of the details element
  function toggleDetails(element) {
    const detailsElement = element.querySelector('.details');
    detailsElement.classList.toggle('hidden');
  }

  // Fetch and display line status data
  getData();
});