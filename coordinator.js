function expandSidebar() {}
function collapseSidebar() {}

function logoutCoordinator(event) {
    if (event) event.preventDefault();
    localStorage.removeItem('campusConnectAdminAuth');
    localStorage.removeItem('userRole');
    window.location.href = 'home.html';
}

/* =========================================================
   COORDINATOR STUDENT ATTENDANCE LIST
========================================================= */

const coordinatorStudents = [
    {
        rollNo: "CS2201",
        name: "Ananya Patra",
        event: "Tech Fest 2026 - Day 1",
        present: true
    },
    {
        rollNo: "CS2214",
        name: "Rohit Sahoo",
        event: "Tech Fest 2026 - Day 1",
        present: false
    },
    {
        rollNo: "CS2230",
        name: "Meera Nayak",
        event: "Tech Fest 2026 - Day 1",
        present: false
    },
    {
        rollNo: "CS2242",
        name: "Aarav Verma",
        event: "Tech Fest 2026 - Day 1",
        present: false
    }
];

let coordinatorQrScanner = null;
let coordinatorScannerRunning = false;

function renderCoordinatorAttendanceView() {
    return `
        <div class="info-box">
            <strong><i class="bi bi-camera-video"></i> Coordinator QR Attendance Scanner:</strong>
            Use your camera to scan a student's Dummy Attendance QR Pass or mark their attendance manually in the table below.
        </div>

        <div class="attendance-layout">
            <div class="scanner-card">
                <h3><i class="bi bi-qr-code-scan"></i> Scan Student QR Pass</h3>
                <p>Allow camera permission and scan the student's QR code pass to verify &amp; mark attendance.</p>

                <div id="coordinator-qr-reader">
                    <span style="color: #64748b; font-size: 13px;"><i class="bi bi-camera"></i> Camera preview will appear here</span>
                </div>

                <div class="scanner-actions">
                    <button class="btn-primary" onclick="startCoordinatorScanner()">
                        <i class="bi bi-camera"></i> Start Camera
                    </button>
                    <button class="btn-secondary" onclick="stopCoordinatorScanner()">
                        Stop Camera
                    </button>
                    <button class="btn-secondary" onclick="simulateCoordinatorScan()" title="Test scanning a student QR pass">
                        <i class="bi bi-lightning-charge"></i> Demo Scan QR
                    </button>
                </div>

                <div id="coordinatorScanStatus" class="scan-status">
                    Camera scanner is ready. Click "Start Camera" to scan student QR passes.
                </div>
            </div>

            <div class="attendance-info">
                <h3>Coordinator Scanning Instructions</h3>
                <ul>
                    <li>Select the active event from the filter below.</li>
                    <li>Click <strong>Start Camera</strong> and grant browser camera permission.</li>
                    <li>Ask the student to open <strong>Attendance QR</strong> on their User Dashboard and show their Dummy QR Pass.</li>
                    <li>Point the camera at the student's QR pass — attendance is automatically marked as <strong>Present</strong>.</li>
                    <li>You can also use <strong>Demo Scan QR</strong> or the manual buttons below at any time.</li>
                </ul>
            </div>
        </div>

        <div style="margin-bottom: 20px; display: flex; gap: 15px; flex-wrap: wrap;">
            <div>
                <label style="font-size: 13px; font-weight: 600; color: #475569; display: block; margin-bottom: 5px;">Select Event</label>
                <select id="coordEventSelect" onchange="refreshCoordinatorStudentTable()" style="padding: 8px 12px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 14px;">
                    <option value="Tech Fest 2026 - Day 1">Tech Fest 2026 - Day 1</option>
                    <option value="Annual Fest Rhythm">Annual Fest Rhythm</option>
                    <option value="Bot Wars Championship">Bot Wars Championship</option>
                </select>
            </div>
            <div>
                <label style="font-size: 13px; font-weight: 600; color: #475569; display: block; margin-bottom: 5px;">Search Student</label>
                <input type="text" id="coordStudentSearch" oninput="refreshCoordinatorStudentTable()" placeholder="Search by name or roll no." style="padding: 8px 12px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 14px; width: 240px;">
            </div>
        </div>

        <div id="coordinatorStudentTableContainer">
            ${buildCoordinatorStudentTable()}
        </div>
    `;
}

