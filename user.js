/* =========================================================
   CAMPUSCONNECT USER / STUDENT DASHBOARD
========================================================= */


/* =========================================================
   SAMPLE USER DATA
   Later this can come from your backend/database.
========================================================= */

const currentUser = {
    name: "Student",
    rollNo: "CS2201",
    email: "student@campusconnect.com",
    department: "Computer Science",
    year: "3rd Year"
};


/* =========================================================
   SAMPLE EVENT DATA
========================================================= */

const events = [

    {
        id: 1,
        name: "Tech Fest 2026 - Day 1",
        category: "Technical",
        date: "15 March 2026",
        time: "10:00 AM - 6:00 PM",
        venue: "Main Auditorium, Room 102",
        status: "ongoing",
        registered: true,
        attendance: false
    },

    {
        id: 2,
        name: "Cultural Night",
        category: "Cultural",
        date: "15 August 2026",
        time: "5:30 PM - 9:30 PM",
        venue: "Open Air Amphitheatre",
        status: "upcoming",
        registered: true,
        attendance: false
    },

    {
        id: 3,
        name: "Startup Pitch Meetup",
        category: "Workshop",
        date: "22 August 2026",
        time: "2:00 PM - 5:00 PM",
        venue: "Seminar Hall 2",
        status: "upcoming",
        registered: false,
        attendance: false
    },

    {
        id: 4,
        name: "Bot Wars Championship",
        category: "Technical",
        date: "10 February 2026",
        time: "11:00 AM - 3:00 PM",
        venue: "Engineering Block, Lab 4",
        status: "ended",
        registered: true,
        attendance: true
    },

    {
        id: 5,
        name: "Poetry Slam Night",
        category: "Cultural",
        date: "28 January 2026",
        time: "6:00 PM - 8:00 PM",
        venue: "Central Library Hall",
        status: "ended",
        registered: true,
        attendance: true
    },

    {
        id: 6,
        name: "Coding Bootcamp",
        category: "Workshop",
        date: "05 January 2026",
        time: "10:00 AM - 4:00 PM",
        venue: "Computer Lab 3",
        status: "ended",
        registered: true,
        attendance: true
    }

];


/* =========================================================
   RATING LABELS & FEEDBACK STORAGE KEY
========================================================= */

const FEEDBACK_STORAGE_KEY = "campusConnectUserFeedback";

const RATING_LABELS = {
    1: "1 Star — Poor",
    2: "2 Stars — Fair",
    3: "3 Stars — Good",
    4: "4 Stars — Very Good",
    5: "5 Stars — Excellent"
};


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    loadUserProfile();

    updateStatistics();

});


/* =========================================================
   SIDEBAR FUNCTIONS
========================================================= */

function expandSidebar() {
    // CSS handles expansion.
}

function collapseSidebar() {
    // CSS handles collapse.
}


/* =========================================================
   USER PROFILE
========================================================= */

function loadUserProfile() {

    const storedName =
        localStorage.getItem("studentName");

    if (storedName) {
        currentUser.name = storedName;
    }

    const avatar =
        document.getElementById("navAvatar");

    const name =
        document.getElementById("navUserName");

    if (avatar) {

        avatar.innerText =
            currentUser.name
                .charAt(0)
                .toUpperCase();

    }

    if (name) {

        name.innerText =
            currentUser.name;

    }

}


/* =========================================================
   LOGOUT
========================================================= */

function logoutUser(event) {

    if (event) {
        event.preventDefault();
    }

    localStorage.removeItem("campusConnectAdminAuth");

    localStorage.removeItem("userRole");

    localStorage.removeItem("studentName");

    window.location.href = "home.html";

}


/* =========================================================
   STATISTICS
========================================================= */

function updateStatistics() {

    const registered =
        events.filter(event => event.registered);

    const past =
        registered.filter(
            event => event.status === "ended"
        );

    const upcoming =
        registered.filter(
            event => event.status === "upcoming"
        );

    const ongoing =
        registered.filter(
            event => event.status === "ongoing"
        );

    const registeredElement =
        document.getElementById("registeredCount");

    const pastElement =
        document.getElementById("pastCount");

    const upcomingElement =
        document.getElementById("upcomingCount");

    const ongoingElement =
        document.getElementById("ongoingCount");

    if (registeredElement)
        registeredElement.innerText =
            registered.length;

    if (pastElement)
        pastElement.innerText =
            past.length;

    if (upcomingElement)
        upcomingElement.innerText =
            upcoming.length;

    if (ongoingElement)
        ongoingElement.innerText =
            ongoing.length;

}


/* =========================================================
   VIEW SWITCHING
========================================================= */

