   // Interactive search filter logic matching ongoing events page
        function filterEvents() {
            const query = document.getElementById('searchInput').value.toLowerCase();
            const category = document.getElementById('categoryFilter').value;
            const cards = document.querySelectorAll('.event-card');

            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const cardCategory = card.getAttribute('data-category');
                
                const matchesSearch = title.includes(query);
                const matchesCategory = (category === 'all' || cardCategory === category);

                if (matchesSearch && matchesCategory) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }