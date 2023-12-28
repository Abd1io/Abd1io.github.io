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
      statusElement.classList.add('statusElement'); // Changed to .statusElement **
      statusElement.textContent = status;

      // ** New code start **
      const emojiElement = document.createElement('div');
      emojiElement.classList.add('emoji'); // Add class for emoji
      emojiElement.textContent = getEmojiForStatus(status); // Get emoji based on status
      // ** New code end **

      statusBar.onclick = function() {
        statusElement.classList.toggle('active');
      };

      
        statusBar.append(nameElement, emojiElement);
      statusBar.appendChild(statusElement);

      // ** New code start **
      ; // Add the emoji element
      // ** New code end **

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

  // ** New code start **
  // Function to get emoji based on line status
  function getEmojiForStatus(status) {
    // Placeholder emojis based on status (you can replace these)
    if (status.toLowerCase().includes('part closure')) {
      return '🚧'; // Emoji for partial closure
    } else if (status.toLowerCase().includes('fully closed')) {
      return '🚫'; // Emoji for full closure
    } else {
      return '✅'; // Emoji for line status good
    }
  }
  // ** New code end **

  // Fetch and display line status data
  getData();
});