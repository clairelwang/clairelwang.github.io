// displays the help menu with the exit button
function showPopup() {
    var popup = document.getElementById('help');
    popup.style.display = 'block';

    var closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.classList.add('popup-close-button');
    closeButton.onclick = hidePopup;
    popup.appendChild(closeButton);
}
// help menu helps user to easily navigate through the pages
function hidePopup() {
    var popup = document.getElementById('help');
    popup.style.display = 'none';
}
// refreshes the page to reset any modifications
function setting() {
    window.location.reloadPage();
}
// repeat
function settings() {
    var tables = document.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) {
        tables[i].style.display = 'none';
    }
    var help = document.getElementById("help");
    help.style.display = "block";
    setTimeout(function () {
        for (var i = 0; i < tables.length; i++) {
            tables[i].style.display = '';
        }
    }, 2000);
}
// checks validity of the input field; if invalid, a pop up appears prompting resubmission
// when valid - retrieves name and stores; displays welcome; removes hidden
function submitName(event) {
    var userName = document.getElementById("userName").value;
    if (!userName) {
        window.alert("Please submit your name!");
        return;
    }
    var userName = document.getElementById("userName").value;
    var outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "<h2>Welcome, " + userName + "!</h2>";
    document.querySelector("table").classList.remove("hidden");
}


// allows the addition of a new section with input fields. 
// what if tool 
// analyze 
function addRow() {
    var table = document.querySelector("table");
    if (table) {
        var lastRowIndex = table.rows.length;
        var newRow = table.insertRow(lastRowIndex);

        for (var i = 0; i < 5; i++) { // Changed starting index to 0
            var cell = newRow.insertCell(i);
            cell.innerHTML = '<input type="text">';
            if (i === 1) { // Changed condition to match starting index
                cell.innerHTML = '<input type="number" min="0" max="100">';
            } else if (i === 2) { // Updated condition to 1
                cell.innerHTML = '<input type="number" min="0" max="100" class="semester2">';
            } else if (i === 3 || i === 4) { // Updated condition for checkboxes
                cell.innerHTML = '<input type="checkbox">';
            }
        }
        document.getElementById('defaultRow').style.display = 'none';
    } else {
        console.error("Table not found");
    }
}

window.onload = function () {
    var savedData = localStorage.getItem("inputData");
    if (!savedData) {
        document.getElementById('defaultRow').style.display = 'table-row';
    } else {
        loadInput();
    }
};

// this deletes the last row from the table that the user no longer wants to use; updates
function removerow(table) {
    var userName = document.getElementById("userName").value;
    if (!userName) {
        window.alert("Please submit your name!");
        return;
    }
    var rowCount = table.rows.length;
    if (rowCount > 2) { // Ensure there are more than two rows (including the header row)
        var index = table.rows.length - 1;
        if (index > 1) { // Check if the row being deleted is not the first row
            table.deleteRow(index);
            var data = JSON.parse(localStorage.getItem("inputData")) || [];
            data.splice(-1, 1);
            localStorage.setItem("inputData", JSON.stringify(data));
        } else {
            alert("You cannot delete the titles.");
        }
    } else {
        alert("You cannot delete the titles or the first row.");
    }
}

function reloadPage() {
    window.location.reload();
}

window.addEventListener('beforeunload', function () {
    save();
});

// initializes row data
// loops through each row of the table; each row's input is saved securly. pushes row data into row data arra
// once processed saves rowdata array into local storage a sa json string using localStorage
// ensures preservation
function save() {
    const table = document.getElementById("gradeTable");
    const rowsData = [];
    for (let i = 1; i < table.rows.length; i++) { 
        const row = table.rows[i];
        const rowData = [];
        const inputs = row.querySelectorAll("input");
        inputs.forEach(function (input) {
            if (input.type === "checkbox") {
                rowData.push(input.checked); // correctly saves the checkbox state
            } else {
                rowData.push(input.value); // saves the value for other input types
            }
        });
        rowsData.push(rowData);
    }
    localStorage.setItem("inputData", JSON.stringify(rowsData));
}

