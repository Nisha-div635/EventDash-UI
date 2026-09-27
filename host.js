// Sidebar Hover Expansion Functions
function expandSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.add('expanded');
}

function collapseSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('expanded');
}

// Host/Coordinator Logout Handler
function logoutHost(event) {
    if (event) event.preventDefault();
    localStorage.removeItem('campusConnectAdminAuth');
    localStorage.removeItem('userRole');
    window.location.href = 'home.html';
}

/* =========================================================
   HOST STUDENT ATTENDANCE LIST & CAMERA SCANNER
========================================================= */

const hostStudents = [
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

let hostQrScanner = null;
let hostScannerRunning = false;

function renderHostAttendanceView() {
    return `
        <div class="info-box">
            <strong><i class="bi bi-camera-video"></i> Host QR Attendance Scanner:</strong>
            Use your camera to scan a student's Dummy Attendance QR Pass or manage their attendance manually below.
        </div>

        <div class="attendance-layout">
            <div class="scanner-card">
                <h3><i class="bi bi-qr-code-scan"></i> Scan Student QR Pass</h3>
                <p>Allow camera access and point your camera at the student's Dummy QR Pass.</p>

                <div id="host-qr-reader">
                    <span style="color: #64748b; font-size: 13px;"><i class="bi bi-camera"></i> Camera preview will appear here</span>
                </div>

                <div class="scanner-actions">
                    <button class="btn-primary" onclick="startHostScanner()">
                        <i class="bi bi-camera"></i> Start Camera
                    </button>
                    <button class="btn-secondary" onclick="stopHostScanner()">
                        Stop Camera
                    </button>
                    <button class="btn-secondary" onclick="simulateHostScan()" title="Test scanning a student QR pass">
                        <i class="bi bi-lightning-charge"></i> Demo Scan QR
                    </button>
                </div>

                <div id="hostScanStatus" class="scan-status">
                    Camera scanner is ready. Click "Start Camera" to scan student QR passes.
                </div>
            </div>

            <div class="attendance-info">
                <h3>Host Scanning Instructions</h3>
                <ul>
                    <li>Select your hosted event from the dropdown below.</li>
                    <li>Click <strong>Start Camera</strong> and allow browser camera permissions.</li>
                    <li>Ask participants to open <strong>Attendance QR</strong> on their User Dashboard and show their Dummy QR Pass.</li>
                    <li>Scan the QR pass to automatically mark the participant as <strong>Present</strong>.</li>
                    <li>You can also use <strong>Demo Scan QR</strong> or manual buttons in the table below.</li>
                </ul>
            </div>
        </div>

        <div style="margin-bottom: 20px; display: flex; gap: 15px; flex-wrap: wrap;">
            <div>
                <label style="font-size: 13px; font-weight: 600; color: #475569; display: block; margin-bottom: 5px;">Select Event</label>
                <select id="hostEventSelect" onchange="refreshHostStudentTable()" style="padding: 8px 12px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 14px;">
                    <option value="Tech Fest 2026 - Day 1">Tech Fest 2026 - Day 1</option>
                    <option value="Annual Fest Rhythm">Annual Fest Rhythm</option>
                    <option value="Bot Wars Championship">Bot Wars Championship</option>
                </select>
            </div>
            <div>
                <label style="font-size: 13px; font-weight: 600; color: #475569; display: block; margin-bottom: 5px;">Search Student</label>
                <input type="text" id="hostStudentSearch" oninput="refreshHostStudentTable()" placeholder="Search by name or roll no." style="padding: 8px 12px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 14px; width: 240px;">
            </div>
        </div>

        <div id="hostStudentTableContainer">
            ${buildHostStudentTable()}
        </div>
    `;
}

function buildHostStudentTable() {
    const searchInput = document.getElementById("hostStudentSearch");
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

    const filtered = hostStudents.filter(st => {
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
                            ? `<button class="btn-secondary" onclick="toggleHostStudent('${st.rollNo}')">Undo</button>`
                            : `<button class="btn-primary" onclick="toggleHostStudent('${st.rollNo}')">Mark Present</button>`
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

function refreshHostStudentTable() {
    const container = document.getElementById("hostStudentTableContainer");
    if (container) {
        container.innerHTML = buildHostStudentTable();
    }
}

function toggleHostStudent(rollNo) {
    const student = hostStudents.find(s => s.rollNo === rollNo);
    if (student) {
        student.present = !student.present;
        refreshHostStudentTable();
    }
}

function startHostScanner() {
    const status = document.getElementById("hostScanStatus");

    if (!window.Html5Qrcode) {
        if (status) {
            status.className = "scan-status scan-error";
            status.innerText = "QR scanner library could not be loaded.";
        }
        return;
    }

    if (hostScannerRunning) {
        return;
    }

    const readerEl = document.getElementById("host-qr-reader");
    if (readerEl) readerEl.innerHTML = "";

    hostQrScanner = new Html5Qrcode("host-qr-reader");

    hostQrScanner
        .start(
            { facingMode: "environment" },
            { fps: 10, qrbox: { width: 230, height: 230 } },
            decodedText => {
                handleHostQRScan(decodedText);
            },
            () => {}
        )
        .then(() => {
            hostScannerRunning = true;
            if (status) {
                status.className = "scan-status";
                status.innerText = "Camera active. Point at the student's Dummy QR Pass.";
            }
        })
        .catch(err => {
            console.error("Host camera error:", err);
            if (status) {
                status.className = "scan-status scan-error";
                status.innerText = "Unable to access camera. Please allow camera permission or use 'Demo Scan QR'.";
            }
        });
}

function stopHostScanner() {
    if (!hostQrScanner || !hostScannerRunning) {
        return;
    }

    hostQrScanner
        .stop()
        .then(() => {
            hostScannerRunning = false;
            hostQrScanner.clear();
            const status = document.getElementById("hostScanStatus");
            if (status) {
                status.className = "scan-status";
                status.innerText = "Camera stopped.";
            }
        })
        .catch(err => console.error(err));
}

function handleHostQRScan(qrText) {
    stopHostScanner();

    let targetStudent = hostStudents.find(s => !s.present) || hostStudents[0];

    if (qrText && qrText.includes("CS")) {
        const matched = hostStudents.find(s => qrText.includes(s.rollNo));
        if (matched) targetStudent = matched;
    }

    if (targetStudent) {
        targetStudent.present = true;
        refreshHostStudentTable();

        const status = document.getElementById("hostScanStatus");
        if (status) {
            status.className = "scan-status scan-success";
            status.innerHTML = `
                <strong><i class="bi bi-check-circle-fill"></i> QR Scanned &amp; Attendance Marked!</strong><br>
                Student: <strong>${targetStudent.name} (${targetStudent.rollNo})</strong> — Marked Present
            `;
        }
    }
}

function simulateHostScan() {
    const nextAbsent = hostStudents.find(s => !s.present) || hostStudents[0];
    handleHostQRScan(`CC-PASS|${nextAbsent.rollNo}|${nextAbsent.name}`);
}

// Structured data for host dashboard sections
const HostData = {
    createEvent: {
        title: "Create New Campus Event",
        content: `
            <form style="display: flex; flex-direction: column; gap: 15px; max-width: 600px;">
                <div>
                    <label style="font-size: 13px; font-weight: 600; color: #475569; display: block; margin-bottom: 5px;">Event Title</label>
                    <input type="text" placeholder="Enter event name" style="width: 100%; padding: 8px 12px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 14px;">
                </div>
                <div style="display: flex; gap: 15px;">
                    <div style="flex: 1;">
                        <label style="font-size: 13px; font-weight: 600; color: #475569; display: block; margin-bottom: 5px;">Date</label>
                        <input type="date" style="width: 100%; padding: 8px 12px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 14px;">
                    </div>
                    <div style="flex: 1;">
                        <label style="font-size: 13px; font-weight: 600; color: #475569; display: block; margin-bottom: 5px;">Venue / Room</label>
                        <input type="text" placeholder="e.g. Auditorium Room 102" style="width: 100%; padding: 8px 12px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 14px;">
                    </div>
                </div>
                <div>
                    <label style="font-size: 13px; font-weight: 600; color: #475569; display: block; margin-bottom: 5px;">Event Description</label>
                    <textarea rows="4" placeholder="Provide event details..." style="width: 100%; padding: 8px 12px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 14px;"></textarea>
                </div>
                <button type="button" class="btn-primary" style="padding: 10px 20px; background-color: #2563eb; color: #fff; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; width: fit-content;">Publish Event</button>
            </form>
        `
    },
    myEvents: {
        title: "My Managed Events",
        content: `
            <table>
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Date</th>
                        <th>Venue</th>
                        <th>Status</th>
                        <th>Registrations</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Tech Fest 2026 - Day 1</td>
                        <td>Sep 10, 2026</td>
                        <td>Main Auditorium</td>
                        <td><span class="status-pill status-live">Live</span></td>
                        <td>120</td>
                    </tr>
                    <tr>
                        <td>Startup Pitch Meetup</td>
                        <td>Sep 12, 2026</td>
                        <td>MBA Block Seminar Hall 3</td>
                        <td><span class="status-pill status-upcoming">Upcoming</span></td>
                        <td>85</td>
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
                <li style="margin-bottom: 10px;"><strong>Q: How do I scan student Dummy QR passes?</strong><br><span style="color: #64748b;">A: Open Scan Attendance from the sidebar or Attendance Manager on the dashboard, click Start Camera, and scan the student's QR pass.</span></li>
                <li><strong>Q: Who should I contact in case of equipment failure at the venue?</strong><br><span style="color: #64748b;">A: Reach out immediately to the technical supervisor at support extension 404.</span></li>
            </ul>
        `
    }
};

// Switch view logic for Host Dashboard
function switchView(viewName, element) {
    if (viewName !== 'attendance' && hostScannerRunning) {
        stopHostScanner();
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
        contentBody.innerHTML = renderHostAttendanceView();
    } else {
        dashboardView.style.display = 'none';
        contentContainer.style.display = 'block';

        const data = HostData[viewName];
        if (data) {
            contentTitle.innerText = data.title;
            contentBody.innerHTML = data.content;
        } else {
            contentTitle.innerText = "View Not Found";
            contentBody.innerHTML = "<p>The requested section could not be loaded.</p>";
        }
    }
}