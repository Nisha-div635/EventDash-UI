// Sidebar dynamic hover controls
function expandSidebar() {}
function collapseSidebar() {}

// Track active view state
let currentActiveView = 'dashboard';

// Dynamic Mock Dataset for Host Views
const mockHostData = {
    myEvents: {
        title: "My Hosted Events",
        addLabel: "Create Event",
        headers: ["Event Title", "Date", "Status", "Registrations", "Actions"],
        fields: ["Event Title", "Date", "Registrations"],
        rows: [
            ["Tech Fest 2026 - Day 1", "02 Aug 2026", "<span class='badge active'>Ongoing</span>", "120", "<button class='btn-secondary'>Edit</button> <button class='btn-danger'>Cancel</button>"],
            ["Cultural Night", "15 Aug 2026", "<span class='badge pending'>Upcoming</span>", "96", "<button class='btn-secondary'>Edit</button> <button class='btn-danger'>Cancel</button>"],
            ["Startup Pitch Meetup", "10 Jul 2026", "<span class='badge live'>Completed</span>", "46", "<button class='btn-secondary'>View Report</button>"]
        ]
    },
    gallery: {
        title: "Event Gallery Photos",
        addLabel: "Upload Photo",
        headers: ["Photo ID", "Event Name", "Uploaded Date", "Actions"],
        fields: ["Event Name", "Image URL/Title"],
        rows: [
            ["#IMG01", "Tech Fest 2026", "03 Aug 2026", "<button class='btn-danger'>Delete</button>"],
            ["#IMG02", "Cultural Night 2025", "16 Aug 2025", "<button class='btn-danger'>Delete</button>"]
        ]
    }
};

// Switch view sections dynamically
function switchView(viewName, element) {
    currentActiveView = viewName;
    const dashboardView = document.getElementById('view-dashboard');
    const createEventView = document.getElementById('view-create-event');
    const tableViewContainer = document.getElementById('view-table-container');

    // Highlight active link in sidebar
    if (element) {
        document.querySelectorAll('.sidebar-menu a').forEach(link => link.classList.remove('active'));
        element.classList.add('active');
    }

    if (viewName === 'dashboard') {
        dashboardView.style.display = 'block';
        createEventView.style.display = 'none';
        tableViewContainer.style.display = 'none';
    } else if (viewName === 'createEvent') {
        dashboardView.style.display = 'none';
        createEventView.style.display = 'block';
        tableViewContainer.style.display = 'none';
    } else {
        dashboardView.style.display = 'none';
        createEventView.style.display = 'none';
        tableViewContainer.style.display = 'block';
        renderTable(viewName);
    }
}

// Render dynamic tables for Host Views
function renderTable(viewName) {
    const tableTitle = document.getElementById('table-title');
    const dataTable = document.getElementById('data-table');
    const dynamicActionBtn = document.getElementById('dynamic-action-btn');
    const addBtnText = document.getElementById('add-btn-text');
    const dataset = mockHostData[viewName];

    if (dataset) {
        tableTitle.innerText = dataset.title;
        
        if (dataset.addLabel) {
            dynamicActionBtn.style.display = 'flex';
            addBtnText.innerText = dataset.addLabel;
            
            dynamicActionBtn.onclick = function() {
                if (viewName === 'myEvents') {
                    switchView('createEvent');
                } else {
                    addNewRow(viewName);
                }
            };
        } else {
            dynamicActionBtn.style.display = 'none';
        }

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

// Interactively add a row using prompt input
function addNewRow(viewName) {
    const dataset = mockHostData[viewName];
    if (!dataset || !dataset.fields.length) return;

    const newValues = [];
    for (let i = 0; i < dataset.fields.length; i++) {
        const inputVal = prompt(`Enter ${dataset.fields[i]}:`);
        if (inputVal === null) return;
        newValues.push(inputVal.trim());
    }

    let newRowData = [];
    if (viewName === 'gallery') {
        const id = `#IMG0${dataset.rows.length + 1}`;
        newRowData = [id, newValues[0], new Date().toLocaleDateString(), "<button class='btn-danger'>Delete</button>"];
    }

    dataset.rows.push(newRowData);
    renderTable(viewName);
}

// Handle Form Submission for Create Event Panel
function handleFormSubmit(event) {
    event.preventDefault();

    const title = document.getElementById('event-title-input').value;
    const date = document.getElementById('event-date-input').value;

    if (!title || !date) return;

    // Add entry into myEvents dataset
    mockHostData.myEvents.rows.push([
        title,
        date,
        "<span class='badge pending'>Upcoming</span>",
        "0",
        "<button class='btn-secondary'>Edit</button> <button class='btn-danger'>Cancel</button>"
    ]);

    // Clear Form Fields
    document.getElementById('create-event-form').reset();

    // Redirect to My Events view
    switchView('myEvents');
}

// Logout Action
function logoutHost(event) {
    event.preventDefault();
    localStorage.removeItem('campusConnectHostAuth');
    localStorage.removeItem('userRole');
    window.location.href = 'home.html';
}