function switchView(viewName, element) {

    const dashboardView =
        document.getElementById("view-dashboard");

    const contentContainer =
        document.getElementById("view-content-container");

    const contentTitle =
        document.getElementById("content-title");

    const contentBody =
        document.getElementById("content-body");


    /* Remove active sidebar state */

    document.querySelectorAll(".sidebar-menu a")
        .forEach(link => {

            link.classList.remove("active");

        });


    /* Add active state */

    if (element) {

        element.classList.add("active");

    } else {

        const matchingLink =
            [...document.querySelectorAll(".sidebar-menu a")]
                .find(link =>
                    link.getAttribute("onclick") &&
                    link.getAttribute("onclick")
                        .includes("'" + viewName + "'")
                );

        if (matchingLink) {

            matchingLink.classList.add("active");

        }

    }


    /* Dashboard */

    if (viewName === "dashboard") {

        dashboardView.style.display =
            "block";

        contentContainer.style.display =
            "none";

        return;

    }


    dashboardView.style.display =
        "none";

    contentContainer.style.display =
        "block";


    switch (viewName) {

        case "myEvents":

            contentTitle.innerText =
                "My Registered Events";

            contentBody.innerHTML =
                generateMyEvents();

            break;


        case "upcoming":

            contentTitle.innerText =
                "Upcoming Events";

            contentBody.innerHTML =
                generateUpcomingEvents();

            break;


        case "ongoing":

            contentTitle.innerText =
                "Ongoing Events";

            contentBody.innerHTML =
                generateOngoingEvents();

            break;


        case "register":

            contentTitle.innerText =
                "Register for an Event";

            contentBody.innerHTML =
                generateRegistrationView();

            break;


        case "attendance":

            contentTitle.innerText =
                "My Attendance QR Pass";

            contentBody.innerHTML =
                generateAttendanceView();

            break;


        case "feedback":

            selectedRating = 0;

            contentTitle.innerText =
                "Event Feedback";

            contentBody.innerHTML =
                generateFeedbackView();

            break;


        case "help":

            contentTitle.innerText =
                "Help Centre";

            contentBody.innerHTML =
                generateHelpView();

            break;

    }

}


/* =========================================================
   MY EVENTS
========================================================= */

function generateMyEvents() {

    const registeredEvents =
        events.filter(event => event.registered);


    if (registeredEvents.length === 0) {

        return `
            <div class="empty-state">
                <i class="bi bi-calendar-x"></i>
                <h3>No Registered Events</h3>
                <p>You have not registered for any event yet.</p>
            </div>
        `;

    }


    let rows = "";


    registeredEvents.forEach(event => {

        let statusHTML = "";

        if (event.status === "ongoing") {

            statusHTML =
                `<span class="status-pill status-live">Ongoing</span>`;

        } else if (event.status === "upcoming") {

            statusHTML =
                `<span class="status-pill status-upcoming">Upcoming</span>`;

        } else {

            statusHTML =
                `<span class="status-pill status-ended">Completed</span>`;

        }


        let attendanceHTML =
            event.attendance

                ? `<span class="status-pill status-present">
                        Present
                   </span>`

                : event.status === "ended"

                    ? `<span class="status-pill status-absent">
                            Not Marked
                       </span>`

                    : `<span class="status-pill status-registered">
                            Pending
                       </span>`;


        rows += `

            <tr>

                <td>
                    <strong>${event.name}</strong>
                </td>

                <td>
                    ${event.category}
                </td>

                <td>
                    ${event.date}
                </td>

                <td>
                    ${event.time}
                </td>

                <td>
                    ${statusHTML}
                </td>

                <td>
                    ${attendanceHTML}
                </td>

            </tr>

        `;

    });


    return `

        <div class="table-responsive">

            <table>

                <thead>

                    <tr>
                        <th>Event</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Attendance</th>
                    </tr>

                </thead>

                <tbody>
                    ${rows}
                </tbody>

            </table>

        </div>

    `;

}


/* =========================================================
   UPCOMING EVENTS
========================================================= */

function generateUpcomingEvents() {

    const upcomingEvents =
        events.filter(
            event => event.status === "upcoming"
        );


    return `

        <div class="filter-bar">

            <input
                type="text"
                class="filter-input"
                id="eventSearch"
                placeholder="Search event..."
                oninput="filterUpcomingEvents()"
            >

            <select
                class="filter-input"
                id="categoryFilter"
                onchange="filterUpcomingEvents()"
            >

                <option value="all">
                    All Categories
                </option>

                <option value="Technical">
                    Technical
                </option>

                <option value="Cultural">
                    Cultural
                </option>

                <option value="Sports">
                    Sports
                </option>

                <option value="Workshop">
                    Workshop
                </option>

            </select>

        </div>


        <div id="upcomingEventsTable">

            ${createUpcomingTable(upcomingEvents)}

        </div>

    `;

}


