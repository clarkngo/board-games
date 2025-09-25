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

    const allTags = [...new Set(games.flatMap(g => g.tags))];
    let activeTags = [];

    tagsContainer.innerHTML = allTags.map(tag => `<span class="tag">${tag}</span>`).join('');

    const renderGames = () => {
        const filteredGames = activeTags.length === 0 ? games : games.filter(game => activeTags.every(tag => game.tags.includes(tag)));
        gameList.innerHTML = filteredGames.map(game => `
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
    };

    tagsContainer.addEventListener('click', e => {
        if (e.target.classList.contains('tag')) {
            const tag = e.target.textContent;
            e.target.classList.toggle('active');
            if (activeTags.includes(tag)) {
                activeTags = activeTags.filter(t => t !== tag);
            } else {
                activeTags.push(tag);
            }
            renderGames();
        }
    });

    renderGames();
});
