// ```javascript
// /* =========================================================
//    CAMPUSCONNECT USER / STUDENT DASHBOARD
// ========================================================= */


// /* =========================================================
//    SAMPLE USER DATA
//    Later this can come from your backend/database.
// ========================================================= */

// const currentUser = {
//     name: "Student",
//     rollNo: "CS2201",
//     email: "student@campusconnect.com",
//     department: "Computer Science",
//     year: "3rd Year"
// };


// /* =========================================================
//    SAMPLE EVENT DATA
// ========================================================= */

// const events = [

//     {
//         id: 1,
//         name: "Tech Fest 2026 - Day 1",
//         category: "Technical",
//         date: "15 March 2026",
//         time: "10:00 AM - 6:00 PM",
//         venue: "Main Auditorium, Room 102",
//         status: "ongoing",
//         registered: true,
//         attendance: false
//     },

//     {
//         id: 2,
//         name: "Cultural Night",
//         category: "Cultural",
//         date: "15 August 2026",
//         time: "5:30 PM - 9:30 PM",
//         venue: "Open Air Amphitheatre",
//         status: "upcoming",
//         registered: true,
//         attendance: false
//     },

//     {
//         id: 3,
//         name: "Startup Pitch Meetup",
//         category: "Workshop",
//         date: "22 August 2026",
//         time: "2:00 PM - 5:00 PM",
//         venue: "Seminar Hall 2",
//         status: "upcoming",
//         registered: false,
//         attendance: false
//     },

//     {
//         id: 4,
//         name: "Bot Wars Championship",
//         category: "Technical",
//         date: "10 February 2026",
//         time: "11:00 AM - 3:00 PM",
//         venue: "Engineering Block, Lab 4",
//         status: "ended",
//         registered: true,
//         attendance: true
//     },

//     {
//         id: 5,
//         name: "Poetry Slam Night",
//         category: "Cultural",
//         date: "28 January 2026",
//         time: "6:00 PM - 8:00 PM",
//         venue: "Central Library Hall",
//         status: "ended",
//         registered: true,
//         attendance: true
//     },

//     {
//         id: 6,
//         name: "Coding Bootcamp",
//         category: "Workshop",
//         date: "05 January 2026",
//         time: "10:00 AM - 4:00 PM",
//         venue: "Computer Lab 3",
//         status: "ended",
//         registered: true,
//         attendance: true
//     }

// ];


// /* =========================================================
//    INITIALIZATION
// ========================================================= */

// document.addEventListener("DOMContentLoaded", function () {

//     loadUserProfile();

//     updateStatistics();

// });


// /* =========================================================
//    SIDEBAR FUNCTIONS
// ========================================================= */

// function expandSidebar() {
//     // CSS handles expansion.
// }

// function collapseSidebar() {
//     // CSS handles collapse.
// }


// /* =========================================================
//    USER PROFILE
// ========================================================= */

// function loadUserProfile() {

//     const storedName =
//         localStorage.getItem("studentName");

//     if (storedName) {
//         currentUser.name = storedName;
//     }

//     const avatar =
//         document.getElementById("navAvatar");

//     const name =
//         document.getElementById("navUserName");

//     if (avatar) {

//         avatar.innerText =
//             currentUser.name
//                 .charAt(0)
//                 .toUpperCase();

//     }

//     if (name) {

//         name.innerText =
//             currentUser.name;

//     }

// }


// /* =========================================================
//    LOGOUT
// ========================================================= */

// function logoutUser(event) {

//     if (event) {
//         event.preventDefault();
//     }

//     localStorage.removeItem("campusConnectAdminAuth");

//     localStorage.removeItem("userRole");

//     localStorage.removeItem("studentName");

//     window.location.href = "home.html";

// }


// /* =========================================================
//    STATISTICS
// ========================================================= */

// function updateStatistics() {

//     const registered =
//         events.filter(event => event.registered);

//     const past =
//         registered.filter(
//             event => event.status === "ended"
//         );

//     const upcoming =
//         registered.filter(
//             event => event.status === "upcoming"
//         );