function createUpcomingTable(eventList) {

    if (eventList.length === 0) {

        return `

            <div class="empty-state">

                <i class="bi bi-calendar-x"></i>

                <h3>
                    No Events Found
                </h3>

                <p>
                    Try changing your search or category.
                </p>

            </div>

        `;

    }


    let rows = "";


    eventList.forEach(event => {

        rows += `

            <tr>

                <td>
                    <strong>
                        ${event.name}
                    </strong>
                </td>

                <td>
                    ${event.category}
                </td>

                <td>
                    ${event.date}
                </td>

                <td>
                    ${event.time}
                </td>

                <td>
                    ${event.venue}
                </td>

                <td>

                    ${
                        event.registered

                        ? `<span class="status-pill status-registered">
                                Registered
                           </span>`

                        : `<button
                                class="btn-primary"
                                onclick="openRegistration('${event.name}')">
                                Register
                           </button>`
                    }

                </td>

            </tr>

        `;

    });


    return `

        <div class="table-responsive">

            <table>

                <thead>

                    <tr>

                        <th>Event</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Venue</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>
                    ${rows}
                </tbody>

            </table>

        </div>

    `;

}


/* =========================================================
   FILTER UPCOMING EVENTS
========================================================= */

function filterUpcomingEvents() {

    const search =
        document.getElementById("eventSearch")
            ?.value
            .toLowerCase() || "";


    const category =
        document.getElementById("categoryFilter")
            ?.value || "all";


    const filtered =
        events.filter(event => {

            if (event.status !== "upcoming") {
                return false;
            }


            const matchesSearch =
                event.name
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =
                category === "all" ||
                event.category === category;


            return matchesSearch &&
                matchesCategory;

        });


    const container =
        document.getElementById(
            "upcomingEventsTable"
        );


    if (container) {

        container.innerHTML =
            createUpcomingTable(filtered);

    }

}


/* =========================================================
   ONGOING EVENTS
========================================================= */

function generateOngoingEvents() {

    const ongoing =
        events.filter(
            event => event.status === "ongoing"
        );


    if (ongoing.length === 0) {

        return `

            <div class="empty-state">

                <i class="bi bi-broadcast"></i>

                <h3>
                    No Ongoing Events
                </h3>

                <p>
                    You currently have no registered event happening.
                </p>

            </div>

        `;

    }


    let rows = "";


    ongoing.forEach(event => {

        rows += `

            <tr>

                <td>
                    <strong>
                        ${event.name}
                    </strong>
                </td>

                <td>
                    ${event.date}
                </td>

                <td>
                    ${event.time}
                </td>

                <td>
                    ${event.venue}
                </td>

                <td>
                    <span class="status-pill status-live">
                        Ongoing
                    </span>
                </td>

                <td>

                    ${
                        event.attendance

                        ? `<span class="status-pill status-present">
                                Attendance Marked
                           </span>`

                        : `<button
                                class="btn-primary"
                                onclick="switchView('attendance')">
                                View Attendance QR
                           </button>`
                    }

                </td>

            </tr>

        `;

    });


    return `

        <div class="info-box">

            <strong>
                Attendance Reminder:
            </strong>

            If the Coordinator is displaying the event QR code,
            scan it to mark your attendance.

        </div>


        <div class="table-responsive">

            <table>

                <thead>

                    <tr>

                        <th>Event</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Venue</th>
                        <th>Status</th>
                        <th>Attendance</th>

                    </tr>

                </thead>

                <tbody>
                    ${rows}
                </tbody>

            </table>

        </div>

    `;

}


/* =========================================================
   REGISTER EVENT
========================================================= */

function generateRegistrationView(selectedEvent = "") {

    return `

        <div class="info-box">

            <strong>
                Event Registration
            </strong>

            <br>

            Fill in your details to register for an upcoming event.

        </div>


        <form
            onsubmit="submitEventRegistration(event)"
        >

            <div class="form-grid">

                <div class="form-field">

                    <label>
                        Select Event
                    </label>

                    <select
                        id="registrationEvent"
                        required
                    >

                        <option value="">
                            Choose an event...
                        </option>

                        <option
                            value="Cultural Night"
                            ${selectedEvent === "Cultural Night" ? "selected" : ""}
                        >
                            Cultural Night
                        </option>

                        <option
                            value="Startup Pitch Meetup"
                            ${selectedEvent === "Startup Pitch Meetup" ? "selected" : ""}
                        >
                            Startup Pitch Meetup
                        </option>

                    </select>

                </div>


                <div class="form-field">

                    <label>
                        Student Name
                    </label>

                    <input
                        type="text"
                        id="studentName"
                        value="${currentUser.name}"
                        required
                    >

                </div>


                <div class="form-field">

                    <label>
                        Roll Number
                    </label>

                    <input
                        type="text"
                        id="rollNumber"
                        value="${currentUser.rollNo}"
                        required
                    >

                </div>


                <div class="form-field">

                    <label>
                        Email Address
                    </label>

                    <input
                        type="email"
                        id="studentEmail"
                        value="${currentUser.email}"
                        required
                    >

                </div>


                <div class="form-field">

                    <label>
                        Department
                    </label>

                    <select id="department">

                        <option>
                            Computer Science
                        </option>

                        <option>
                            Information Technology
                        </option>

                        <option>
                            Electronics
                        </option>

                        <option>
                            Mechanical
                        </option>

                        <option>
                            Management
                        </option>

                    </select>

                </div>


                <div class="form-field">

                    <label>
                        Year / Semester
                    </label>

                    <select id="year">

                        <option>
                            1st Year
                        </option>

                        <option>
                            2nd Year
                        </option>

                        <option selected>
                            3rd Year
                        </option>

                        <option>
                            4th Year
                        </option>

                    </select>

                </div>


                <div class="form-field">

                    <label>
                        Contact Number
                    </label>

                    <input
                        type="tel"
                        id="contactNumber"
                        placeholder="Enter contact number"
                        required
                    >

                </div>


                <div class="form-field">

                    <label>
                        Participation Type
                    </label>

                    <select id="participationType">

                        <option>
                            Participant
                        </option>

                        <option>
                            Volunteer
                        </option>

                        <option>
                            Audience
                        </option>

                    </select>

                </div>

            </div>


            <div class="form-actions">

                <button
                    type="submit"
                    class="btn-primary"
                >
                    Register for Event
                </button>

                <button
                    type="reset"
                    class="btn-secondary"
                >
                    Clear
                </button>

            </div>

        </form>

    `;

}


