// Blacklists
const DOMAINS = [ 'www.pornhub.com' ];
const WORDS = [ 'xxx', 'sex' ];
const THRESHOLD = 2;

const HOME_URL = 'https://sti-awareness-project.netlify.app/';

const quizContent = {
    questions: [
        {
            question: "What does STI stand for?",
            choices: [ "Sexually Transmitted Infection", "Sexual Transgression Indicator", "Standard Test Item", "Sexual Transmission Identifier" ],
            correctAnswer: 0
        },
        {
            question: "Which virus is responsible for causing AIDS?",
            choices: [ "Herpes", "Gonorrhea", "HIV", "Syphilis" ],
            correctAnswer: 2
        },
        {
            question: "Which STI is known for causing genital warts and is associated with cancer?",
            choices: [ "Chlamydia", "Gonorrhea", "HPV", "Trichomoniasis" ],
            correctAnswer: 2
        },
        {
            question: "What is the primary function of a condom in sexual health?",
            choices: [ "To prevent pregnancy", "To enhance pleasure", "To reduce the risk of STIs", "To promote intimacy" ],
            correctAnswer: 2
        },
        {
            question: "What is the term for having an STI without experiencing noticeable symptoms?",
            choices: [ "Symptomatic", "Asymptomatic", "Hypersensitive", "Infectious" ],
            correctAnswer: 1
        }
    ]
};

// Define a function to filter content based on domain and words
function filterContent ( domain, content ) {
    if ( DOMAINS.includes( domain ) ) {
        return true; // Domain is blacklisted
    }

    const words = content.split( /\s+/ );
    const blacklistWordCount = words.filter( word => WORDS.includes( word ) ).length;
    const wordCount = words.length;
    const percentage = ( blacklistWordCount / wordCount ) * 100;

    if ( percentage >= THRESHOLD ) {
        alert( `New Harmful Domain: ${ domain } Blacklist Count: ${ blacklistWordCount } Word Count: ${ wordCount } Percentage: ${ percentage }` );
    }

    return percentage >= THRESHOLD;
}

// Function to check if a domain has been visited and passes the filter
function checkVisitedDomainAndFilter ( domain, content, awarenessPreference ) {
    chrome.storage.local.get( 'visitedDomains', function ( result ) {
        const visitedDomains = result.visitedDomains || [];
        if ( awarenessPreference == 'extreme' || !visitedDomains.includes( domain ) ) {
            if ( filterContent( domain, content ) ) {
                showModal();
            }
            visitedDomains.push( domain );
            chrome.storage.local.set( { 'visitedDomains': visitedDomains }, function () {
                console.log( 'New domain visited: ' + domain + ' Awareness: ' + awarenessPreference );
            } );
        }
    } );
}

const currentDomain = window.location.hostname;
const pageContent = document.body.innerText;

chrome.storage.local.get( 'sti-awareness-extension', function ( result ) {
    const awarenessPreference = result[ 'sti-awareness-extension' ];

    checkVisitedDomainAndFilter( currentDomain, pageContent, awarenessPreference );
} );

function shuffleArray ( array ) {
    for ( let i = array.length - 1; i > 0; i-- ) {
        const j = Math.floor( Math.random() * ( i + 1 ) );
        [ array[ i ], array[ j ] ] = [ array[ j ], array[ i ] ];
    }
}

// -----------------------------------------------------------------------------