//     const ongoing =
//         registered.filter(
//             event => event.status === "ongoing"
//         );

//     const registeredElement =
//         document.getElementById("registeredCount");

//     const pastElement =
//         document.getElementById("pastCount");

//     const upcomingElement =
//         document.getElementById("upcomingCount");

//     const ongoingElement =
//         document.getElementById("ongoingCount");

//     if (registeredElement)
//         registeredElement.innerText =
//             registered.length;

//     if (pastElement)
//         pastElement.innerText =
//             past.length;

//     if (upcomingElement)
//         upcomingElement.innerText =
//             upcoming.length;

//     if (ongoingElement)
//         ongoingElement.innerText =
//             ongoing.length;

// }


// /* =========================================================
//    VIEW SWITCHING
// ========================================================= */

// function switchView(viewName, element) {

//     const dashboardView =
//         document.getElementById("view-dashboard");

//     const contentContainer =
//         document.getElementById("view-content-container");

//     const contentTitle =
//         document.getElementById("content-title");

//     const contentBody =
//         document.getElementById("content-body");


//     /* Remove active sidebar state */

//     document.querySelectorAll(".sidebar-menu a")
//         .forEach(link => {

//             link.classList.remove("active");

//         });


//     /* Add active state */

//     if (element) {

//         element.classList.add("active");

//     } else {

//         const matchingLink =
//             [...document.querySelectorAll(".sidebar-menu a")]
//                 .find(link =>
//                     link.getAttribute("onclick") &&
//                     link.getAttribute("onclick")
//                         .includes("'" + viewName + "'")
//                 );

//         if (matchingLink) {

//             matchingLink.classList.add("active");

//         }

//     }


//     /* Dashboard */

//     if (viewName === "dashboard") {

//         dashboardView.style.display =
//             "block";

//         contentContainer.style.display =
//             "none";

//         return;

//     }


//     dashboardView.style.display =
//         "none";

//     contentContainer.style.display =
//         "block";


//     switch (viewName) {

//         case "myEvents":

//             contentTitle.innerText =
//                 "My Registered Events";

//             contentBody.innerHTML =
//                 generateMyEvents();

//             break;


//         case "upcoming":

//             contentTitle.innerText =
//                 "Upcoming Events";

//             contentBody.innerHTML =
//                 generateUpcomingEvents();

//             break;


//         case "ongoing":

//             contentTitle.innerText =
//                 "Ongoing Events";

//             contentBody.innerHTML =
//                 generateOngoingEvents();

//             break;


//         case "register":

//             contentTitle.innerText =
//                 "Register for an Event";

//             contentBody.innerHTML =
//                 generateRegistrationView();

//             break;


//         case "attendance":

//             contentTitle.innerText =
//                 "Scan QR for Attendance";

//             contentBody.innerHTML =
//                 generateAttendanceView();

//             break;


//         case "feedback":

//             contentTitle.innerText =
//                 "Event Feedback";

//             contentBody.innerHTML =
//                 generateFeedbackView();

//             break;


//         case "help":

//             contentTitle.innerText =
//                 "Help Centre";

//             contentBody.innerHTML =
//                 generateHelpView();

//             break;

//     }

// }


// /* =========================================================
//    MY EVENTS
// ========================================================= */

// function generateMyEvents() {

//     const registeredEvents =
//         events.filter(event => event.registered);


//     if (registeredEvents.length === 0) {

//         return `
//             <div class="empty-state">
//                 <i class="bi bi-calendar-x"></i>
//                 <h3>No Registered Events</h3>
//                 <p>You have not registered for any event yet.</p>
//             </div>
//         `;

//     }


//     let rows = "";


//     registeredEvents.forEach(event => {

//         let statusHTML = "";

//         if (event.status === "ongoing") {

//             statusHTML =
//                 `<span class="status-pill status-live">Ongoing</span>`;

//         } else if (event.status === "upcoming") {

//             statusHTML =
//                 `<span class="status-pill status-upcoming">Upcoming</span>`;

//         } else {

//             statusHTML =
//                 `<span class="status-pill status-ended">Completed</span>`;

//         }


//         let attendanceHTML =
//             event.attendance