/* =========================================================
   OPEN REGISTRATION WITH EVENT SELECTED
========================================================= */

function openRegistration(eventName) {

    switchView("register");


    setTimeout(() => {

        const select =
            document.getElementById(
                "registrationEvent"
            );


        if (select) {

            select.value =
                eventName;

        }

    }, 50);

}


/* =========================================================
   SUBMIT EVENT REGISTRATION
========================================================= */

function submitEventRegistration(event) {

    event.preventDefault();


    const eventName =
        document.getElementById(
            "registrationEvent"
        ).value;


    if (!eventName) {

        alert(
            "Please select an event."
        );

        return;

    }


    const selectedEvent =
        events.find(
            event => event.name === eventName
        );


    if (selectedEvent) {

        selectedEvent.registered =
            true;

    }


    updateStatistics();


    document.getElementById(
        "content-body"
    ).innerHTML = `

        <div class="success-box">

            <strong>
                Registration Successful!
            </strong>

            <br><br>

            You have successfully registered for
            <strong>${eventName}</strong>.

            <br>

            Your registration has been recorded.

        </div>


        <button
            class="btn-primary"
            onclick="switchView('myEvents')"
        >
            View My Events
        </button>

    `;

}


/* =========================================================
   DUMMY QR ATTENDANCE PASS VIEW (NO CAMERA FOR USER)
========================================================= */

let dummyPassNonce = 1042;


function buildDummyQRCodeSVG(seedText) {

    /* Deterministic 21x21 QR-like matrix with standard finder patterns */
    const size = 21;
    const grid = Array.from({ length: size }, () => Array(size).fill(false));

    function drawFinder(rowOffset, colOffset) {
        for (let r = 0; r < 7; r++) {
            for (let c = 0; c < 7; c++) {
                const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
                const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
                grid[rowOffset + r][colOffset + c] = isBorder || isInner;
            }
        }
    }

    drawFinder(0, 0);
    drawFinder(0, size - 7);
    drawFinder(size - 7, 0);

    /* Timing patterns */
    for (let i = 8; i < size - 8; i++) {
        grid[6][i] = i % 2 === 0;
        grid[i][6] = i % 2 === 0;
    }

    /* Seed hash from seedText */
    let hash = 2166136261;
    for (let i = 0; i < seedText.length; i++) {
        hash ^= seedText.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            const inTopLeft = r < 8 && c < 8;
            const inTopRight = r < 8 && c >= size - 8;
            const inBottomLeft = r >= size - 8 && c < 8;
            const isTiming = r === 6 || c === 6;

            if (!inTopLeft && !inTopRight && !inBottomLeft && !isTiming) {
                hash ^= (r * 31 + c * 17) & 0xff;
                hash = Math.imul(hash, 16777619);
                grid[r][c] = (Math.abs(hash) % 10) < 5;
            }
        }
    }

    let rects = "";
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (grid[r][c]) {
                rects += `<rect x="${c + 2}" y="${r + 2}" width="1" height="1" fill="#111118" />`;
            }
        }
    }

    return `
        <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" aria-label="Dummy Attendance QR Code">
            <rect width="25" height="25" fill="#ffffff" />
            ${rects}
        </svg>
    `;

}


