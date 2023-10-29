// Get the dropdown element and save button
const awarenessModeDropdown = document.getElementById( 'awareness-mode' );
const saveButton = document.getElementById( 'save-button' );

// Get the removal time element
const removalTimeElement = document.getElementById( 'removal-time' );

// Load the currently saved awareness mode (if any)
chrome.storage.local.get( 'sti-awareness-extension', function ( result ) {
    if ( !chrome.runtime.lastError ) {
        const savedMode = result[ 'sti-awareness-extension' ];
        if ( savedMode ) {
            awarenessModeDropdown.value = savedMode;
        }
    }
} );

// Load and display the removal time
chrome.storage.local.get( 'sti-lastRemoveTime', function ( result ) {
    if ( !chrome.runtime.lastError ) {
        const lastRemoveTime = result[ 'sti-lastRemoveTime' ];
        if ( lastRemoveTime ) {
            removalTimeElement.textContent = `Last History Reset Time: ${ lastRemoveTime }`;
        }
    }
} );

// Event listener for the save button
saveButton.addEventListener( 'click', function () {
    const selectedMode = awarenessModeDropdown.value;

    console.log( "Clicked" );

    // Save the selected mode to local storage
    chrome.storage.local.set( { 'sti-awareness-extension': selectedMode }, function () {
        if ( !chrome.runtime.lastError ) {
            console.log( 'Awareness mode saved: ' + selectedMode );
        } else {
            console.error( 'Error saving awareness mode: ' + chrome.runtime.lastError );
        }
    } );

    // Hide the popup HTML by setting its display to "none"
    window.close();
} );
