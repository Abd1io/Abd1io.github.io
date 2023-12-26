document.addEventListener('DOMContentLoaded', () => {
  // Function to fetch data from the API
  function getData() {
    // Fetch data from the API
    fetch('https://api.tfl.gov.uk/Line/Mode/tube/Status')
      .then(response => {
        // Check if the response is ok, else throw an error
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse response to JSON
      })
      .then(data => {
        // Iterate through the received data
        data.forEach(line => {
          // Extract line name and statusSeverityDescription from the response
          let lineName = line.name;
          let status = line.lineStatuses[0].statusSeverityDescription; // Access statusSeverityDescription from lineStatuses array
          appendToTable(lineName, status); // Append data to the table
        });
      })
      .catch(error => {
        // Handle any errors that occurred during fetch
        console.error('There has been a problem with your fetch operation:', error);
      });
  }

  // Function to append data to the table
  function appendToTable(lineName, status) {
    // Create a new row with lineName and status
    let newRow = `<tr><td>${lineName}</td><td>${status}</td></tr>`;
    // Append the new row to the existing table body
    document.getElementById('lineStatusBody').innerHTML += newRow;
  }

  // Call the function to fetch and display data
  getData();
});

