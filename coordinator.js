function expandSidebar() {}
function collapseSidebar() {}

function logoutCoordinator(event) {
    event.preventDefault();
    localStorage.removeItem('campusConnectAdminAuth');
    window.location.href = 'home.html';
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
                <li style="margin-bottom: 10px;"><strong>Q: How do I scan offline student QR passes?</strong><br><span style="color: #64748b;">A: Use the built-in scanner tool on the mobile app version or manual roll-number search above.</span></li>
                <li><strong>Q: Who should I contact in case of equipment failure at the venue?</strong><br><span style="color: #64748b;">A: Reach out immediately to the technical supervisor at support extension 404.</span></li>
            </ul>
        `
    }
};

// Switch view logic for Coordinator Dashboard
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

        const data = coordinatorData[viewName];
        if (data) {
            contentTitle.innerText = data.title;
            contentBody.innerHTML = data.content;
        }
    }
}