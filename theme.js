/**
 * CampusConnect - Unified Light / Dark Theme Controller
 * Handles persistent state across all pages via localStorage,
 * provides toggle mechanism, and dynamically injects the floating theme switcher.
 */

(function () {
    const THEME_STORAGE_KEY = 'campusConnectTheme';

    // 1. Immediately apply theme from storage or system preference to prevent FOUC
    function getPreferredTheme() {
        const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (storedTheme) {
            return storedTheme;
        }
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    }

    const initialTheme = getPreferredTheme();
    document.documentElement.setAttribute('data-theme', initialTheme);

    // 2. Global Toggle Function
    window.toggleTheme = function () {
        const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(targetTheme);
    };

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_STORAGE_KEY, theme);
        updateToggleElements(theme);
    }

    function updateToggleElements(theme) {
        const isDark = theme === 'dark';
        const tooltip = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';

        // Update all theme toggle icons
        const icons = document.querySelectorAll('.theme-toggle-icon');
        icons.forEach(icon => {
            if (isDark) {
                icon.className = 'bi bi-sun-fill theme-toggle-icon';
            } else {
                icon.className = 'bi bi-moon-stars-fill theme-toggle-icon';
            }
        });

        // Update button attributes
        const buttons = document.querySelectorAll('.theme-toggle-btn, .navbar-theme-toggle');
        buttons.forEach(btn => {
            btn.setAttribute('title', tooltip);
            btn.setAttribute('aria-label', tooltip);
        });
    }

    // 3. Setup on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';

        // Ensure floating toggle button exists on EVERY page
        if (!document.getElementById('floatingThemeToggle')) {
            const floatingBtn = document.createElement('button');
            floatingBtn.id = 'floatingThemeToggle';
            floatingBtn.className = 'theme-toggle-btn floating-theme-btn';
            floatingBtn.type = 'button';
            floatingBtn.setAttribute('title', currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
            floatingBtn.setAttribute('aria-label', 'Toggle Light and Dark Mode');
            floatingBtn.innerHTML = `<i class="bi ${currentTheme === 'dark' ? 'bi-sun-fill' : 'bi-moon-stars-fill'} theme-toggle-icon"></i>`;
            floatingBtn.addEventListener('click', window.toggleTheme);
            document.body.appendChild(floatingBtn);
        }

        // Attach click listeners to any in-navbar theme toggle buttons
        document.querySelectorAll('.navbar-theme-toggle').forEach(btn => {
            btn.addEventListener('click', window.toggleTheme);
        });

        updateToggleElements(currentTheme);
    });

    // 4. Sync across multiple tabs/windows in real time
    window.addEventListener('storage', (event) => {
        if (event.key === THEME_STORAGE_KEY && event.newValue) {
            document.documentElement.setAttribute('data-theme', event.newValue);
            updateToggleElements(event.newValue);
        }
    });
})();
