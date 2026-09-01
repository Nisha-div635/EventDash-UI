// Sidebar Expand/Collapse handled automatically via CSS hover states
// Optional helper hooks if explicit programmatic tracking is needed
function expandSidebar() {}
function collapseSidebar() {}

// Mock dataset storage for tables including Add button configs & Host Action items
const mockData = {
    hosts: {
        title: "Host Details",
        addLabel: "Add Host",
        headers: ["ID", "Host Name", "Society / Department", "Contact Email", "Status", "Actions"],
        rows: [
            ["#H01", "Dr. Robert Smith", "Tech Club", "robert.smith@campus.edu", "<span class='badge active'>Active</span>", "<button class='btn-accept'>Accept</button><button class='btn-reject'>Reject</button>"],
            ["#H02", "Prof. Alice Johnson", "Cultural Society", "alice.j@campus.edu", "<span class='badge active'>Active</span>", "<button class='btn-accept'>Accept</button><button class='btn-reject'>Reject</button>"],
            ["#H03", "Dr. Michael Brown", "Robotics Chapter", "mbrown@campus.edu", "<span class='badge active'>Active</span>", "<button class='btn-accept'>Accept</button><button class='btn-reject'>Reject</button>"],
            ["#H04", "Dr. Sarah Davis", "Literature Circle", "sarah.d@campus.edu", "<span class='badge pending'>Pending</span>", "<button class='btn-accept'>Accept</button><button class='btn-reject'>Reject</button>"]
        ]
    },
    coordinators: {
        title: "Coordinator Details",
        addLabel: "Add Coordinator",
        headers: ["ID", "Coordinator Name", "Assigned Host/Society", "Phone", "Role"],
        rows: [
            ["#C01", "Alex Turner", "Tech Club", "+1 555-0192", "Lead Tech"],
            ["#C02", "Emma Watson", "Cultural Society", "+1 555-0143", "Event Manager"],
            ["#C03", "Liam Miller", "Robotics Chapter", "+1 555-0188", "Logistics"],
            ["#C04", "Olivia Taylor", "Literature Circle", "+1 555-0121", "Public Relations"]
        ]
    },
    students: {
        title: "Registered Students Details",
        addLabel: "Add Student",
        headers: ["Reg ID", "Student Name", "Major / Branch", "Year", "Email"],
        rows: [
            ["#S01", "Daniel Craig", "Computer Science", "Junior", "d.craig@student.edu"],
            ["#S02", "Scarlett Johansson", "Electrical Eng.", "Senior", "scarlett@student.edu"],
            ["#S03", "Tom Holland", "Mechanical Eng.", "Sophomore", "tom.h@student.edu"],
            ["#S04", "Zendaya Coleman", "Architecture", "Freshman", "zendaya@student.edu"]
        ]
    },
    events: {
        title: "Total Events Overview",
        addLabel: "Add Event",
        headers: ["Event ID", "Event Title", "Organizer Host", "Date", "Status"],
        rows: [
            ["#E01", "Hackathon 2026", "Tech Club", "March 15, 2026", "<span class='badge live'>Live</span>"],
            ["#E02", "Annual Fest Rhythm", "Cultural Society", "April 02, 2026", "<span class='badge pending'>Upcoming</span>"],
            ["#E03", "Bot Wars Championship", "Robotics Chapter", "Feb 10, 2026", "<span class='badge active'>Completed</span>"],
            ["#E04", "Poetry Slam Night", "Literature Circle", "Jan 28, 2026", "<span class='badge active'>Completed</span>"]
        ]
    },
    help: {
        title: "Help Centre & Support Tickets",
        addLabel: null,
        headers: ["Ticket ID", "User Name", "Category", "Subject", "Status"],
        rows: [
            ["#T01", "Tom Holland", "Account Access", "Password reset issue", "<span class='badge pending'>Open</span>"],
            ["#T02", "Emma Watson", "Event Registration", "Unable to upload banner", "<span class='badge active'>Resolved</span>"]
        ]
    }
};

// Function to handle switching between Dashboard overview and Tabular views
function switchView(viewName, element) {
    const dashboardView = document.getElementById('view-dashboard');
    const tableViewContainer = document.getElementById('view-table-container');
    const tableTitle = document.getElementById('table-title');
    const dataTable = document.getElementById('data-table');
    const dynamicActionBtn = document.getElementById('dynamic-action-btn');
    const addBtnText = document.getElementById('add-btn-text');

    if (element) {
        document.querySelectorAll('.sidebar-menu a').forEach(link => link.classList.remove('active'));
        element.classList.add('active');
    }

    if (viewName === 'dashboard') {
        dashboardView.style.display = 'block';
        tableViewContainer.style.display = 'none';
    } else {
        dashboardView.style.display = 'none';
        tableViewContainer.style.display = 'block';

        const dataset = mockData[viewName];
        if (dataset) {
            tableTitle.innerText = dataset.title;
            
            // Handle conditional visibility of "Add New" button beside Back button
            if (dataset.addLabel) {
                dynamicActionBtn.style.display = 'flex';
                addBtnText.innerText = dataset.addLabel;
            } else {
                dynamicActionBtn.style.display = 'none';
            }
            
            // Build Table HTML dynamically
            let tableHTML = `<thead><tr>`;
            dataset.headers.forEach(header => {
                tableHTML += `<th>${header}</th>`;
            });
            tableHTML += `</tr></thead><tbody>`;

            dataset.rows.forEach(row => {
                tableHTML += `<tr>`;
                row.forEach(cell => {
                    tableHTML += `<td>${cell}</td>`;
                });
                tableHTML += `</tr>`;
            });
            tableHTML += `</tbody>`;

            dataTable.innerHTML = tableHTML;
        }
    }
}

function logoutAdmin(event) {
    event.preventDefault();
    
    // Clear the stored authentication and role tokens
    localStorage.removeItem('campusConnectAdminAuth');
    localStorage.removeItem('userRole');
    
    // Redirect back to the landing page
    window.location.href = 'home.html';
}

