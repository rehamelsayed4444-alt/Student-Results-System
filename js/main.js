// Student Management System

// Array to store students
let studentsList = [];

// Student Class
class Student {

    #grade1;
    #grade2;
    #grade3;
    #attendance;

    constructor(name, grade1, grade2, grade3, attendance) {

        if (!name.trim()) {
            throw new Error("Please enter student name!");
        }

        this.name = name;

        this.grade1 = grade1;
        this.grade2 = grade2;
        this.grade3 = grade3;
        this.attendance = attendance;
    }

    // Setters
    set grade1(value) {
        if (value === "" || !Number.isFinite(value) || value < 0 || value > 100) {
            throw new Error("Grade 1 must be between 0 and 100!");
        }
        this.#grade1 = value;
    }

    set grade2(value) {
        if (value === "" || !Number.isFinite(value) || value < 0 || value > 100) {
            throw new Error("Grade 2 must be between 0 and 100!");
        }
        this.#grade2 = value;
    }

    set grade3(value) {
        if (value === "" || !Number.isFinite(value) || value < 0 || value > 100) {
            throw new Error("Grade 3 must be between 0 and 100!");
        }
        this.#grade3 = value;
    }

    set attendance(value) {
        if (value === "" || !Number.isFinite(value) || value < 0 || value > 100) {
            throw new Error("Attendance must be between 0 and 100!");
        }
        this.#attendance = value;
    }

    // Getters
    get grade1() {
        return this.#grade1;
    }

    get grade2() {
        return this.#grade2;
    }

    get grade3() {
        return this.#grade3;
    }

    get attendance() {
        return this.#attendance;
    }

    // Calculate Average
    getAverage() {
        return (this.#grade1 + this.#grade2 + this.#grade3) / 3;
    }
}

// Get HTML Elements
const studentName = document.getElementById("studentName");
const grade1 = document.getElementById("grade1");
const grade2 = document.getElementById("grade2");
const grade3 = document.getElementById("grade3");
const attendance = document.getElementById("attendance");

const addStudentBtn = document.getElementById("addStudent");
const mercyButton = document.getElementById("mercyButton");

const errorMessage = document.getElementById("errorMessage");
const studentsDisplay = document.getElementById("studentsList");
const report = document.getElementById("report");

// Add Student Button
addStudentBtn.onclick = function () {

    try {

        const student = new Student(
            studentName.value,
            grade1.value === "" ? "" : Number(grade1.value),
            grade2.value === "" ? "" : Number(grade2.value),
            grade3.value === "" ? "" : Number(grade3.value),
            attendance.value === "" ? "" : Number(attendance.value)
        );

        studentsList.push(student);

        errorMessage.textContent = "";

        studentsDisplay.innerHTML = studentsList.map((student, index) => `
            <div class="border rounded p-3 mb-2">
                <strong>${index + 1}. ${student.name}</strong>
                <br>
                Average: ${student.getAverage().toFixed(2)}
            </div>
        `).join("");

        // Clear Inputs
        studentName.value = "";
        grade1.value = "";
        grade2.value = "";
        grade3.value = "";
        attendance.value = "";

        report.innerHTML = "";

    } catch (error) {

        errorMessage.textContent = error.message;

    }
};

// Mercy Committee Button
mercyButton.onclick = function () {

    const strugglingStudents = studentsList.filter(student => {
        const average = student.getAverage();
        return average >= 40 && average <= 49;
    });

    if (strugglingStudents.length === 0) {
        report.innerHTML = `
            <p>There are no struggling students.</p>
        `;
        return;
    }

    // Map: Add 5 mercy marks
    const newAverages = strugglingStudents.map(student => ({
        name: student.name,
        newAverage: student.getAverage() + 5
    }));

    // Reduce: Calculate General Average
    const total = newAverages.reduce((sum, student) => {
        return sum + student.newAverage;
    }, 0);

    const generalAverage = total / newAverages.length;

    // Display Final Report
    report.innerHTML = `
        <h5>Mercy Committee Report</h5>

        <p>
            Number of struggling students:
            ${strugglingStudents.length}
        </p>

        <h6>Students Names:</h6>

        <ul>
            ${newAverages.map(student => `
                <li>
                    ${student.name} -
                    New Average: ${student.newAverage.toFixed(2)}
                </li>
            `).join("")}
        </ul>

        <h5>
            General Average After Mercy:
            ${generalAverage.toFixed(2)}
        </h5>
    `;
};