function generateAttendanceView() {

    const activeEvents =
        events.filter(
            event =>
                event.registered &&
                (event.status === "ongoing" || event.status === "upcoming")
        );

    const defaultEvent =
        activeEvents[0] || events[0];

    let optionsHTML = "";

    activeEvents.forEach(ev => {
        optionsHTML += `
            <option value="${ev.name}" ${ev.id === defaultEvent.id ? "selected" : ""}>
                ${ev.name} (${ev.status === "ongoing" ? "Live Now" : ev.date})
            </option>
        `;
    });

    const tokenString =
        `CC-PASS|${currentUser.rollNo}|${currentUser.name}|${defaultEvent.name}|#${dummyPassNonce}`;

    return `

        <div class="info-box">

            <strong>
                <i class="bi bi-qr-code"></i>
                Digital Attendance QR Pass
            </strong>

            <br>

            Display this Dummy QR Pass to the Event <strong>Host</strong> or <strong>Coordinator</strong> at the venue. They will scan your QR pass with their camera to mark your attendance.

        </div>


        <div class="attendance-layout">

            <div class="scanner-card">

                <h3>
                    <i class="bi bi-person-badge"></i>
                    Student Attendance QR Pass
                </h3>

                <p>
                    Present this QR code to the Host / Coordinator scanner.
                </p>

                <div style="max-width: 340px; margin: 0 auto 14px; text-align: left;">
                    <label style="font-size: 12px; font-weight: 600; color: #475569; display: block; margin-bottom: 5px;">
                        Select Registered Event
                    </label>
                    <select
                        id="userQrEventSelect"
                        onchange="updateUserDummyQRPass()"
                        style="width: 100%; padding: 8px 12px; border-radius: 7px; border: 1px solid #cbd5e1; font-size: 13px;"
                    >
                        ${optionsHTML}
                    </select>
                </div>

                <div class="dummy-qr-box" id="dummyQrContainer">
                    ${buildDummyQRCodeSVG(tokenString)}
                </div>

                <div class="qr-pass-meta" id="dummyQrMeta">
                    <p>
                        <span>Student:</span>
                        <strong>${currentUser.name} (${currentUser.rollNo})</strong>
                    </p>
                    <p>
                        <span>Event:</span>
                        <strong id="qrMetaEventName">${defaultEvent.name}</strong>
                    </p>
                    <p>
                        <span>Venue:</span>
                        <strong id="qrMetaVenue">${defaultEvent.venue}</strong>
                    </p>
                    <p>
                        <span>Pass ID:</span>
                        <strong id="qrMetaToken">CC-${currentUser.rollNo}-${dummyPassNonce}</strong>
                    </p>
                </div>

                <div class="scanner-actions">

                    <button
                        class="btn-primary"
                        onclick="refreshDummyQRPass()"
                    >
                        <i class="bi bi-arrow-clockwise"></i>
                        Refresh Dummy QR
                    </button>

                </div>

                <div
                    id="scanStatus"
                    class="scan-status"
                >
                    <span class="status-pill status-registered">Ready to be scanned by Host / Coordinator</span>
                </div>

            </div>


            <div class="attendance-info">

                <h3>
                    How Attendance Works
                </h3>

                <ul>

                    <li>
                        Select your registered ongoing or upcoming event above.
                    </li>

                    <li>
                        Your unique student Dummy QR Pass is generated automatically.
                    </li>

                    <li>
                        Show this QR pass at the venue entrance.
                    </li>

                    <li>
                        The <strong>Event Host</strong> or <strong>Coordinator</strong> will use their dashboard camera scanner to scan your QR code.
                    </li>

                    <li>
                        Once scanned by the Host or Coordinator, your attendance status is marked as <strong>Present</strong>.
                    </li>

                </ul>

                <div class="info-box">

                    <strong>
                        Note:
                    </strong>

                    Students do not need camera access. Camera QR scanning is enabled on the Host and Coordinator dashboards.

                </div>

            </div>

        </div>

    `;

}


function updateUserDummyQRPass() {

    const select =
        document.getElementById("userQrEventSelect");

    const qrContainer =
        document.getElementById("dummyQrContainer");

    if (!select || !qrContainer) return;

    const selectedEvent =
        events.find(ev => ev.name === select.value) || events[0];

    const tokenString =
        `CC-PASS|${currentUser.rollNo}|${currentUser.name}|${selectedEvent.name}|#${dummyPassNonce}`;

    qrContainer.innerHTML =
        buildDummyQRCodeSVG(tokenString);

    const eventEl = document.getElementById("qrMetaEventName");
    const venueEl = document.getElementById("qrMetaVenue");
    const tokenEl = document.getElementById("qrMetaToken");

    if (eventEl) eventEl.innerText = selectedEvent.name;
    if (venueEl) venueEl.innerText = selectedEvent.venue;
    if (tokenEl) tokenEl.innerText = `CC-${currentUser.rollNo}-${dummyPassNonce}`;

}


function refreshDummyQRPass() {

    dummyPassNonce = Math.floor(1000 + Math.random() * 9000);

    updateUserDummyQRPass();

    const status = document.getElementById("scanStatus");
    if (status) {
        status.className = "scan-status scan-success";
        status.innerHTML = `<i class="bi bi-check-circle"></i> Dummy QR Pass refreshed (Token: <strong>CC-${currentUser.rollNo}-${dummyPassNonce}</strong>)`;
    }

}


/* =========================================================
   FEEDBACK STORAGE & HELPERS
========================================================= */

