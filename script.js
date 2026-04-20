document.addEventListener('DOMContentLoaded', () => {
    const games = [
        { name: 'Flamecraft', url: 'flamecraft.html', tags: ['strategy', 'fantasy', 'worker placement'] },
        { name: 'Tea Witches', url: 'tea_witches.html', tags: ['set collection', 'card game'] },
        { name: 'Splendor', url: 'splendor.html', tags: ['strategy', 'set collection', 'engine building'] },
        { name: 'Power Grid', url: 'power_grid.html', tags: ['strategy', 'economic', 'auction'] },
        { name: 'Bang! The Walking Dead', url: 'bang_walking_dead.html', tags: ['party game', 'deduction', 'player elimination'] },
        { name: '7 Wonders', url: '7_wonders.html', tags: ['strategy', 'card drafting', 'set collection'] },
        { name: 'Scythe', url: 'scythe.html', tags: ['strategy', 'economic', 'area control'] },
        { name: 'Century: Golem Edition', url: 'century_golem.html', tags: ['strategy', 'card game', 'engine building'] },
        { name: 'Secret Hitler', url: 'secret_hitler.html', tags: ['party game', 'deduction', 'social deduction'] },
        { name: 'Codenames', url: 'codenames.html', tags: ['party game', 'deduction', 'word game'] }
    ];

    const gameList = document.getElementById('game-list');
    const tagsContainer = document.querySelector('.tags-container');
    const searchInput = document.getElementById('search');
    const clearFiltersButton = document.getElementById('clear-filters');
    const resultsSummary = document.getElementById('results-summary');

    const allTags = [...new Set(games.flatMap((game) => game.tags))].sort();
    const activeTags = new Set();
    let query = '';

    const renderTagButtons = () => {
        tagsContainer.innerHTML = allTags
            .map((tag) => `<button class="tag" type="button" data-tag="${tag}">${tag}</button>`)
            .join('');
    };

    const getFilteredGames = () => {
        const normalizedQuery = query.trim().toLowerCase();
        return games.filter((game) => {
            const matchesTags = [...activeTags].every((tag) => game.tags.includes(tag));
            if (!matchesTags) {
                return false;
            }

            if (!normalizedQuery) {
                return true;
            }

            const haystack = `${game.name} ${game.tags.join(' ')}`.toLowerCase();
            return haystack.includes(normalizedQuery);
        });
    };

    const renderGames = () => {
        const filteredGames = getFilteredGames();

        if (filteredGames.length === 0) {
            gameList.innerHTML = '<p class="empty-state">No games match your filters yet.</p>';
            resultsSummary.textContent = 'Showing 0 games';
            return;
        }

        gameList.innerHTML = filteredGames.map((game) => `
            <div class="game-card">
                <a href="${game.url}">
                    <div class="game-card-image">${game.name}</div>
                    <div class="game-card-content">
                        <h3>${game.name}</h3>
                        <p>${game.tags.join(', ')}</p>
                    </div>
                </a>
            </div>
        `).join('');

        resultsSummary.textContent = `Showing ${filteredGames.length} game${filteredGames.length === 1 ? '' : 's'}`;
    };

    const syncTagButtonState = () => {
        const tagButtons = tagsContainer.querySelectorAll('.tag');
        tagButtons.forEach((button) => {
            button.classList.toggle('active', activeTags.has(button.dataset.tag));
        });
    };

    tagsContainer.addEventListener('click', (event) => {
        const tagButton = event.target.closest('.tag');
        if (!tagButton) {
            return;
        }

        const { tag } = tagButton.dataset;
        if (activeTags.has(tag)) {
            activeTags.delete(tag);
        } else {
            activeTags.add(tag);
        }

        syncTagButtonState();
        renderGames();
    });

    searchInput.addEventListener('input', (event) => {
        query = event.target.value;
        renderGames();
    });

    clearFiltersButton.addEventListener('click', () => {
        if (activeTags.size > 0 || query.length > 0) {
            activeTags.clear();
            query = '';
            searchInput.value = '';
            syncTagButtonState();
            renderGames();
        }
    });

    renderTagButtons();
    renderGames();
});
