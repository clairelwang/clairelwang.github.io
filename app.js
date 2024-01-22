function submitName(event) {
    var userName = document.getElementById("userName").value;
    if (!userName){
        window.alert("Please submit your name!");
        return;
    }
    var userName = document.getElementById("userName").value;
    var outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "<h2>Welcome, " + userName + "!</h2>";

    document.querySelector("table").classList.remove("hidden");   
}
function addRow() {
    var table = document.querySelector("table");
    var newRow = table.insertRow(table.rows.length - 1);

    for (var i = 0; i < 5; i++) {
        var cell = newRow.insertCell(i);
        cell.innerHTML = '<input type="text">';
        if (i === 1) {
            cell.innerHTML = '<input type="number" min="0" max="100">';
        }else if(i === 2){
            cell.innerHTML = '<input type="number" min="0" max="100" class="semester2">';
        } else if (i === 3) {
            cell.innerHTML = '<input type="checkbox">';
        }
        else if (i === 4){
            cell.innerHTML = '<input type="checkbox" class="dualCredit">';
        }
    }
}
function processUserData() {
    var userName = document.getElementById("userName").value;
    var courses = [];

       // iterate through the rows 
       var table = document.getElementById("gradeTable");
       for (var i = 1; i < table.rows.length - 1; i++) {
           var courseName = table.rows[i].cells[0].querySelector("input").value;
           var gradePercentage = table.rows[i].cells[1].querySelector("input").value;
           var sem2 = table.rows[i].cells[2].querySelector("#g2").value;
           var isKAPAP = table.rows[i].cells[3].querySelector("input").checked;
           var isDual = table.rows[i].cells[4].querySelector("#check2").checked;
           
   
           //  object for each cours
           var course = {
               courseName: courseName,
               gradePercentage: gradePercentage,
               sem2 : sem2,
               isKAPAP: isKAPAP
           };
   
           courses.push(course);
       }
   
       // Display 
       console.log("User: " + userName);
       console.log("Courses:", courses);
   }
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

    for (var i = 1; i < table.rows.length - 1; i++) {
        var courseName = table.rows[i].cells[0].querySelector("input").value;
           var gradePercentage = table.rows[i].cells[1].querySelector("input").value;
           var sem2 = table.rows[i].cells[2].querySelector("input").value;
           var isKAPAP = table.rows[i].cells[3].querySelector("input").checked;
           var isDual = table.rows[i].cells[4].querySelector("input").checked;

        scores1.push(gradePercentage);
        scores2.push(sem2);
        courseType.push(isKAPAP);
        courseDual.push(isDual);
    }
    var numClasses = 0;
    var sum1 = 0;
    for (var i = 0; i < scores1.length; i++) {
        var grade = scores1[i];
        numClasses++;

        //console.log(grade + " " + courseType[i]);

        if (courseType[i] == true) {
            if (grade >= 89.5) {
                sum1 += 5;
            } else if (grade >= 79.5) {
                sum1 += 4;
            } else if (grade >= 69.5) {
                sum1 += 3;
            }
        } else if (courseDual[i] == true) {
            if (grade >= 89.5) {
                sum1 += 4.5;
            } else if (grade >= 79.5) {
                sum1 += 3.5;
            } else if (grade >= 69.5) {
                sum1 += 2.5; 
            }
        } else {
            if (grade >= 89.5) {
                sum1 += 4;
            } else if (grade >= 79.5) {
                sum1 += 3;
            } else if (grade >= 74.5) {
                sum1 += 2;
            } else if (grade >= 69.5) {
                sum1 += 1;
            }
        }
    }
    var gpa1 = sum1 / numClasses;

    // semester 2
    var sum2 = 0;
    for (var i = 0; i < scores2.length; i++) {
        var grade = scores2[i];

        //console.log(grade + " " + courseType[i]);

        if (courseType[i] == true) {
            if (grade >= 89.5) {
                sum2 += 5;
            } else if (grade >= 79.5) {
                sum2 += 4;
            } else if (grade >= 69.5) {
                sum2 += 3;
            }
        } else if (courseDual[i] == true) {
            if (grade >= 89.5) {
                sum2 += 4.5;
            } else if (grade >= 79.5) {
                sum2 += 3.5;
            } else if (grade >= 69.5) {
                sum2 += 2.5; 
            }
        } else {
            if (grade >= 89.5) {
                sum2 += 4;
            } else if (grade >= 79.5) {
                sum2 += 3;
            } else if (grade >= 74.5) {
                sum2 += 2;
            } else if (grade >= 69.5) {
                sum2 += 1;
            }
        }
    }
    var gpa2 = sum2 / numClasses;
   
    window.alert(userName + ", your GPA is " + (gpa1+gpa2)/2);
}
    
    /*console.log(sum);
    console.log(numClasses);
    console.log(scores);
    console.log(courseType);
    console.log(gpa);*/
