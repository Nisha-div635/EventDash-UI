function handleLogin(event) {
    event.preventDefault();

    const role = document.getElementById('roleSelect').value;
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('errorMsg');

    // Hide previous error message
    errorMsg.style.display = 'none';

    // Validate login credentials
    if (
        (role === 'admin' && user === 'admin' && pass === 'admin123') ||
        (role === 'coordinator' && user === 'coord' && pass === 'coord123') ||
        (role === 'host' && user === 'host' && pass === 'host123') ||
        (role === 'user' && user === 'user' && pass === 'user123')
    ) {

        // Store login information
        localStorage.setItem('userRole', role);
        localStorage.setItem('campusConnectAdminAuth', 'true');

        // Redirect to the appropriate dashboard
        if (role === 'admin') {
            window.location.href = 'admin.html';
        }
        else if (role === 'coordinator') {
            window.location.href = 'coordinator.html';
        }
        else if (role === 'host') {
            window.location.href = 'host.html';
        }
        else if (role === 'user') {
            window.location.href = 'user.html';
        }

    }
    else {
        // Show error message
        errorMsg.style.display = 'block';
    }
}


// Password visibility toggle
function togglePasswordVisibility() {

    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');

    if (passwordInput.type === 'password') {

        passwordInput.type = 'text';

        toggleIcon.classList.remove('bi-eye');
        toggleIcon.classList.add('bi-eye-slash');

    }
    else {

        passwordInput.type = 'password';

        toggleIcon.classList.remove('bi-eye-slash');
        toggleIcon.classList.add('bi-eye');

    }
}


// Hide error message when user starts entering information
document.addEventListener('DOMContentLoaded', () => {

    const inputs = document.querySelectorAll('input, select');

    inputs.forEach(input => {

        input.addEventListener('input', () => {

            document.getElementById('errorMsg').style.display = 'none';

        });

    });

});