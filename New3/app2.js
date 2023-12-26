// Make the getData() function async
async function getData() {

  // Change the API URL
  const apiUrl = 'https://api.tfl.gov.uk/Line/Mode/tube/Status';

  // Use the await keyword with the fetch() promise
  const response = await fetch(apiUrl);

  // Call the json() method on the response object
  const data = await response.json();

  // Iterate over the data and create status bars
  data.forEach((line, index) => {
    let lineName = line.name;
    let status = line.lineStatuses[0].statusSeverityDescription;
    createStatusBar(lineName, status);
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

// Export the toggleDetails function
export { toggleDetails };

// Fetch and display line status data
getData();