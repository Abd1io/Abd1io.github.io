// Function to fetch data from the API
export const fetchData = () => {
  return fetch('https://api.tfl.gov.uk/Line/Mode/tube/Status')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
};