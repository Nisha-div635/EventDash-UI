function handleLogin(event) {
    event.preventDefault();

    const role = document.getElementById('roleSelect').value;
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('errorMsg');

    // Simple mock credential check for frontend prototype testing
    if (role === 'admin' && user === 'admin' && pass === 'admin123') {
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('campusConnectAdminAuth', 'true');
        window.location.href = 'admin.html'; // Redirect to Admin Dashboard
    } 
    else if (role === 'coordinator' && user === 'coord' && pass === 'coord123') {
        localStorage.setItem('userRole', 'coordinator');
        localStorage.setItem('campusConnectAdminAuth', 'true');
        window.location.href = 'coordinator.html'; // Redirect to Coordinator Dashboard
    } 
    else if(role === 'host' && user === 'host' && pass === 'host123'){
        localStorage.setItem('userRole', 'coordinator');
        localStorage.setItem('campusConnectAdminAuth', 'true');
        window.location.href = 'host.html'; // Redirect to host Dashboard
    }
    else if(role === 'user' && user === 'user' && pass === 'user123' ){
        localStorage.setItem('userRole', 'coordinator');
        localStorage.setItem('campusConnectAdminAuth', 'true');
        window.location.href = 'user.html'; // Redirect to user Dashboard
    }
    else {
        errorMsg.style.display = 'block';
    }
}