function buildCoordinatorStudentTable() {
    const searchInput = document.getElementById("coordStudentSearch");
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

    const filtered = coordinatorStudents.filter(st => {
        if (!query) return true;
        return st.name.toLowerCase().includes(query) || st.rollNo.toLowerCase().includes(query);
    });

    let rows = "";
    filtered.forEach(st => {
        rows += `
            <tr>
                <td>${st.rollNo}</td>
                <td><strong>${st.name}</strong></td>
                <td>${st.event}</td>
                <td>
                    ${
                        st.present
                            ? `<span class="status-pill status-present">Present</span>`
                            : `<span class="status-pill status-absent">Absent</span>`
                    }
                </td>
                <td>
                    ${
                        st.present
                            ? `<button class="btn-secondary" onclick="toggleCoordinatorStudent('${st.rollNo}')">Undo</button>`
                            : `<button class="btn-primary" onclick="toggleCoordinatorStudent('${st.rollNo}')">Mark Present</button>`
                    }
                </td>
            </tr>
        `;
    });

    return `
        <table>
            <thead>
                <tr>
                    <th>Roll No.</th>
                    <th>Student Name</th>
                    <th>Registered Event</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
    `;
}

function refreshCoordinatorStudentTable() {
    const container = document.getElementById("coordinatorStudentTableContainer");
    if (container) {
        container.innerHTML = buildCoordinatorStudentTable();
    }
}

function toggleCoordinatorStudent(rollNo) {
    const student = coordinatorStudents.find(s => s.rollNo === rollNo);
    if (student) {
        student.present = !student.present;
        refreshCoordinatorStudentTable();
    }
}

function startCoordinatorScanner() {
    const status = document.getElementById("coordinatorScanStatus");

    if (!window.Html5Qrcode) {
        if (status) {
            status.className = "scan-status scan-error";
            status.innerText = "QR scanner library could not be loaded.";
        }
        return;
    }

    if (coordinatorScannerRunning) {
        return;
    }

    const readerEl = document.getElementById("coordinator-qr-reader");
    if (readerEl) readerEl.innerHTML = "";

    coordinatorQrScanner = new Html5Qrcode("coordinator-qr-reader");

    coordinatorQrScanner
        .start(
            { facingMode: "environment" },
            { fps: 10, qrbox: { width: 230, height: 230 } },
            decodedText => {
                handleCoordinatorQRScan(decodedText);
            },
            () => {}
        )
        .then(() => {
            coordinatorScannerRunning = true;
            if (status) {
                status.className = "scan-status";
                status.innerText = "Camera active. Point at the student's Dummy QR Pass.";
            }
        })
        .catch(err => {
            console.error("Coordinator camera error:", err);
            if (status) {
                status.className = "scan-status scan-error";
                status.innerText = "Unable to access camera. Please allow camera permission or use 'Demo Scan QR'.";
            }
        });
}

function stopCoordinatorScanner() {
    if (!coordinatorQrScanner || !coordinatorScannerRunning) {
        return;
    }

    coordinatorQrScanner
        .stop()
        .then(() => {
            coordinatorScannerRunning = false;
            coordinatorQrScanner.clear();
            const status = document.getElementById("coordinatorScanStatus");
            if (status) {
                status.className = "scan-status";
                status.innerText = "Camera stopped.";
            }
        })
        .catch(err => console.error(err));
}

function handleCoordinatorQRScan(qrText) {
    stopCoordinatorScanner();

    let targetStudent = coordinatorStudents.find(s => !s.present) || coordinatorStudents[0];

    if (qrText && qrText.includes("CS")) {
        const matched = coordinatorStudents.find(s => qrText.includes(s.rollNo));
        if (matched) targetStudent = matched;
    }

    if (targetStudent) {
        targetStudent.present = true;
        refreshCoordinatorStudentTable();

        const status = document.getElementById("coordinatorScanStatus");
        if (status) {
            status.className = "scan-status scan-success";
            status.innerHTML = `
                <strong><i class="bi bi-check-circle-fill"></i> QR Scanned &amp; Attendance Marked!</strong><br>
                Student: <strong>${targetStudent.name} (${targetStudent.rollNo})</strong> — Marked Present
            `;
        }
    }
}

function simulateCoordinatorScan() {
    const nextAbsent = coordinatorStudents.find(s => !s.present) || coordinatorStudents[0];
    handleCoordinatorQRScan(`CC-PASS|${nextAbsent.rollNo}|${nextAbsent.name}`);
}

