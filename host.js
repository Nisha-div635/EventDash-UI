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
    window.location.href = 'home.html';
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
    attendance: {
        title: "Mark Student Attendance",
        content: `
            <div style="margin-bottom: 20px; display: flex; gap: 15px; flex-wrap: wrap;">
                <div>
                    <label style="font-size: 13px; font-weight: 600; color: #475569; display: block; margin-bottom: 5px;">Select Event</label>
                    <select style="padding: 8px 12px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 14px;">
                        <option>Tech Fest 2026 - Day 1</option>
                        <option>Annual Fest Rhythm</option>
                        <option>Bot Wars Championship</option>
                    </select>
                </div>
                <div>
                    <label style="font-size: 13px; font-weight: 600; color: #475569; display: block; margin-bottom: 5px;">Search Student</label>
                    <input type="text" placeholder="Search by name or roll no." style="padding: 8px 12px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 14px; width: 240px;">
                </div>
            </div>
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
                    <tr>
                        <td>CS2201</td>
                        <td>Ananya Patra</td>
                        <td>Tech Fest 2026 - Day 1</td>
                        <td><span class="status-pill status-present">Present</span></td>
                        <td><button class="btn-secondary">Undo</button></td>
                    </tr>
                    <tr>
                        <td>CS2214</td>
                        <td>Rohit Sahoo</td>
                        <td>Tech Fest 2026 - Day 1</td>
                        <td><span class="status-pill status-absent">Absent</span></td>
                        <td><button class="btn-primary">Mark Present</button></td>
                    </tr>
                    <tr>
                        <td>CS2230</td>
                        <td>Meera Nayak</td>
                        <td>Tech Fest 2026 - Day 1</td>
                        <td><span class="status-pill status-absent">Absent</span></td>
                        <td><button class="btn-primary">Mark Present</button></td>
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
                <li style="margin-bottom: 10px;"><strong>Q: How do I scan offline student QR passes?</strong><br><span style="color: #64748b;">A: Use the built-in scanner tool on the mobile app version or manual roll-number search above.</span></li>
                <li><strong>Q: Who should I contact in case of equipment failure at the venue?</strong><br><span style="color: #64748b;">A: Reach out immediately to the technical supervisor at support extension 404.</span></li>
            </ul>
        `
    }
};

// Switch view logic for Host Dashboard
function switchView(viewName, element) {
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