//                 ? `<span class="status-pill status-present">
//                         Present
//                    </span>`

//                 : event.status === "ended"

//                     ? `<span class="status-pill status-absent">
//                             Not Marked
//                        </span>`

//                     : `<span class="status-pill status-registered">
//                             Pending
//                        </span>`;


//         rows += `

//             <tr>

//                 <td>
//                     <strong>${event.name}</strong>
//                 </td>

//                 <td>
//                     ${event.category}
//                 </td>

//                 <td>
//                     ${event.date}
//                 </td>

//                 <td>
//                     ${event.time}
//                 </td>

//                 <td>
//                     ${statusHTML}
//                 </td>

//                 <td>
//                     ${attendanceHTML}
//                 </td>

//             </tr>

//         `;

//     });


//     return `

//         <div class="table-responsive">

//             <table>

//                 <thead>

//                     <tr>
//                         <th>Event</th>
//                         <th>Category</th>
//                         <th>Date</th>
//                         <th>Time</th>
//                         <th>Status</th>
//                         <th>Attendance</th>
//                     </tr>

//                 </thead>

//                 <tbody>
//                     ${rows}
//                 </tbody>

//             </table>

//         </div>

//     `;

// }


// /* =========================================================
//    UPCOMING EVENTS
// ========================================================= */

// function generateUpcomingEvents() {

//     const upcomingEvents =
//         events.filter(
//             event => event.status === "upcoming"
//         );


//     return `

//         <div class="filter-bar">

//             <input
//                 type="text"
//                 class="filter-input"
//                 id="eventSearch"
//                 placeholder="Search event..."
//                 oninput="filterUpcomingEvents()"
//             >

//             <select
//                 class="filter-input"
//                 id="categoryFilter"
//                 onchange="filterUpcomingEvents()"
//             >

//                 <option value="all">
//                     All Categories
//                 </option>

//                 <option value="Technical">
//                     Technical
//                 </option>

//                 <option value="Cultural">
//                     Cultural
//                 </option>

//                 <option value="Sports">
//                     Sports
//                 </option>

//                 <option value="Workshop">
//                     Workshop
//                 </option>

//             </select>

//         </div>


//         <div id="upcomingEventsTable">

//             ${createUpcomingTable(upcomingEvents)}

//         </div>

//     `;

// }


// function createUpcomingTable(eventList) {

//     if (eventList.length === 0) {

//         return `

//             <div class="empty-state">

//                 <i class="bi bi-calendar-x"></i>

//                 <h3>
//                     No Events Found
//                 </h3>

//                 <p>
//                     Try changing your search or category.
//                 </p>

//             </div>

//         `;

//     }


//     let rows = "";


//     eventList.forEach(event => {

//         rows += `

//             <tr>

//                 <td>
//                     <strong>
//                         ${event.name}
//                     </strong>
//                 </td>

//                 <td>
//                     ${event.category}
//                 </td>

//                 <td>
//                     ${event.date}
//                 </td>

//                 <td>
//                     ${event.time}
//                 </td>

//                 <td>
//                     ${event.venue}
//                 </td>

//                 <td>

//                     ${
//                         event.registered

//                         ? `<span class="status-pill status-registered">
//                                 Registered
//                            </span>`

//                         : `<button
//                                 class="btn-primary"
//                                 onclick="openRegistration('${event.name}')">
//                                 Register
//                            </button>`
//                     }

//                 </td>

//             </tr>

//         `;

//     });


//     return `

//         <div class="table-responsive">

//             <table>

//                 <thead>

//                     <tr>

//                         <th>Event</th>
//                         <th>Category</th>
//                         <th>Date</th>
//                         <th>Time</th>
//                         <th>Venue</th>
//                         <th>Action</th>

//                     </tr>

//                 </thead>

//                 <tbody>

//                     ${rows}

//                 </tbody>

//             </table>

//         </div>

//     `;

// }


// /* =========================================================
//    FILTER UPCOMING EVENTS
// ========================================================= */

// function filterUpcomingEvents() {

//     const search =
//         document.getElementById("eventSearch")
//             ?.value
//             .toLowerCase() || "";


