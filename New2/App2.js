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
        // Iterate through the data and create status bars
        data.forEach((line, index) => {
          let lineName = line.name;
          let status = line.statusSeverityDescription; // Directly use status property if available
          createStatusBar(lineName, status, index);
        });
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }

  // Create a status bar based on line data
  function createStatusBar(lineName, status, index) {
    let lineStatusBars = document.getElementById('lineStatusBars');

    // Create a div for the line status bar
    let statusBar = document.createElement('div');
    statusBar.classList.add('line-status-bar');

    // Determine the class for the bar based on an index or condition
    let barClass = getBarColorClass(index); // Function to get the appropriate color class
    statusBar.classList.add(barClass);

    // Set the content for the bar (line name and status)
    statusBar.innerHTML = `<strong>${lineName}</strong>: ${status}`;

    // Append the created bar to the container
    lineStatusBars.appendChild(statusBar);
  }

  // Determine the color class for the status bar
  function getBarColorClass(index) {
    // Define logic here to determine the color class based on the index or condition
    // For example:
    if (index % 3 === 0) {
      return 'bar-color-1'; // Apply bar-color-1 class every 3rd bar
    } else if (index % 3 === 1) {
      return 'bar-color-2'; // Apply bar-color-2 class every 3rd+1 bar
    } else {
      return 'bar-color-3'; // Apply bar-color-3 class every 3rd+2 bar
    }
  }

  // Initiate fetching data
  getData();
});