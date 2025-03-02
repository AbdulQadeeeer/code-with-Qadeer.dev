const schoolSystem = [
    {
        teachers: [],
        students: [],
        courses: [],
    }
];

// Add Teacher
function addNewTeacher() {
    let teacherName = prompt("Enter Teacher's Name:");
    let dob = prompt("Enter Teacher's DOB (YYYY-MM-DD):");
    let salary = prompt("Enter Teacher's Salary:");
    let qualification = prompt("Enter Qualification:");
    let newTeacher = { name: teacherName, dob: dob, salary: salary, qualification: qualification };
    schoolSystem[0].teachers.push(newTeacher);
    alert(`${teacherName} added as a new Teacher`);
    showTeacher();
}

// Show Teachers
function showTeacher() {
    let teachers = schoolSystem[0].teachers;
    let table = document.createElement("table");
    
    table.innerHTML = `
      <tr class="bg-primary">
        <th>Name</th>
        <th>DOB</th>
        <th>Qualification</th>
        <th>Salary</th>
      </tr>
      ${teachers.map(teacher => `
        <tr>
          <td>${teacher.name}</td>
          <td>${teacher.dob}</td>
          <td>${teacher.qualification}</td>
          <td>${teacher.salary}</td>
        </tr>`).join('')}
    `;
    document.getElementById("showTeacher").appendChild(table);
}

// Add Student
function addNewStudent() {
    let studentName = prompt("Enter Student's Name:");
    let dob = prompt("Enter Student's DOB (YYYY-MM-DD):");
    let course = prompt("Enroll in Course:");
    let fee = prompt("Enter Fee:");
    let newStudent = { name: studentName, dob: dob, enrolledCourse: course, fee: fee };
    schoolSystem[0].students.push(newStudent);
    alert(`${studentName} added as a new Student`);
}

// Show Students
function showStudents() {
    let students = schoolSystem[0].students;
    let table = document.createElement("table");
    table.innerHTML = `
      <tr class="bg-primary">
        <th>Name</th>
        <th>DOB</th>
        <th>Enrolled Course</th>
        <th>Fee</th>
      </tr>
      ${students.map(student => `
        <tr>
          <td>${student.name}</td>
          <td>${student.dob}</td>
          <td>${student.enrolledCourse}</td>
          <td>${student.fee}</td>
        </tr>`).join('')}
    `;
    document.getElementById("showStudents").appendChild(table);
}

// Add Course
function addNewCourse() {
    let courseTitle = prompt("Enter Course Title:");
    let courseDuration = prompt("Enter Course Duration:");
    let courseFee = prompt("Enter Course Fee:");
    let newCourse = { course_title: courseTitle, course_duration: courseDuration, course_fee: courseFee };
    schoolSystem[0].courses.push(newCourse);
    alert(`${courseTitle} added as a new Course`);
}

// Show Courses
function showCourses() {
    let courses = schoolSystem[0].courses;
    let table = document.createElement("table");
    table.innerHTML = `
      <tr class="bg-primary">
        <th>Course Title</th>
        <th>Duration</th>
        <th>Fee</th>
      </tr>
      ${courses.map(course => `
        <tr>
          <td>${course.course_title}</td>
          <td>${course.course_duration}</td>
          <td>${course.course_fee}</td>
        </tr>`).join('')}
    `;
    document.getElementById("showCourses").appendChild(table);
}

// Update Teacher
function updateTeacher() {
    let oldName = prompt("Enter Teacher's Name to Update:");
    let teacher = schoolSystem[0].teachers.find(t => t.name === oldName);
    if (teacher) {
        teacher.name = prompt("Enter New Name:");
        teacher.dob = prompt("Enter New DOB:");
        teacher.salary = prompt("Enter New Salary:");
        teacher.qualification = prompt("Enter New Qualification:");
        alert(`${teacher.name} is updated`);
    } else {
        alert('Teacher not found');
    }
}

// Remove Teacher
function removeTeacher() {
    let name = prompt("Enter Teacher's Name to Remove:");
    schoolSystem[0].teachers = schoolSystem[0].teachers.filter(t => t.name !== name);
    alert(`${name} is removed`);
}

// Repeat similar logic for students and courses
// Update and remove students/courses functions here...