//     const category =
//         document.getElementById("categoryFilter")
//             ?.value || "all";


//     const filtered =
//         events.filter(event => {

//             if (event.status !== "upcoming") {
//                 return false;
//             }


//             const matchesSearch =
//                 event.name
//                     .toLowerCase()
//                     .includes(search);


//             const matchesCategory =
//                 category === "all" ||
//                 event.category === category;


//             return matchesSearch &&
//                 matchesCategory;

//         });


//     const container =
//         document.getElementById(
//             "upcomingEventsTable"
//         );


//     if (container) {

//         container.innerHTML =
//             createUpcomingTable(filtered);

//     }

// }


// /* =========================================================
//    ONGOING EVENTS
// ========================================================= */

// function generateOngoingEvents() {

//     const ongoing =
//         events.filter(
//             event => event.status === "ongoing"
//         );


//     if (ongoing.length === 0) {

//         return `

//             <div class="empty-state">

//                 <i class="bi bi-broadcast"></i>

//                 <h3>
//                     No Ongoing Events
//                 </h3>

//                 <p>
//                     You currently have no registered event happening.
//                 </p>

//             </div>

//         `;

//     }


//     let rows = "";


//     ongoing.forEach(event => {

//         rows += `

//             <tr>

//                 <td>
//                     <strong>
//                         ${event.name}
//                     </strong>
//                 </td>

//                 <td>
//                     ${event.date}
//                 </td>

//                 <td>
//                     ${event.time}
//                 </td>

//                 <td>
//                     ${event.venue}
//                 </td>

//                 <td>

//                     <span class="status-pill status-live">
//                         Ongoing
//                     </span>

//                 </td>

//                 <td>

//                     ${
//                         event.attendance

//                         ? `<span class="status-pill status-present">
//                                 Attendance Marked
//                            </span>`

//                         : `<button
//                                 class="btn-primary"
//                                 onclick="switchView('attendance')">
//                                 Scan Attendance
//                            </button>`
//                     }

//                 </td>

//             </tr>

//         `;

//     });


//     return `

//         <div class="info-box">

//             <strong>
//                 Attendance Reminder:
//             </strong>

//             If the Coordinator is displaying the event QR code,
//             scan it to mark your attendance.

//         </div>


//         <div class="table-responsive">

//             <table>

//                 <thead>

//                     <tr>

//                         <th>Event</th>
//                         <th>Date</th>
//                         <th>Time</th>
//                         <th>Venue</th>
//                         <th>Status</th>
//                         <th>Attendance</th>

//                     </tr>

//                 </thead>

//                 <tbody>

//                     ${rows}

//                 </tbody>

//             </table>

//         </div>

//     `;

// }


// /* =========================================================
//    REGISTER EVENT
// ========================================================= */

// function generateRegistrationView(selectedEvent = "") {

//     return `

//         <div class="info-box">

//             <strong>
//                 Event Registration
//             </strong>

//             <br>

//             Fill in your details to register for an upcoming event.

//         </div>


//         <form
//             onsubmit="submitEventRegistration(event)"
//         >

//             <div class="form-grid">

//                 <div class="form-field">

//                     <label>
//                         Select Event
//                     </label>

//                     <select
//                         id="registrationEvent"
//                         required
//                     >

//                         <option value="">
//                             Choose an event...
//                         </option>

//                         <option
//                             value="Cultural Night"
//                             ${selectedEvent === "Cultural Night" ? "selected" : ""}
//                         >
//                             Cultural Night
//                         </option>

//                         <option
//                             value="Startup Pitch Meetup"
//                             ${selectedEvent === "Startup Pitch Meetup" ? "selected" : ""}
//                         >
//                             Startup Pitch Meetup
//                         </option>

//                     </select>

//                 </div>


//                 <div class="form-field">

//                     <label>
//                         Student Name
//                     </label>

//                     <input
//                         type="text"
//                         id="studentName"
//                         value="${currentUser.name}"
//                         required
//                     >

//                 </div>


//                 <div class="form-field">

//                     <label>
//                         Roll Number
//                     </label>