function getStoredFeedback() {

    try {

        const raw = localStorage.getItem(FEEDBACK_STORAGE_KEY);

        if (!raw) {
            return [];
        }

        const parsed = JSON.parse(raw);

        return Array.isArray(parsed) ? parsed : [];

    } catch (err) {

        console.error("Failed to read feedback from localStorage:", err);

        return [];

    }

}


function saveFeedbackToStorage(feedbackItem) {

    const list = getStoredFeedback();

    list.unshift(feedbackItem);

    try {

        localStorage.setItem(
            FEEDBACK_STORAGE_KEY,
            JSON.stringify(list)
        );

    } catch (err) {

        console.error("Failed to save feedback to localStorage:", err);

    }

}


/* =========================================================
   FEEDBACK VIEW
========================================================= */

function generateFeedbackView() {

    const completedEvents =
        events.filter(
            event =>
                event.status === "ended" &&
                event.registered
        );


    let eventOptions = "";


    completedEvents.forEach(event => {

        eventOptions += `

            <option value="${event.name}">
                ${event.name} (${event.date})
            </option>

        `;

    });


    return `

        <div class="info-box">

            <strong>
                <i class="bi bi-chat-square-heart"></i>
                Share Your Event Experience
            </strong>

            <br>

            Select a completed event you participated in, rate your experience on a 5-star scale, and provide your feedback.

        </div>


        <div id="feedbackAlertContainer"></div>


        <form
            id="userFeedbackForm"
            onsubmit="submitFeedback(event)"
            novalidate
        >

            <div class="form-grid">

                <div class="form-field">

                    <label for="feedbackEvent">
                        Select Event *
                    </label>

                    <select
                        id="feedbackEvent"
                        onchange="handleFeedbackEventChange()"
                        required
                    >

                        <option value="">
                            Select a participated event...
                        </option>

                        ${eventOptions}

                    </select>

                </div>


                <div class="form-field">

                    <label for="feedbackCategory">
                        Feedback Category
                    </label>

                    <select id="feedbackCategory">

                        <option value="Overall Experience">
                            Overall Experience
                        </option>

                        <option value="Event Organization">
                            Event Organization
                        </option>

                        <option value="Event Content">
                            Event Content
                        </option>

                        <option value="Venue">
                            Venue
                        </option>

                        <option value="Host/Coordinator">
                            Host/Coordinator
                        </option>

                    </select>

                </div>


                <div class="form-field">

                    <label for="feedbackEventDate">
                        Event Date
                    </label>

                    <input
                        type="text"
                        id="feedbackEventDate"
                        placeholder="Auto-filled upon selecting an event"
                        readonly
                    >

                </div>


                <div class="form-field">

                    <label for="feedbackEventStatus">
                        Event Status
                    </label>

                    <input
                        type="text"
                        id="feedbackEventStatus"
                        placeholder="Auto-filled upon selecting an event"
                        readonly
                    >

                </div>


                <div class="form-field full">

                    <label>
                        Your Rating *
                    </label>

                    <div
                        class="star-rating"
                        id="starRating"
                        onmouseleave="clearPreviewRating()"
                    >

                        <i
                            class="bi bi-star"
                            data-rating="1"
                            title="1 Star — Poor"
                            onmouseenter="previewRating(1)"
                            onclick="selectRating(1)"
                        ></i>

                        <i
                            class="bi bi-star"
                            data-rating="2"
                            title="2 Stars — Fair"
                            onmouseenter="previewRating(2)"
                            onclick="selectRating(2)"
                        ></i>

                        <i
                            class="bi bi-star"
                            data-rating="3"
                            title="3 Stars — Good"
                            onmouseenter="previewRating(3)"
                            onclick="selectRating(3)"
                        ></i>

                        <i
                            class="bi bi-star"
                            data-rating="4"
                            title="4 Stars — Very Good"
                            onmouseenter="previewRating(4)"
                            onclick="selectRating(4)"
                        ></i>

                        <i
                            class="bi bi-star"
                            data-rating="5"
                            title="5 Stars — Excellent"
                            onmouseenter="previewRating(5)"
                            onclick="selectRating(5)"
                        ></i>

                    </div>

                    <p
                        class="rating-text"
                        id="ratingText"
                    >
                        Select a rating: 1 Star (Poor) to 5 Stars (Excellent)
                    </p>

                    <input
                        type="hidden"
                        id="selectedRating"
                        value="0"
                    >

                </div>


                <div class="form-field full">

                    <label for="feedbackDescription">
                        Feedback Message *
                    </label>

                    <textarea
                        id="feedbackDescription"
                        placeholder="Share your experience about this event..."
                        required
                    ></textarea>

                </div>

            </div>


            <div class="form-actions">

                <button
                    type="submit"
                    class="btn-primary"
                >
                    <i class="bi bi-send"></i>
                    Submit Feedback
                </button>

                <button
                    type="reset"
                    class="btn-secondary"
                    onclick="resetRating()"
                >
                    Clear
                </button>

            </div>

        </form>


        <!-- MY FEEDBACK HISTORY SECTION -->

        <div class="feedback-history-section">

            <h3 class="feedback-section-title">
                <i class="bi bi-clock-history"></i>
                My Feedback
            </h3>

            <div id="myFeedbackHistoryContainer">
                ${renderMyFeedbackHistory()}
            </div>

        </div>

    `;

}


