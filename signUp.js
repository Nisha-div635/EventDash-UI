 // Password Visibility Toggle Script
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

        // Dummy Resend OTP Action
        function handleResendOTP() {
            alert('A new OTP has been sent to your email/contact.');
        }

        // Dummy Signup Action
        function handleSignup(e) {
            e.preventDefault();
            alert('Sign up successful! Welcome to CampusConnect.');
        }