function showModal () {
    // Create a dialog element
    const dialogElement = document.createElement( 'dialog' );

    // Select three random questions from quizContent
    const selectedQuestions = [ ...quizContent.questions ];
    shuffleArray( selectedQuestions );
    selectedQuestions.length = Math.min( selectedQuestions.length, 3 ); // Ensure at most 3 questions are selected

    // Initialize the current form number
    let currentForm = 1;

    // Create a function to show the current form
    function showForm ( formNumber ) {
        form1.style.display = formNumber === 1 ? 'block' : 'none';
        form2.style.display = formNumber === 2 ? 'block' : 'none';
        form3.style.display = formNumber === 3 ? 'block' : 'none';
        formIndicator.textContent = `Form ${ formNumber }/3`;
    }

    // Create a form element for the first level
    const form1 = document.createElement( 'form' );
    form1.setAttribute( 'required', true ); // Make the form required
    form1.style.padding = '20px'; // Add padding for better appearance

    // Define the content for the first level using HTML
    form1.innerHTML += `
        <h2 style="text-align: center;">The STI Awareness Project</h2>
        <p style="text-align: center;">You are about to view a page with explicit content. Please confirm your age.</p>
        <div style="text-align: center;">
            <div style="display: inline-block;">
                <input type="radio" id="ageYes" name="age" value="yes" required>
                <label for="ageYes" style="margin-right: 10px;">Yes, I am 18 years or older</label>
            </div>
            <div style="display: inline-block;">
                <input type="radio" id="ageNo" name="age" value="no" required>
                <label for="ageNo">No, I am not 18 years or older</label>
            </div>
        </div>
        <button type="submit" style="display: block; margin: 20px auto;" class="btn btn-primary btn-block">Submit</button>
    `;

    form1.innerHTML += `<p style="text-align: center; font-size: 14px;">Learn more by visiting <a href=${ HOME_URL } target="_blank">The STI Awareness Project</a></p>`;

    // Create a form element for the second level (quiz questions)
    const form2 = document.createElement( 'form' );
    form2.style.display = 'none';
    form2.setAttribute( 'required', true ); // Make the form required
    form2.style.padding = '20px'; // Add padding for better appearance
    
    form2.innerHTML += `<h2 style="text-align: center;">The STI Awareness Project</h2>`;
    form2.innerHTML += `<h4 style="text-align: center;">Mini Quiz</h4>`;

    // Append the selected questions dynamically
    selectedQuestions.forEach( ( question, index ) => {
        form2.innerHTML += `
            <h2 style="text-align: center;">Question ${ index + 1 }</h2>
            <p>${ question.question }</p>
            ${ question.choices.map( ( choice, choiceIndex ) => `
                <div>
                    <input type="radio" id="q${ index }c${ choiceIndex }" name="q${ index }" value="${ choiceIndex }" required>
                    <label for="q${ index }c${ choiceIndex }">${ choice }</label>
                </div>
            `).join( '' )
            }
        `;
    } );

    form2.innerHTML += `<p style="text-align: center; font-size: 14px;">Learn more by visiting <a href=${ HOME_URL } target="_blank">The STI Awareness Project</a></p>`;

    // Create a submit button for the second level
    const submitButton2 = document.createElement( 'button' );
    submitButton2.type = 'submit';
    submitButton2.textContent = 'Next';
    submitButton2.style.display = 'block';
    submitButton2.style.margin = '20px auto';
    submitButton2.className = 'btn btn-primary btn-block';

    // Append the form for the second level
    form2.appendChild( submitButton2 );

    // Create a form element for the third level (showing answers and asking for confirmation)
    const form3 = document.createElement( 'form' );
    form3.style.display = 'none';
    form3.setAttribute( 'required', true ); // Make the form required
    form3.style.padding = '20px'; // Add padding for better appearance

    form3.innerHTML += `<h2 style="text-align: center;">The STI Awareness Project</h2>`;
    form3.innerHTML += `<h4 style="text-align: center;">Answers</h4>`;

    // Show correct answers for each question from quizContent
    selectedQuestions.forEach( ( question, index ) => {
        form3.innerHTML += `
            <h2 style="text-align: center;">Question ${ index + 1 }</h2>
            <p>${ question.question }</p>
            <p>Correct Answer: ${ question.choices[ question.correctAnswer ] }</p>
        `;
    } );

    form3.innerHTML += `<p style="text-align: center; font-size: 14px;">Learn more by visiting <a href=${ HOME_URL } target="_blank">The STI Awareness Project</a></p>`;

    // Create a confirmation button for the third level
    const confirmButton = document.createElement( 'button' );
    confirmButton.type = 'button';
    confirmButton.textContent = 'Proceed to Site';
    confirmButton.style.display = 'block';
    confirmButton.style.margin = '20px auto';
    confirmButton.className = 'btn btn-primary btn-block';

    // Append the form for the third level
    form3.appendChild( confirmButton );

    // Create a form indicator for the current form number
    const formIndicator = document.createElement( 'p' );
    formIndicator.style.textAlign = 'center';

    // Append the forms and the form indicator to the dialog
    dialogElement.appendChild( form1 );
    dialogElement.appendChild( form2 );
    dialogElement.appendChild( form3 );
    dialogElement.appendChild( formIndicator );

    // Show the initial form
    showForm( currentForm );

    // Event listener for the first level form submission
    form1.addEventListener( 'submit', function ( event ) {
        event.preventDefault();
        currentForm = 2;
        showForm( currentForm );
    } );

    // Event listener for the second level form submission
    form2.addEventListener( 'submit', function ( event ) {
        event.preventDefault();
        currentForm = 3;
        showForm( currentForm );
    } );

    // Event listener for the third level confirmation
    confirmButton.addEventListener( 'click', function () {
        dialogElement.close(); // Close the dialog after confirmation
    } );

    // Append the dialog to the document body
    document.body.appendChild( dialogElement );

    // Show the dialog as a modal
    dialogElement.showModal();
}
