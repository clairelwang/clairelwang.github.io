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

function setting() {
    window.location.reloadPage();
}

function reloadPage() {

}

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

function submitName(event) {
    // validity
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

function loadInput() {
    var data = JSON.parse(localStorage.getItem("inputData")) || [];
    var table = document.getElementById("gradeTable").getElementsByTagName("tbody")[0];
    data.forEach(function (item) {
        var newRow = table.insertRow();
        newRow.insertCell().innerHTML = '<input type="text" value="' + (item[0] || '') + '">';
        newRow.insertCell().innerHTML = '<input type="number" value="' + (item[1] || '') + '">';
        newRow.insertCell().innerHTML = '<input type="number" value="' + (item[2] || '') + '">';
        newRow.insertCell().innerHTML = '<input type="checkbox" ' + (item[3] ? 'checked' : '') + '>';
        newRow.insertCell().innerHTML = '<input type="checkbox" ' + (item[4] ? 'checked' : '') + '>';
    });
}

function addRow() {
    var table = document.querySelector("table");
    var firstRow = table.rows[1];
    var newRow = table.insertRow(firstRow.rowIndex + 1);
    for (var i = 0; i < 5; i++) {
        var cell = newRow.insertCell(i);
        cell.innerHTML = '<input type="text">';
        if (i === 1) {
            cell.innerHTML = '<input type="number" min="0" max="100">';
        } else if (i === 2) {
            cell.innerHTML = '<input type="number" min="0" max="100" class="semester2">';
        } else if (i === 3) {
            cell.innerHTML = '<input type="checkbox">';
        } else if (i === 4) {
            cell.innerHTML = '<input type="checkbox" class="dualCredit">';
        }
    }
    document.getElementById('defaultRow').style.display = 'none';
}

window.onload = function () {
    var savedData = localStorage.getItem("inputData");
    if (!savedData) {
        document.getElementById('defaultRow').style.display = 'table-row';
    } else {
        loadInput();
    }
};

function removerow(table) {
    var userName = document.getElementById("userName").value;
    if (!userName) {
        window.alert("Please submit your name!");
        return;
    }
    var index = table.rows.length - 1;
    var rowCount = table.rows.length;
    if (index > 2) {
        table.deleteRow(rowCount - 1);
        var data = JSON.parse(localStorage.getItem("inputData")) || [];
        data.splice(-1, 1);
        localStorage.setItem("inputData", JSON.stringify(data));
    }

}
// repeat
function showPopup() {
    var popup = document.getElementById('help');
    popup.style.display = 'block';

    var closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.classList.add('popup-close-button');
    closeButton.onclick = hidePopup;
    popup.appendChild(closeButton);
}

function reloadPage() {
    window.location.reload();
}

window.addEventListener('beforeunload', function () {
    save();
});

// securely stores;
function save() {
    const table = document.getElementById("gradeTable");
    const rowsData = [];
    for (let i = 1; i < table.rows.length - 1; i++) {
        const row = table.rows[i];
        const rowData = [];
        const inputs = row.querySelectorAll("input");
        inputs.forEach(function (input) {
            if (input.type === "checkbox") {
                rowData.push(input.checked);
            } else {
                rowData.push(input.value);
            }
        });
        rowsData.push(rowData);
    }
    localStorage.setItem("inputData", JSON.stringify(rowsData));
}

window.onload = function () {
    loadInput();
};

window.addEventListener('beforeunload', function () {
    save();
});

function processUserData() {
    var userName = document.getElementById("userName").value;
    var courses = [];

    var table = document.getElementById("gradeTable");
    for (var i = 1; i < table.rows.length - 1; i++) {
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

// what if 
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
    var us1 = [];
    var us2 = [];

    var table = document.getElementById("gradeTable");

    for (var i = 1; i < table.rows.length - 1; i++) {
        var courseName = table.rows[i].cells[0].querySelector("input").value;
           var gradePercentage = table.rows[i].cells[1].querySelector("input").value;
           var sem2 = table.rows[i].cells[2].querySelector("input").value;
           var isKAPAP = table.rows[i].cells[3].querySelector("input").checked;
           var isDual = table.rows[i].cells[4].querySelector("input").checked;

        scores1.push(gradePercentage);
        scores2.push(sem2);3
        courseType.push(isKAPAP);
        courseDual.push(isDual);
    }
    var numClasses = 0;
    var sum1 = 0;
    var us = 0;
    for (var i = 0; i < scores1.length; i++) {
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
        } else if (courseType[i] == true) {
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
    var un1 = us / numClasses;
    // semester 2
    var sum2 = 0;
    var us2 = 0;
    for (var i = 0; i < scores2.length; i++) {
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
        } else if (courseType[i] == true) {
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
   
    window.alert(userName + ", your GPA is " + (gpa1+gpa2)/2 + "\n" + userName + ", your unweighted GPA is " + (un1+ un2)/2 );
}
    
    /*console.log(sum);
    console.log(numClasses);
    console.log(scores);
    console.log(courseType);
    console.log(gpa);*/


// no print
function printTable() {
    var tableContents = document.getElementById("gradeTable").outerHTML;
    var printWindow = window.open('', '_blank');

    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('<link rel="stylesheet" href="app.css" type="text/css">');
    printWindow.document.write('</head><body>');
    printWindow.document.write(tableContents);
    printWindow.document.write('</body></html>');

    printWindow.print();
    printWindow.close();
}
var currentlySpeaking = false; // Track if speech synthesis is currently active
var utterance = null; // Track the current utterance

function toggleAudio() {
    if (currentlySpeaking) {
        stopSpeaking(); // Stop speaking if already speaking
    } else {
        readPageContent(); // Start speaking if not already speaking
    }
}

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
