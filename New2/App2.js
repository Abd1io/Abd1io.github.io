// Fetch subway line data from the API
fetch('https://api.tfl.gov.uk/Line/Mode/tube')
  .then(response => response.json()) // Convert response to JSON
  .then(statusData => {
    statusData.forEach(line => {
      // Extract subway line name
      const lineName = line.name;

      // Loop through each status entry for a subway line
      line.lineStatuses.forEach(status => {
        // Extract status description for the subway line
        const statusDescription = status.statusSeverityDescription;

        // Access the table and populate it with line name and status
        const tableBody = document.getElementById('tableBody');
        const row = tableBody.insertRow();
        const nameCell = row.insertCell();
        const statusCell = row.insertCell();
        nameCell.textContent = lineName;
        statusCell.textContent = statusDescription;
      });
    });
  });