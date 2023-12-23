const API_URL = "https://api.tfl.gov.uk/Line/{ids}/Status";
const statusElement = document.getElementById("lineStatus");
const form = document.getElementById("lineStatusForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const lineId = document.getElementById("lineId").value;

  fetch(`${API_URL.replace("{ids}", lineId)}`)
    .then((response) => response.json())
    .then((lineStatusData) => {
      // Code to handle the API response directly, without using statuses variable
      if (lineStatusData.lineStatuses) {
        const firstStatusDescription = lineStatusData.lineStatuses[0].statusSeverityDescription;
        statusElement.textContent = `Line Status: ${firstStatusDescription}`;
      } else {
        statusElement.textContent = "Line status information not available.";
      }
    })
    .catch((error) => {
      // Handle any errors thatoccur during the fetch or response parsing
      console.error("Error fetching line status:", error);
      statusElement.textContent = "An error occurred while retrieving line status.";
    });
});
