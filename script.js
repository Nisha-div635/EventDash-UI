// =========================================
// START OF SCROLL REVEAL ANIMATION CODE 
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    // Select all elements that have the 'reveal' class
    const reveals = document.querySelectorAll('.reveal');

    // Create the Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // When the element enters the viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Optional: Stop observing once it's revealed so it doesn't animate again if you scroll up
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.15 // Triggers when 15% of the element is visible
    });

    // Apply the observer to each reveal element
    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
});
// =========================================
// END OF SCROLL REVEAL ANIMATION CODE 
// =========================================

// statistics
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 100; // Adjust speed (lower is faster)

    const animateCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    // Remove commas for calculation
                    const count = +counter.innerText.replace(/,/g, '');
                    
                    // Calculate increment
                    const inc = target / speed;

                    if (count < target) {
                        // Add increment, format with commas, and update
                        counter.innerText = Math.ceil(count + inc).toLocaleString();
                        setTimeout(updateCount, 15);
                    } else {
                        // Ensure final number is exact and formatted
                        counter.innerText = target.toLocaleString();
                    }
                };

                updateCount();
                // Stop observing once animated
                observer.unobserve(counter);
            }
        });
    };

    const observer = new IntersectionObserver(animateCounters, {
        threshold: 0.5 // Trigger when 50% visible
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
});