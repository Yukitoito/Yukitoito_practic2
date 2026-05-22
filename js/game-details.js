function getGameIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function renderGameDetails() {
    const container = document.getElementById('details');
    const gameId = getGameIdFromUrl();
    
    if (!gameId) {
        container.innerHTML = '<div class="no-data">Игра не найдена</div>';
        return;
    }
    
    const game = getGame(parseInt(gameId));
    
    if (!game) {
        container.innerHTML = '<div class="no-data">Игра не найдена</div>';
        return;
    }
    
    container.innerHTML = `
        <h2>${escapeHtml(game.title)}</h2>
        <div class="detail-item"><strong>ЖАНР:</strong> ${escapeHtml(game.genre)}</div>
        <div class="detail-item"><strong>ГОД:</strong> ${game.year}</div>
        <div class="detail-item"><strong>ПЛАТФОРМА:</strong> ${escapeHtml(game.platform)}</div>
        ${game.developer ? `<div class="detail-item"><strong>РАЗРАБОТЧИК:</strong> ${escapeHtml(game.developer)}</div>` : ''}
        ${game.description ? `<div class="detail-item"><strong>ОПИСАНИЕ:</strong> ${escapeHtml(game.description)}</div>` : ''}
        <div class="actions">
            <a href="index.html" class="btn">НАЗАД</a>
            <a href="admin.html" class="btn">РЕДАКТИРОВАТЬ</a>
        </div>
    `;
}

if (document.getElementById('details')) {
    renderGameDetails();
}