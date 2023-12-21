// This function is called when the user clicks the "Find Station" button.
async function findStation() {
  // We first get the text the user entered in the text area.
  // We convert it to lowercase for case-insensitive matching later.
  const longText = document.getElementById("longText").value.toLowerCase();

  // Before fetching the station list, we show a loading message.
  document.getElementById("loadingStatus").textContent = "Loading station list...";

  // We try to fetch the station list from "stations.txt".
  // This is an asynchronous operation, so we use `await` and `try/catch`.
  try {
    // First, we fetch the file.
    const stationListResponse = await fetch("./stations.txt");

    // If the fetch was successful, we get the text content of the file.
    const stationListText = await stationListResponse.text();

    // Now, we process the station list:
    // 1. Split the text by commas into an array of station names.
    // 2. Trim whitespace around each station name.
    // 3. Convert all station names to lowercase for case-insensitive matching.
    const stationList = stationListText.split(",").map(station => station.trim().toLowerCase());

    // Clear the loading message since the list is fetched.
    document.getElementById("loadingStatus").textContent = "";

    // Now, we search for any station name within the user's long text.
    // The `find` method returns the first matching station, or undefined.
    const foundStation = stationList.find(station => longText.includes(station));

    // We get the element where we'll display the result.
    const resultElement = document.getElementById("result");

    // If a station was found, update the result with its name.
    if (foundStation) {
      resultElement.textContent = "Found station: " + foundStation;
    } else {
      // If no station was found, inform the user.
      resultElement.textContent = "No matching station found in the text.";
    }
  } catch (error) {
    // If there was any error fetching or processing the station list,
    // show an error message and clear the result.
    console.error("Error fetching station list:", error);
    document.getElementById("loadingStatus").textContent = "Error: Could not load station list.";
    document.getElementById("result").textContent = "";
  }
}
