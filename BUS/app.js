// 1. Find the place to show arrivals (arrivalList)
const arrivalList = document.getElementById('arrivalList');

// 2. Create a box for the bus stop ID (busStopIdInput)
const busStopIdInput = document.createElement('input');
busStopIdInput.type = 'text';
busStopIdInput.placeholder = 'Enter Bus Stop ID';

// 3. Create a button to fetch arrivals (submitButton)
const submitButton = document.createElement('button');
submitButton.textContent = 'Get Arrivals';

// 4. Function to handle button click (handleSubmit)
function handleSubmit(event) {
  // Stop the page from reloading unnecessarily
  event.preventDefault();

  // Grab the bus stop ID the user entered
  const busStopId = busStopIdInput.value;

  // Call the function to fetch arrival info (fetchBusArrivals)
  fetchBusArrivals(busStopId);
}

// 5. Function to fetch bus arrival info (fetchBusArrivals)
function fetchBusArrivals(busStopId) {
  // Build the URL to fetch data from the TfL API
  const url = `https://api.tfl.gov.uk/StopPoint/${busStopId}/Arrivals`;

  // Fetch data from the TfL API
  fetch(url)
    .then(response => response.json()) // Convert the response to readable format
    .then(data => {
      // Clear any old arrival info
      arrivalList.innerHTML = '';

      // If there are no upcoming arrivals, show a message
      if (data.length === 0) {
        arrivalList.innerHTML = '<li>No upcoming arrivals found.</li>';
        return;
      }

      // Prepare a list to show arrival info
      const arrivals = data.map(arrival => {
        const destinationName = arrival.destinationName;
        const minutes = Math.floor(arrival.timeToLive / 60);
        const seconds = arrival.timeToLive % 60;

        // Create a list item for each arrival with details
        return `<li><b>${destinationName}:</b> Arriving in ${minutes} minutes ${seconds} seconds</li>`;
      });

      // Show the list of arrivals on the page
      arrivalList.innerHTML = arrivals.join('');
    })
    .catch(error => { // In case of errors while fetching data
      console.error('Error fetching bus arrivals:', error);
      arrivalList.innerHTML = '<li>Error fetching data. Please try again later.</li>';
    });
}

// 6. Add the input box and button to the page (appContainer)
const appContainer = document.getElementById('app');
appContainer.appendChild(busStopIdInput);
appContainer.appendChild(submitButton);

// 7. Make the button call the function when clicked (click event listener)
submitButton.addEventListener('click', handleSubmit);
