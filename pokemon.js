const API_URL = "https://api.tfl.gov.uk/Line/{ids}/Status";
const statusElement = document.getElementById("lineStatus"); // Target the correct element
const form = document.getElementById("lineStatusForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const lineId = document.getElementById("lineId").value;

  fetch(`${API_URL.replace("{ids}", lineId)}`)
    .then((response) => response.json())
    .then((lineStatusData) => {
      // Access and display line status information
      const statusSeverityDescription = lineStatusData.lineStatuses[0].statusSeverityDescription;
      statusElement.textContent = `Line Status: ${statusSeverityDescription}`;
    })
    .catch((error) => {
      console.error("Error fetching line status:", error);
      statusElement.textContent = "Error fetching line status."; // Display error message
    });
});