//                     <input
//                         type="text"
//                         id="rollNumber"
//                         value="${currentUser.rollNo}"
//                         required
//                     >

//                 </div>


//                 <div class="form-field">

//                     <label>
//                         Email Address
//                     </label>

//                     <input
//                         type="email"
//                         id="studentEmail"
//                         value="${currentUser.email}"
//                         required
//                     >

//                 </div>


//                 <div class="form-field">

//                     <label>
//                         Department
//                     </label>

//                     <select id="department">

//                         <option>
//                             Computer Science
//                         </option>

//                         <option>
//                             Information Technology
//                         </option>

//                         <option>
//                             Electronics
//                         </option>

//                         <option>
//                             Mechanical
//                         </option>

//                         <option>
//                             Management
//                         </option>

//                     </select>

//                 </div>


//                 <div class="form-field">

//                     <label>
//                         Year / Semester
//                     </label>

//                     <select id="year">

//                         <option>
//                             1st Year
//                         </option>

//                         <option>
//                             2nd Year
//                         </option>

//                         <option selected>
//                             3rd Year
//                         </option>

//                         <option>
//                             4th Year
//                         </option>

//                     </select>

//                 </div>


//                 <div class="form-field">

//                     <label>
//                         Contact Number
//                     </label>

//                     <input
//                         type="tel"
//                         id="contactNumber"
//                         placeholder="Enter contact number"
//                         required
//                     >

//                 </div>


//                 <div class="form-field">

//                     <label>
//                         Participation Type
//                     </label>

//                     <select id="participationType">

//                         <option>
//                             Participant
//                         </option>

//                         <option>
//                             Volunteer
//                         </option>

//                         <option>
//                             Audience
//                         </option>

//                     </select>

//                 </div>

//             </div>


//             <div class="form-actions">

//                 <button
//                     type="submit"
//                     class="btn-primary"
//                 >
//                     Register for Event
//                 </button>

//                 <button
//                     type="reset"
//                     class="btn-secondary"
//                 >
//                     Clear
//                 </button>

//             </div>

//         </form>

//     `;

// }


// /* =========================================================
//    OPEN REGISTRATION WITH EVENT SELECTED
// ========================================================= */

// function openRegistration(eventName) {

//     switchView("register");


//     setTimeout(() => {

//         const select =
//             document.getElementById(
//                 "registrationEvent"
//             );


//         if (select) {

//             select.value =
//                 eventName;

//         }

//     }, 50);

// }


// /* =========================================================
//    SUBMIT EVENT REGISTRATION
// ========================================================= */

// function submitEventRegistration(event) {

//     event.preventDefault();


//     const eventName =
//         document.getElementById(
//             "registrationEvent"
//         ).value;


//     if (!eventName) {

//         alert(
//             "Please select an event."
//         );

//         return;

//     }


//     const selectedEvent =
//         events.find(
//             event => event.name === eventName
//         );


//     if (selectedEvent) {

//         selectedEvent.registered =
//             true;

//     }


//     updateStatistics();


//     document.getElementById(
//         "content-body"
//     ).innerHTML = `

//         <div class="success-box">

//             <strong>
//                 Registration Successful!
//             </strong>

//             <br><br>

//             You have successfully registered for
//             <strong>${eventName}</strong>.

//             <br>

//             Your registration has been recorded.

//         </div>


//         <button
//             class="btn-primary"
//             onclick="switchView('myEvents')"
//         >
//             View My Events
//         </button>

//     `;

// }


// /* =========================================================
//    QR ATTENDANCE VIEW
// ========================================================= */

// function generateAttendanceView() {

//     return `

//         <div class="info-box">

//             <strong>
//                 Digital Attendance
//             </strong>

//             <br>

//             Ask the Coordinator to display the QR code
//             for the ongoing event and scan it using the camera below.

//         </div>


//         <div class="attendance-layout">


//             <div class="scanner-card">

//                 <h3>
//                     <i class="bi bi-qr-code-scan"></i>
//                     Scan Event QR
//                 </h3>