// Structured data for coordinator sections (Hosts list with venue details, Attendance, Monitor Activities, Help)
const coordinatorData = {
    hosts: {
        title: "Assigned Hosts & Scheduled Events",
        content: `
            <table>
                <thead>
                    <tr>
                        <th>Host / Society</th>
                        <th>Organized Event Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Venue / Location</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Coding Club</strong></td>
                        <td>Hackathon 2026 - CodeStorm</td>
                        <td>March 15, 2026</td>
                        <td>10:00 AM - 4:00 PM</td>
                        <td>Main Auditorium, Room 102</td>
                    </tr>
                    <tr>
                        <td><strong>Fine Arts Society</strong></td>
                        <td>Annual Fest Rhythm</td>
                        <td>April 02, 2026</td>
                        <td>5:30 PM - 9:30 PM</td>
                        <td>Open Air Amphitheatre</td>
                    </tr>
                    <tr>
                        <td><strong>Robotics Chapter</strong></td>
                        <td>Bot Wars Championship</td>
                        <td>Feb 10, 2026</td>
                        <td>11:00 AM - 3:00 PM</td>
                        <td>Engineering Block, Lab 4</td>
                    </tr>
                    <tr>
                        <td><strong>Literature Circle</strong></td>
                        <td>Poetry Slam Night</td>
                        <td>Jan 28, 2026</td>
                        <td>6:00 PM - 8:00 PM</td>
                        <td>Central Library Hall</td>
                    </tr>
                </tbody>
            </table>
        `
    },
    monitor: {
        title: "Monitor Event Activities",
        content: `
            <table>
                <thead>
                    <tr>
                        <th>Event</th>
                        <th>Host</th>
                        <th>Status</th>
                        <th>Attendance Marked</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Tech Fest 2026 - Day 1</td>
                        <td>Coding Club</td>
                        <td><span class="status-pill status-live">Ongoing</span></td>
                        <td>82 / 120</td>
                    </tr>
                    <tr>
                        <td>Annual Fest Rhythm</td>
                        <td>Fine Arts Society</td>
                        <td><span class="status-pill status-upcoming">Upcoming</span></td>
                        <td>&mdash;</td>
                    </tr>
                    <tr>
                        <td>Bot Wars Championship</td>
                        <td>Robotics Chapter</td>
                        <td><span class="status-pill status-ended">Ended</span></td>
                        <td>46 / 46</td>
                    </tr>
                </tbody>
            </table>
        `
    },
    help: {
        title: "Help Centre & Support",
        content: `
            <p style="font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 15px;">Need assistance with scanner tools, permissions, or reporting issues during live events? Contact the administrative desk or browse our FAQs below.</p>
            <ul>
                <li style="margin-bottom: 10px;"><strong>Q: How do I scan student Dummy QR passes?</strong><br><span style="color: #64748b;">A: Open Students (Attendance) from the sidebar, click Start Camera, and point the camera at the student's QR pass.</span></li>
                <li><strong>Q: Who should I contact in case of equipment failure at the venue?</strong><br><span style="color: #64748b;">A: Reach out immediately to the technical supervisor at support extension 404.</span></li>
            </ul>
        `
    }
};

// Switch view logic for Coordinator Dashboard
function switchView(viewName, element) {
    if (viewName !== 'attendance' && coordinatorScannerRunning) {
        stopCoordinatorScanner();
    }

    const dashboardView = document.getElementById('view-dashboard');
    const contentContainer = document.getElementById('view-content-container');
    const contentTitle = document.getElementById('content-title');
    const contentBody = document.getElementById('content-body');

    if (element) {
        document.querySelectorAll('.sidebar-menu a').forEach(link => link.classList.remove('active'));
        element.classList.add('active');
    }

    if (viewName === 'dashboard') {
        dashboardView.style.display = 'block';
        contentContainer.style.display = 'none';
    } else if (viewName === 'attendance') {
        dashboardView.style.display = 'none';
        contentContainer.style.display = 'block';
        contentTitle.innerText = "Scan & Mark Student Attendance";
        contentBody.innerHTML = renderCoordinatorAttendanceView();
    } else {
        dashboardView.style.display = 'none';
        contentContainer.style.display = 'block';

        const data = coordinatorData[viewName];
        if (data) {
            contentTitle.innerText = data.title;
            contentBody.innerHTML = data.content;
        }
    }
}