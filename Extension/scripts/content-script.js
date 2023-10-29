// Blacklists
const DOMAINS = ['youtube.com'];
const WORDS = ['google', 'chrome', 'a', 'an'];
const THRESHOLD = 0;

// Define a function to filter content based on domain and words
function filterContent(domain, content) {
    if (DOMAINS.includes(domain)) {
        return true; // Domain is blacklisted
    }

    const words = content.split(/\s+/);
    const blacklistWordCount = words.filter(word => WORDS.includes(word)).length;
    const wordCount = words.length;
    const percentage = (blacklistWordCount / wordCount) * 100;

    alert(`Blacklist Count: ${blacklistWordCount} Word Count: ${wordCount} Percentage: ${percentage}`);

    return percentage >= THRESHOLD;
}

// Function to check if a domain has been visited and passes the filter
function checkVisitedDomainAndFilter(domain, content, awarenessPreference) {
    chrome.storage.local.get('visitedDomains', function(result) {
        const visitedDomains = result.visitedDomains || [];
        if (awarenessPreference == 'extreme' || !visitedDomains.includes(domain)) {
            if (filterContent(domain, content)) {
                visitedDomains.push(domain);
                chrome.storage.local.set({ 'visitedDomains': visitedDomains }, function() {
                    alert('New domain visited: ' + domain + ' Awareness: ' + awarenessPreference);
                });
            }
        } else {
            alert('Visited domain: ' + domain);
        }
    });
}

alert( window.location );
const currentDomain = window.location.hostname;
const pageContent = document.body.innerText;

chrome.storage.local.get('sti-awareness-extension', function(result) {
    const awarenessPreference = result[ 'sti-awareness-extension' ];

    checkVisitedDomainAndFilter(currentDomain, pageContent, awarenessPreference);
});