//                 <p>
//                     Allow camera access and point your camera
//                     towards the Coordinator's QR code.
//                 </p>


//                 <div id="qr-reader"></div>


//                 <div class="scanner-actions">

//                     <button
//                         class="btn-primary"
//                         onclick="startQRScanner()"
//                     >
//                         <i class="bi bi-camera"></i>
//                         Start Scanner
//                     </button>

//                     <button
//                         class="btn-secondary"
//                         onclick="stopQRScanner()"
//                     >
//                         Stop Scanner
//                     </button>

//                 </div>


//                 <div
//                     id="scanStatus"
//                     class="scan-status"
//                 >
//                     Scanner is ready.
//                 </div>

//             </div>


//             <div class="attendance-info">

//                 <h3>
//                     How to Mark Attendance
//                 </h3>

//                 <ul>

//                     <li>
//                         Attend the event at the specified venue.
//                     </li>

//                     <li>
//                         Ask the Coordinator to display the
//                         event attendance QR code.
//                     </li>

//                     <li>
//                         Click "Start Scanner".
//                     </li>

//                     <li>
//                         Allow camera permission when requested.
//                     </li>

//                     <li>
//                         Point your camera at the QR code.
//                     </li>

//                     <li>
//                         After successful scanning, attendance
//                         will be marked for the event.
//                     </li>

//                 </ul>

//                 <div class="info-box">

//                     <strong>
//                         Important:
//                     </strong>

//                     Only scan the QR code displayed by the
//                     authorized event Coordinator.

//                 </div>

//             </div>

//         </div>

//     `;

// }


// /* =========================================================
//    QR SCANNER
// ========================================================= */

// let qrScanner = null;

// let scannerRunning = false;


// function startQRScanner() {

//     const status =
//         document.getElementById(
//             "scanStatus"
//         );


//     if (!window.Html5Qrcode) {

//         if (status) {

//             status.className =
//                 "scan-status scan-error";

//             status.innerText =
//                 "QR scanner library could not be loaded.";

//         }

//         return;

//     }


//     if (scannerRunning) {

//         return;

//     }


//     qrScanner =
//         new Html5Qrcode(
//             "qr-reader"
//         );


//     const config = {

//         fps: 10,

//         qrbox: {
//             width: 250,
//             height: 250
//         }

//     };


//     qrScanner
//         .start(

//             {
//                 facingMode: "environment"
//             },

//             config,

//             qrCodeMessage => {

//                 handleQRScan(
//                     qrCodeMessage
//                 );

//             },

//             errorMessage => {

//                 // Ignore continuous scan errors.

//             }

//         )
//         .then(() => {

//             scannerRunning = true;

//             if (status) {

//                 status.className =
//                     "scan-status";

//                 status.innerText =
//                     "Camera is active. Point it at the event QR code.";

//             }

//         })
//         .catch(error => {

//             console.error(
//                 "Camera error:",
//                 error
//             );


//             if (status) {

//                 status.className =
//                     "scan-status scan-error";

//                 status.innerText =
//                     "Unable to access the camera. Please allow camera permission.";

//             }

//         });

// }


// /* =========================================================
//    STOP QR SCANNER
// ========================================================= */

// function stopQRScanner() {

//     if (!qrScanner ||
//         !scannerRunning) {

//         return;

//     }


//     qrScanner
//         .stop()
//         .then(() => {

//             scannerRunning = false;

//             qrScanner.clear();


//             const status =
//                 document.getElementById(
//                     "scanStatus"
//                 );


//             if (status) {

//                 status.className =
//                     "scan-status";

//                 status.innerText =
//                     "Scanner stopped.";

//             }

//         })
//         .catch(error => {

//             console.error(
//                 error
//             );

//         });

// }


// /* =========================================================
//    HANDLE QR SCAN
// ========================================================= */

// function handleQRScan(qrMessage) {

//     console.log(
//         "Scanned QR:",
//         qrMessage
//     );


//     stopQRScanner();


//     /*
//         DEMO LOGIC

//         For now any valid QR scan marks the
//         current ongoing event as attended.

//         Later replace this with:

