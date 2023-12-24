/* global google:ignore */

$(() => {
  function getData() {
  
  
  .get('https://api.tfl.gov.uk/Line/Mode/tube')
    .done(data => {
      const lineIds = data.map(line => id);

      // Loop through each line and fetch status
      lineIds.forEach(lineId => {
        $.get(`https://api.tfl.gov.uk/Line/${Id}/Status`)
          .done(data => {
            const lineName = data.lineStatuses[0].name;
            const statusDescription = data.lineStatuses[0].statusSeverityDescription;
            const statusColor = getStatusColor(statusDescription);

            // Create bar element
            const bar = document.createElement('div');
            bar.classList.add('line-status-bar');
            bar.style.backgroundColor = statusColor;
            bar.textContent = `${lineName}: ${statusDescription}`;

            // Add bar to HTML
            const lineStatusesContainer = document.getElementById('line-statuses');
            lineStatusesContainer.appendChild(bar);
          });
      });
    });
});

// Define function to map status to color
function getStatusColor(statusDescription) {
  switch (statusDescription) {
    case 'Good Service':
      return 'green';
    case 'Minor Delays':
      return 'yellow';
    case 'Severe Delays':
      return 'red';
    default:
      return 'gray';
  }
}