// displays table with relevence; retreiving previously saved input from local storage
// access previous 
function loadInput() {
    var data = JSON.parse(localStorage.getItem("inputData")) || [];
    let ndata = [];
    for(let i = 1; i < data.length; i++){
        ndata.push(data[i]);
    }data = ndata;
   
    var table = document.getElementById("gradeTable").getElementsByTagName("tbody")[0];

    // Clear the table before loading saved rows
    while (table.rows.length > 2) {
        table.deleteRow(1);
    }

    // Insert saved rows
    data.forEach(function (item) {
        var newRow = table.insertRow();
        newRow.insertCell().innerHTML = '<input type="text" value="' + (item[0] || '') + '">';
        newRow.insertCell().innerHTML = '<input type="number" value="' + (item[1] || '') + '">';
        newRow.insertCell().innerHTML = '<input type="number" value="' + (item[2] || '') + '">';
        newRow.insertCell().innerHTML = '<input type="checkbox" ' + (item[3] ? 'checked' : '') + '>';
        newRow.insertCell().innerHTML = '<input type="checkbox" ' + (item[4] ? 'checked' : '') + '>';
    });
}

window.onload = function () {
    var savedData = localStorage.getItem("inputData");
    if (!savedData) {
        document.getElementById('defaultRow').style.display = 'table-row';
    } else {
        loadInput();
    }
    //loadInput(); // Call loadInput here to ensure it's executed only once
};

window.addEventListener('beforeunload', function () {
    save();
});
// iterates through each row; checking input for each function and stores it to the corresponding variable
function processUserData() {
    var userName = document.getElementById("userName").value;
    var courses = [];

    var table = document.getElementById("gradeTable");
    for (var i = 0; i < table.rows.length; i++) {
        var courseName = table.rows[i].cells[0].querySelector("input").value;
        var gradePercentage = table.rows[i].cells[1].querySelector("input").value;
        var sem2 = table.rows[i].cells[2].querySelector("#g2").value;
        var isKAPAP = table.rows[i].cells[3].querySelector("input").checked;
        var isDual = table.rows[i].cells[4].querySelector("#check2").checked;

        var course = {
            courseName: courseName,
            gradePercentage: gradePercentage,
            sem2: sem2,
            isKAPAP: isKAPAP
        };

        courses.push(course);
    }

    console.log("User: " + userName);
    console.log("Courses:", courses);
}

