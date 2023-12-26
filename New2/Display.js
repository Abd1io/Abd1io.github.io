import { fetchData } from './apiCalls.js';

// Fetches data and processes it to create status bars
function processFetchedData() {
  fetchData()
    .then(data => {
      // Iterates through each line to create status bars
      data.forEach((line, index) => {
        const lineName = line.name;
        const status = line.lineStatuses[0].statusSeverityDescription;
        createStatusBar(lineName, status);
      });
    })
    .catch(error => {
      console.error('There has been a problem:', error);
    });
}

// Creates a status bar based on line data
function createStatusBar(lineName, status) {
  const lineStatusBars = document.getElementById('lineStatusBars');
  const statusBar = document.createElement('div');
  statusBar.classList.add('line-status-bar');
  const barClass = getBarColorClass(lineName);
  statusBar.classList.add(barClass);
  statusBar.innerHTML = `<strong>${lineName}</strong>: ${status}`;
  lineStatusBars.appendChild(statusBar);
}

// Retrieves the appropriate CSS class for a line
function getBarColorClass(lineName) {
  // Mapping of line names to their respective CSS classes
  const lineClasses = {
    Bakerloo: 'bakerloo-class',
    Central: 'central-class',
    Circle: 'circle-class',
    District: 'district-class',
    'Hammersmith & City': 'hammersmith-city-class',
    Jubilee: 'jubilee-class',
    Metropolitan: 'metropolitan-class',
    Northern: 'northern-class',
    Piccadilly: 'piccadilly-class',
    Victoria: 'victoria-class',
    'Waterloo & City': 'waterloo-city-class',
  };

  return lineClasses[lineName] || 'default-class'; // Returns the line class or default if not found
}

export { processFetchedData };