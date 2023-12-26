document.addEventListener('DOMContentLoaded', () => {
  function createStatusBar(lineName, status) {
    let lineStatusBars = document.getElementById('lineStatusBars');

    // Create a div for the line status bar
    let statusBar = document.createElement('div');
    statusBar.classList.add('line-status-bar');

    // Set the content for the bar (line name and status)
    statusBar.innerHTML = `<strong>${lineName}</strong>: ${status}`;

    // Append the created bar to the container
    lineStatusBars.appendChild(statusBar);
  }

  function getData() {
    fetch('https://api.tfl.gov.uk/Line/Mode/tube/Status')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        data.forEach(line => {
          let lineName = line.name;
          let status = line.lineStatuses[0].statusSeverityDescription;
          createStatusBar(lineName, status);
        });
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }

  getData();
});