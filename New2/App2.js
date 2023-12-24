$(() => {
  console.log('Beginning data retrieval...');

  function getData() {
    console.log('Fetching tube line data...');
    $.get('https://api.tfl.gov.uk/Line/Mode/tube')
      .done(data => {
        console.log('Tube line data received:', data);

        const lineIds = data.map(line => line.id);

        // Loop through each line ID and fetch status
        lineIds.forEach(lineId => {
          console.log(`Fetching status for line ID ${lineId}...`);
          $.get(`https://api.tfl.gov.uk/Line/${lineId}/Status`)
            .done(data => {
              console.log('Status data for line:', data);

              const lineName = line.name;
              const statusDescription = line.statusSeverityDescription;

              console.log(`Line ${lineName}: ${statusDescription}`); // Log data for HTML handling
            });
        });
      });
  }

  getData(); // Trigger the data fetching process
});