/* =========================================================
   HANDLE EVENT SELECTION IN FEEDBACK FORM
========================================================= */

function handleFeedbackEventChange() {

    const eventSelect =
        document.getElementById("feedbackEvent");

    const dateInput =
        document.getElementById("feedbackEventDate");

    const statusInput =
        document.getElementById("feedbackEventStatus");

    const alertContainer =
        document.getElementById("feedbackAlertContainer");

    if (alertContainer) {
        alertContainer.innerHTML = "";
    }

    if (!eventSelect || !dateInput || !statusInput) {
        return;
    }

    const selectedName = eventSelect.value;

    if (!selectedName) {

        dateInput.value = "";
        statusInput.value = "";
        return;

    }

    const matchedEvent =
        events.find(
            event => event.name === selectedName
        );

    if (matchedEvent) {

        dateInput.value = matchedEvent.date;

        statusInput.value =
            matchedEvent.status === "ended"
                ? "Completed (Participated)"
                : matchedEvent.status;

    }

}


/* =========================================================
   STAR RATING (SELECT, HOVER PREVIEW & RESET)
========================================================= */

let selectedRating = 0;


function selectRating(rating) {

    selectedRating = rating;

    const hidden =
        document.getElementById("selectedRating");

    if (hidden) {
        hidden.value = rating;
    }

    const alertContainer =
        document.getElementById("feedbackAlertContainer");

    if (alertContainer) {
        alertContainer.innerHTML = "";
    }

    updateStarVisuals(rating);

}


function previewRating(rating) {

    const stars =
        document.querySelectorAll("#starRating i");

    stars.forEach((star, index) => {

        if (index < rating) {
            star.classList.add("hovered");
        } else {
            star.classList.remove("hovered");
        }

    });

    const ratingText =
        document.getElementById("ratingText");

    if (ratingText && RATING_LABELS[rating]) {
        ratingText.innerText = RATING_LABELS[rating];
    }

}


function clearPreviewRating() {

    const stars =
        document.querySelectorAll("#starRating i");

    stars.forEach(star => {
        star.classList.remove("hovered");
    });

    updateStarVisuals(selectedRating);

}


function updateStarVisuals(rating) {

    const stars =
        document.querySelectorAll("#starRating i");

    stars.forEach((star, index) => {

        if (index < rating) {

            star.classList.add("selected");
            star.classList.remove("bi-star");
            star.classList.add("bi-star-fill");

        } else {

            star.classList.remove("selected");
            star.classList.remove("bi-star-fill");
            star.classList.add("bi-star");

        }

    });

    const ratingText =
        document.getElementById("ratingText");

    if (ratingText) {

        if (rating > 0 && RATING_LABELS[rating]) {
            ratingText.innerText = RATING_LABELS[rating];
        } else {
            ratingText.innerText =
                "Select a rating: 1 Star (Poor) to 5 Stars (Excellent)";
        }

    }

}


function resetRating() {

    selectedRating = 0;

    setTimeout(() => {

        const hidden =
            document.getElementById("selectedRating");

        if (hidden) {
            hidden.value = "0";
        }

        const dateInput =
            document.getElementById("feedbackEventDate");

        const statusInput =
            document.getElementById("feedbackEventStatus");

        if (dateInput) dateInput.value = "";
        if (statusInput) statusInput.value = "";

        updateStarVisuals(0);

    }, 10);

}


/* =========================================================
   SUBMIT FEEDBACK
========================================================= */

