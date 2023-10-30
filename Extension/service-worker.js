// background.js

// Define an alarm name
const alarmName = "clearVisitedDomains";
const INTERVAL = 60;

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    return `${hours}H:${minutes}M:${seconds}S`;
}

// Function to clear visited domains and record the removal time
function clearVisitedDomains() {
    chrome.storage.local.remove('visitedDomains', () => {
        const now = new Date();
        const removalTime = getCurrentTime();
        // Store the removal time in local storage
        chrome.storage.local.set({ 'sti-lastRemoveTime': removalTime }, () => {
            console.log(`Visited domains list cleared at ${removalTime}`);
        });
    });
}

// Create an initial alarm to clear visited domains
chrome.alarms.create(alarmName, { delayInMinutes: INTERVAL });

// Add an event listener for the alarm
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === alarmName) {
        // When the alarm triggers, clear the list of visited domains and record the removal time
        clearVisitedDomains();

        // Schedule the next alarm for 1 hour later
        chrome.alarms.create(alarmName, { delayInMinutes: INTERVAL });
    }
});