//         1. Send QR/event ID to backend.
//         2. Verify student registration.
//         3. Verify QR is valid and active.
//         4. Store attendance in MySQL.
//     */


//     const ongoingEvent =
//         events.find(
//             event =>
//                 event.status === "ongoing" &&
//                 event.registered
//         );


//     const status =
//         document.getElementById(
//             "scanStatus"
//         );


//     if (!ongoingEvent) {

//         if (status) {

//             status.className =
//                 "scan-status scan-error";

//             status.innerText =
//                 "No registered ongoing event was found.";

//         }

//         return;

//     }


//     ongoingEvent.attendance =
//         true;


//     if (status) {

//         status.className =
//             "scan-status scan-success";

//         status.innerHTML = `

//             <strong>
//                 <i class="bi bi-check-circle"></i>
//                 Attendance Marked Successfully!
//             </strong>

//             <br><br>

//             Event:
//             <strong>
//                 ${ongoingEvent.name}
//             </strong>

//         `;

//     }

// }


// /* =========================================================
//    FEEDBACK VIEW
// ========================================================= */

// function generateFeedbackView() {

//     const completedEvents =
//         events.filter(
//             event =>
//                 event.status === "ended" &&
//                 event.registered
//         );


//     let eventOptions = "";


//     completedEvents.forEach(event => {

//         eventOptions += `

//             <option value="${event.name}">
//                 ${event.name}
//             </option>

//         `;

//     });


//     return `

//         <div class="info-box">

//             Share your experience after attending an event.
//             Your feedback helps improve future events.

//         </div>


//         <form
//             onsubmit="submitFeedback(event)"
//         >

//             <div class="form-grid">


//                 <div class="form-field">

//                     <label>
//                         Select Event
//                     </label>

//                     <select
//                         id="feedbackEvent"
//                         required
//                     >

//                         <option value="">
//                             Select an event...
//                         </option>

//                         ${eventOptions}

//                     </select>

//                 </div>


//                 <div class="form-field">

//                     <label>
//                         Student Name
//                     </label>

//                     <input
//                         type="text"
//                         value="${currentUser.name}"
//                         readonly
//                     >

//                 </div>


//                 <div class="form-field full">

//                     <label>
//                         Your Rating
//                     </label>

//                     <div
//                         class="star-rating"
//                         id="starRating"
//                     >

//                         <i
//                             class="bi bi-star"
//                             data-rating="1"
//                             onclick="selectRating(1)"
//                         ></i>

//                         <i
//                             class="bi bi-star"
//                             data-rating="2"
//                             onclick="selectRating(2)"
//                         ></i>

//                         <i
//                             class="bi bi-star"
//                             data-rating="3"
//                             onclick="selectRating(3)"
//                         ></i>

//                         <i
//                             class="bi bi-star"
//                             data-rating="4"
//                             onclick="selectRating(4)"
//                         ></i>

//                         <i
//                             class="bi bi-star"
//                             data-rating="5"
//                             onclick="selectRating(5)"
//                         ></i>

//                     </div>

//                     <p
//                         class="rating-text"
//                         id="ratingText"
//                     >
//                         Select a rating from 1 to 5 stars.
//                     </p>

//                     <input
//                         type="hidden"
//                         id="selectedRating"
//                         value="0"
//                     >

//                 </div>


//                 <div class="form-field full">

//                     <label>
//                         Feedback Description
//                     </label>

//                     <textarea
//                         id="feedbackDescription"
//                         placeholder="Tell us about your experience..."
//                         required
//                     ></textarea>

//                 </div>

//             </div>


//             <div class="form-actions">

//                 <button
//                     type="submit"
//                     class="btn-primary"
//                 >
//                     <i class="bi bi-send"></i>
//                     Submit Feedback
//                 </button>

//                 <button
//                     type="reset"
//                     class="btn-secondary"
//                     onclick="resetRating()"
//                 >
//                     Clear
//                 </button>

//             </div>

//         </form>

//     `;

// }


// /* =========================================================
//    STAR RATING
// ========================================================= */

// let selectedRating = 0;


// function selectRating(rating) {

//     selectedRating =
//         rating;


