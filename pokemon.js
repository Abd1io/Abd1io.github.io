const API_URL = "https://api.tfl.gov.uk/Line/{ids}/Status";
const statusElement = document.getElementById("lineStatus");
const form = document.getElementById("lineStatusForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const lineId = document.getElementById("lineId").value;

  fetch(`${API_URL.replace("{ids}", lineId)}`)
    .then((response) => {
      // Parse the JSON  response here using response.json()
      return response.json();
    })
    .then((lineStatusData) => {
      // Code to handle the parsed data (now in JavaScript object format)
      if (lineStatusData.lineStatuses) {
        const firstStatusDescription = lineStatusData.lineStatuses[0].statusSeverityDescription;
        statusElement.textContent = `Line Status: ${firstStatusDescription}`;
      } else {
        statusElement.textContent = "Line status information not availabl" ${lineStatusData} ;
      }
    })
    .catch((error) => {
      // Handle any errors that occur during the fetch or response parsing
      console.error("Error fetching line status:", error);
      statusElement.textContent = "An error occurred while retrieving line status.";
    });
});