function submitFeedback(event) {

    event.preventDefault();

    const eventSelect =
        document.getElementById("feedbackEvent");

    const categorySelect =
        document.getElementById("feedbackCategory");

    const descriptionInput =
        document.getElementById("feedbackDescription");

    const alertContainer =
        document.getElementById("feedbackAlertContainer");

    const eventName =
        eventSelect ? eventSelect.value.trim() : "";

    const category =
        categorySelect ? categorySelect.value : "Overall Experience";

    const description =
        descriptionInput ? descriptionInput.value.trim() : "";


    /* 1. Validate Event Selection */

    if (!eventName) {

        if (alertContainer) {
            alertContainer.innerHTML = `
                <div class="error-box">
                    <i class="bi bi-exclamation-circle"></i>
                    <strong>Validation Error:</strong> Please select an event for which you want to provide feedback.
                </div>
            `;
        }

        if (eventSelect) eventSelect.focus();
        return;

    }


    /* 2. Validate 5-Star Rating */

    if (selectedRating < 1 || selectedRating > 5) {

        if (alertContainer) {
            alertContainer.innerHTML = `
                <div class="error-box">
                    <i class="bi bi-exclamation-circle"></i>
                    <strong>Validation Error:</strong> Please select a star rating between 1 Star (Poor) and 5 Stars (Excellent).
                </div>
            `;
        }

        return;

    }


    /* 3. Validate Feedback Message */

    if (!description) {

        if (alertContainer) {
            alertContainer.innerHTML = `
                <div class="error-box">
                    <i class="bi bi-exclamation-circle"></i>
                    <strong>Validation Error:</strong> Please write your feedback message before submitting.
                </div>
            `;
        }

        if (descriptionInput) descriptionInput.focus();
        return;

    }


    /* Save Feedback for Current Logged-in User */

    const matchedEvent =
        events.find(e => e.name === eventName);

    const todayFormatted =
        new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

    const newFeedback = {
        id: Date.now(),
        user: currentUser.name,
        rollNo: currentUser.rollNo,
        event: eventName,
        eventDate: matchedEvent ? matchedEvent.date : todayFormatted,
        category: category,
        rating: selectedRating,
        ratingLabel: RATING_LABELS[selectedRating],
        message: description,
        submittedDate: todayFormatted
    };

    saveFeedbackToStorage(newFeedback);


    /* Show Professional Success Message */

    if (alertContainer) {

        alertContainer.innerHTML = `
            <div class="success-box">
                <strong>
                    <i class="bi bi-check-circle-fill"></i>
                    Thank you for your feedback! Your response has been recorded successfully.
                </strong>
                <br>
                <span>
                    Event: <strong>${eventName}</strong> &nbsp;|&nbsp;
                    Rating: <strong>${RATING_LABELS[selectedRating]}</strong>
                </span>
            </div>
        `;

    }


    /* Reset Form & Refresh Feedback History Table */

    const form =
        document.getElementById("userFeedbackForm");

    if (form) {
        form.reset();
    }

    resetRating();

    const historyContainer =
        document.getElementById("myFeedbackHistoryContainer");

    if (historyContainer) {
        historyContainer.innerHTML =
            renderMyFeedbackHistory();
    }

}


/* =========================================================
   RENDER MY FEEDBACK HISTORY TABLE
========================================================= */

function renderMyFeedbackHistory() {

    const allFeedback = getStoredFeedback();

    const userFeedback =
        allFeedback.filter(
            item => item.user === currentUser.name
        );

    if (userFeedback.length === 0) {

        return `
            <div class="empty-state" style="padding: 25px 15px;">
                <i class="bi bi-chat-left-dots" style="font-size: 30px;"></i>
                <h3>No Feedback Submitted Yet</h3>
                <p>Your submitted event feedback will appear here.</p>
            </div>
        `;

    }

    let rows = "";

    userFeedback.forEach(item => {

        const starsFilled = "★".repeat(item.rating);
        const starsEmpty = "☆".repeat(5 - item.rating);

        rows += `
            <tr>
                <td>
                    <strong>${escapeHTML(item.event)}</strong>
                    <br>
                    <small style="color: #64748b;">${escapeHTML(item.category || "Overall Experience")}</small>
                </td>
                <td>
                    <span class="feedback-stars-display">${starsFilled}${starsEmpty}</span>
                    <span class="feedback-rating-badge">(${item.rating}/5)</span>
                </td>
                <td style="white-space: normal; max-width: 380px;">
                    ${escapeHTML(item.message)}
                </td>
                <td>
                    ${escapeHTML(item.submittedDate)}
                </td>
            </tr>
        `;

    });

    return `
        <div class="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>Event</th>
                        <th>Rating</th>
                        <th>Feedback</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        </div>
    `;

}


function escapeHTML(str) {

    if (!str) return "";

    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   HELP CENTRE
========================================================= */

function generateHelpView() {

    return `

        <div class="help-item">

            <h4>
                How do I register for an event?
            </h4>

            <p>
                Open "Register Event" from the sidebar,
                select the event, enter your student details
                and submit the registration form.
            </p>

        </div>


        <div class="help-item">

            <h4>
                How do I mark my attendance?
            </h4>

            <p>
                During an ongoing event, the Coordinator
                will display the event QR code. Open
                "Scan Attendance", allow camera access
                and scan the displayed QR code.
            </p>

        </div>


        <div class="help-item">

            <h4>
                Can I register for an event after it starts?
            </h4>

            <p>
                Registration availability depends on the
                event configuration. If registration is closed,
                the event will not be available for registration.
            </p>

        </div>


        <div class="help-item">

            <h4>
                How do I submit feedback?
            </h4>

            <p>
                Open "Give Feedback", select an attended event,
                choose a rating from one to five stars and
                write your feedback description.
            </p>

        </div>


        <div class="help-item">

            <h4>
                Can students upload gallery photos?
            </h4>

            <p>
                No. Students can only view the common event
                gallery. Gallery uploads are handled by
                authorized Host and Coordinator accounts.
            </p>

        </div>


        <div class="help-item">

            <h4>
                Need additional support?
            </h4>

            <p>
                Contact the CampusConnect administrative desk
                for account, registration or event-related
                assistance.
            </p>

        </div>

    `;

}
