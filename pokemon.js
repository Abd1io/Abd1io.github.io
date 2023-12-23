const API_URL = "https://api.tfl.gov.uk/Line/{ids}/Status";
const statusElement = document.getElementById("lineStatus"); // Target the correct element
console.log(statusElement);
const form = document.getElementById("lineStatusForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const lineId = document.getElementById("lineId").value;

  fetch(`${API_URL.replace("{ids}", lineId)}`)
    .then((response) => response.json())
    .then((lineStatusData) => {
 const statuses = lineStatusData.lineStatuses.map(status => status.statusSeverityDescription);
 const statusText = statuses.join(", ");

    // Update theelement with pure text
    statusElement.textContent = `Line Status: ${statusText}`;
  })

});
