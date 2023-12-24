$(() => {
  function getData() {
    $.get('https://api.tfl.gov.uk/Line/Mode/tube')
      .done(data => {
        const lineIds = data.map(line => line.id);

        // Loop through each line ID and fetch status
        lineIds.forEach(lineId => {
          $.get(`https://api.tfl.gov.uk/Line/${lineId}/Status`)
            .done(data => {
              const lineName = line.name;
              const statusDescription = line.statusSeverityDescription;

              console.log({ lineName, statusDescription }); // Log data for HTML handling (excluding color)
            });
        });
      });
  }
});