// initailizes arrays
function calculate() {
    // check if name is submitted
    var userName = document.getElementById("userName").value;
    if (!userName){
        window.alert("Please submit your name first!");
        return;
    }
    var scores1 = [];
    var scores2 = [];
    var courseType = [];
    var courseDual = [];

    var table = document.getElementById("gradeTable");

    for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
        var isEditing = row.classList.contains("editing");
        var isSaving = row.classList.contains("saving");
        
        if (!isEditing && !isSaving) { // Exclude rows being edited or saved
            console.log(row.cells[0].innerHTML)
            var inputElement = row.cells[1].querySelector("input");
            console.log(inputElement)
            if (!inputElement) {
                console.error("Input element not found in cell:", row.cells[0]);
                continue; // skip to the next row if input element is not found
            }
            var gradePercentage1 = parseFloat(inputElement.value);
            
            var inputElement2 = row.cells[2].querySelector("input");
            var gradePercentage2 = parseFloat(inputElement2.value);
            var isKAPAP = row.cells[3].querySelector("input").checked;
            var isDual = row.cells[4].querySelector("input").checked;
    
            scores1.push(gradePercentage1);
            scores2.push(gradePercentage2);
            courseType.push(isKAPAP);
            courseDual.push(isDual);
        }
    }
    var numClasses = -1;
    var sum1 = 0;
    var us = 0;
    for (var i = 0; i <= scores1.length; i++) {
        var grade = scores1[i];
        numClasses++;

        //console.log(grade + " " + courseType[i]);

        if (courseType[i] == true) {
            if (grade >= 89.5) {
                sum1 += 5;
                us+=4;
            } else if (grade >= 79.5) {
                sum1 += 4;
                us+=3;
            } else if (grade >= 69.5) {
                sum1 += 3;
                us+=2;
            }
        } else if (courseDual[i] == true) {
            if (grade >= 89.5) {
                sum1 += 4.5;
                us+=4;
            } else if (grade >= 79.5) {
                sum1 += 3.5;
                us+=3;
            } else if (grade >= 69.5) {
                sum1 += 2.5;
                us+=2; 
            }
        } else {
            if (grade >= 89.5) {
                sum1 += 4;
                us+=4;
            } else if (grade >= 79.5) {
                sum1 += 3;
                us+=3;
            } else if (grade >= 74.5) {
                sum1 += 2;
            } else if (grade >= 69.5) {
                sum1 += 1;
            }
        }
    }
    var gpa1 = sum1 / numClasses;
    console.log(gpa1);
    var un1 = us / numClasses;
    // semester 2
    var sum2 = 0;
    var us2 = 0;
    for (var i = 0; i <= scores2.length; i++) {
        var grade = scores2[i];

        //console.log(grade + " " + courseType[i]);

        if (courseType[i] == true) {
            if (grade >= 89.5) {
                sum2 += 5;
                us2+=4;
            } else if (grade >= 79.5) {
                sum2 += 4;
                us2+=3;
            } else if (grade >= 69.5) {
                sum2 += 3;
                us2+=2;
            }
        } else if (courseDual[i] == true) {
            if (grade >= 89.5) {
                sum2 += 4.5;
                us2+=4;
            } else if (grade >= 79.5) {
                sum2 += 3.5;
                us2+=3;
            } else if (grade >= 69.5) {
                sum2 += 2.5; 
                us2+=2;
            }
        } else {
            if (grade >= 89.5) {
                sum2 += 4;
                us2+=4;
            } else if (grade >= 79.5) {
                sum2 += 3;
                us2+=3;
            } else if (grade >= 74.5) {
                sum2 += 2;
                us2 += 2;
            } else if (grade >= 69.5) {
                sum2 += 1;
                us2 += 1;
            }
        }
    }
    var un2 = us2 / numClasses;
    var gpa2 = sum2 / numClasses;

    console.log("SUM 2 " + sum2);
    console.log("SUM 1 " + sum1);
   
    window.alert(userName + ", your GPA is " + (gpa1+gpa2)/2 + "\n" + userName + ", your unweighted GPA is " + (un1+ un2)/2 );
}
    
    
    /*console.log(sum);
    console.log(numClasses);
    console.log(scores);
    console.log(courseType);
    console.log(gpa);*/

var currentlySpeaking = false; // Track if speech synthesis is currently active
var utterance = null; // Track the current utterance

function toggleAudio() {
    if (currentlySpeaking) {
        stopSpeaking(); // Stop speaking if already speaking
    } else {
        readPageContent(); // Start speaking if not already speaking
    }
}
// iterates through each row and input
// synthesized voice
// accessible 
function readPageContent() {
    var content = '';

    var paragraphs = document.getElementsByTagName('p');
    for (var i = 0; i < paragraphs.length; i++) {
        content += paragraphs[i].innerText + '\n';
    }

    var headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    for (var i = 0; i < headers.length; i++) {
        content += headers[i].innerText + '\n';
    }

    var inputFields = document.querySelectorAll('input[type="text"], input[type="number"]');
    for (var i = 0; i < inputFields.length; i++) {
        content += inputFields[i].value + '\n';
    }

    var synth = window.speechSynthesis;
    utterance = new SpeechSynthesisUtterance(content);

    // Event listeners for speaking and stopping speech
    utterance.onstart = function() {
        currentlySpeaking = true;
    };

    utterance.onend = function() {
        currentlySpeaking = false;
    };

    // Start speaking
    synth.speak(utterance);
}
// halts the reading page content initiated by our previous function; allows users to control the audio playback
function stopSpeaking() {
    window.speechSynthesis.cancel(); // Stop speech synthesis
    currentlySpeaking = false;
    if (utterance) {
        utterance.onstart = null; // Remove event listener for start
        utterance.onend = null; // Remove event listener for end
    }
}

// Other functions...






// Enhance addRow function to optionally skip saving for initial load


    
    /*console.log(sum);
    console.log(numClasses);
    console.log(scores);
    console.log(courseType);
    console.log(gpa);*/

