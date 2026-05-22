function renderGames(games) {
    const grid = document.getElementById('grid');
    if (!grid) return;
    
    if (games.length === 0) {
        grid.innerHTML = '<div class="no-data">No games found</div>';
        return;
    }
    
    grid.innerHTML = games.map(game => `
        <div class="game-card" onclick="window.location.href='game.html?id=${game.id}'">
            <h3>${escapeHtml(game.title)}</h3>
            <div class="game-meta">
                <span class="genre">${escapeHtml(game.genre)}</span>
                <span class="year">${game.year}</span>
                <span class="platform">${escapeHtml(game.platform)}</span>
            </div>
            <div class="desc-preview">${escapeHtml(game.description?.substring(0, 80)) || 'No description'}${game.description?.length > 80 ? '...' : ''}</div>
            <button class="btn" onclick="event.stopPropagation(); window.location.href='game.html?id=${game.id}'">DETAILS</button>
        </div>
    `).join('');
}

function setupSearch() {
    const searchInput = document.getElementById('search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = getGames().filter(game => 
            game.title.toLowerCase().includes(term) || 
            game.genre.toLowerCase().includes(term) ||
            game.platform.toLowerCase().includes(term)
        );
        renderGames(filtered);
    });
}

if (document.getElementById('grid')) {
    renderGames(getGames());
    setupSearch();
}