//     const stars =
//         document.querySelectorAll(
//             "#starRating i"
//         );


//     stars.forEach(
//         (star, index) => {

//             if (index < rating) {

//                 star.classList
//                     .add("selected");

//                 star.classList
//                     .remove("bi-star");

//                 star.classList
//                     .add("bi-star-fill");

//             } else {

//                 star.classList
//                     .remove("selected");

//                 star.classList
//                     .remove("bi-star-fill");

//                 star.classList
//                     .add("bi-star");

//             }

//         }
//     );


//     const ratingText =
//         document.getElementById(
//             "ratingText"
//         );


//     const messages = {

//         1: "Very Poor",

//         2: "Poor",

//         3: "Average",

//         4: "Good",

//         5: "Excellent"

//     };


//     if (ratingText) {

//         ratingText.innerText =
//             `${rating} / 5 — ${messages[rating]}`;

//     }


//     const hidden =
//         document.getElementById(
//             "selectedRating"
//         );


//     if (hidden) {

//         hidden.value =
//             rating;

//     }

// }


// /* =========================================================
//    RESET RATING
// ========================================================= */

// function resetRating() {

//     selectedRating = 0;

// }


// /* =========================================================
//    SUBMIT FEEDBACK
// ========================================================= */

// function submitFeedback(event) {

//     event.preventDefault();


//     const eventName =
//         document.getElementById(
//             "feedbackEvent"
//         ).value;


//     const description =
//         document.getElementById(
//             "feedbackDescription"
//         ).value;


//     if (selectedRating === 0) {

//         alert(
//             "Please select a star rating."
//         );

//         return;

//     }


//     if (!eventName ||
//         !description.trim()) {

//         alert(
//             "Please complete all feedback fields."
//         );

//         return;

//     }


//     document.getElementById(
//         "content-body"
//     ).innerHTML = `

//         <div class="success-box">

//             <strong>
//                 <i class="bi bi-check-circle"></i>
//                 Feedback Submitted Successfully!
//             </strong>

//             <br><br>

//             Thank you for rating
//             <strong>${eventName}</strong>
//             ${selectedRating}/5 stars.

//             <br>

//             Your feedback has been recorded.

//         </div>


//         <button
//             class="btn-primary"
//             onclick="switchView('dashboard')"
//         >
//             Back to Dashboard
//         </button>

//     `;


//     selectedRating = 0;

// }


// /* =========================================================
//    HELP CENTRE
// ========================================================= */

// function generateHelpView() {

//     return `

//         <div class="help-item">

//             <h4>
//                 How do I register for an event?
//             </h4>

//             <p>
//                 Open "Register Event" from the sidebar,
//                 select the event, enter your student details
//                 and submit the registration form.
//             </p>

//         </div>


//         <div class="help-item">

//             <h4>
//                 How do I mark my attendance?
//             </h4>

//             <p>
//                 During an ongoing event, the Coordinator
//                 will display the event QR code. Open
//                 "Scan Attendance", allow camera access
//                 and scan the displayed QR code.
//             </p>

//         </div>


//         <div class="help-item">

//             <h4>
//                 Can I register for an event after it starts?
//             </h4>

//             <p>
//                 Registration availability depends on the
//                 event configuration. If registration is closed,
//                 the event will not be available for registration.
//             </p>

//         </div>


//         <div class="help-item">

//             <h4>
//                 How do I submit feedback?
//             </h4>

//             <p>
//                 Open "Give Feedback", select an attended event,
//                 choose a rating from one to five stars and
//                 write your feedback description.
//             </p>

//         </div>


//         <div class="help-item">

//             <h4>
//                 Can students upload gallery photos?
//             </h4>

//             <p>
//                 No. Students can only view the common event
//                 gallery. Gallery uploads are handled by
//                 authorized Host and Coordinator accounts.
//             </p>

//         </div>


//         <div class="help-item">

//             <h4>
//                 Need additional support?
//             </h4>

//             <p>
//                 Contact the CampusConnect administrative desk
//                 for account, registration or event-related
//                 assistance.
//             </p>

//         </div>

//     ;

// }
// ```
