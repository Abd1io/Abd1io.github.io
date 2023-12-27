document.addEventListener('DOMContentLoaded', () => {
  // Fetch data from the API
  function getData() {
    fetch('https://api.tfl.gov.uk/Line/Mode/tube/Status')
      .then(response => response.json())
      .then(data => {
        renderLineStatuses(data); // Pass the fetched data to render line statuses
      });
  }

  // Updated render line statuses function with all 11 lines
  function renderLineStatuses(data) {
    const lineStatusBars = document.getElementById('lineStatusBars');

    data.forEach(line => {
      const lineName = line.name;
      const status = line.lineStatuses[0].statusSeverityDescription;

      const statusBar = document.createElement('div');
      statusBar.classList.add('line-status-bar');
      statusBar.classList.add(getBarColorClass(lineName)); // Assign color based on line name

      const nameElement = document.createElement('div');
      nameElement.classList.add('line-name');
      nameElement.textContent = lineName;

      const statusElement = document.createElement('div');
      statusElement.classList.add('line-status');
      statusElement.textContent = status;

         
statusBar.onclick = function() {
  statusElement.classList.toggle('hidden');
};
    
          
      statusBar.appendChild(nameElement);
      statusBar.appendChild(statusElement);
      lineStatusBars.appendChild(statusBar);
    });
  }

  // Function to assign line-specific CSS classes
  function getBarColorClass(lineName) {
    switch (lineName) {
        // Assign line-specific CSS classes
    case 'Bakerloo':
      return 'bakerloo';
    case 'Central':
      return 'central';
    case 'Circle':
      return 'circle';
    case 'District':
      return 'district';
    case 'Hammersmith & City':
      return 'hammercity';
    case 'Jubilee':
      return 'jubilee';
    case 'Metropolitan':
      return 'metropolitan';
    case 'Northern':
      return 'northern';
    case 'Piccadilly':
      return 'piccadilly';
    case 'Victoria':
      return 'victoria';
    case 'Waterloo & City':
      return 'waterloocity';
    default:
      return 'default-class';
  }
}
      
  // Fetch and display line status data
  getData();
});