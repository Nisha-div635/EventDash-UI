function handleLogin(event) {
    event.preventDefault(); // This stops the form from submitting normally

    const role = document.getElementById('roleSelect').value;
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('errorMsg');

    // Hide error message initially on submit attempt
    errorMsg.style.display = 'none';

    // Simple mock credential check for frontend prototype testing
    if (
        (role === 'admin' && user === 'admin' && pass === 'admin123') ||
        (role === 'coordinator' && user === 'coord' && pass === 'coord123') ||
        (role === 'host' && user === 'host' && pass === 'host123') ||
        (role === 'user' && user === 'user' && pass === 'user123')
    ) {
        localStorage.setItem('userRole', role);
        localStorage.setItem('campusConnectAdminAuth', 'true');
        
        // --- REDIRECTION DISABLED FOR TESTING ---
        // window.location.href = role + '.html'; 
        
        // Instead of redirecting, alert success so you can test animations & UI!
        alert(`Successfully validated as [${role.toUpperCase()}]. Redirection is currently paused for testing!`);
    } 
    else {
        // Show error message if credentials don't match
        errorMsg.style.display = 'block';
    }
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('bi-eye');
        toggleIcon.classList.add('bi-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('bi-eye-slash');
        toggleIcon.classList.add('bi-eye');
    }
}

// Clear error message when user starts typing again
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            document.getElementById('errorMsg').style.display = 'none';
        });
    });
});