let editingId = null;

function renderGamesList() {
    const container = document.getElementById('gamesList');
    if (!container) return;
    
    const games = getGames();
    
    if (games.length === 0) {
        container.innerHTML = '<div class="no-data">Нет игр</div>';
        return;
    }
    
    container.innerHTML = games.map(game => `
        <div class="admin-item">
            <div>
                <h4>${escapeHtml(game.title)}</h4>
                <small>${escapeHtml(game.genre)} | ${game.year}</small>
            </div>
            <div>
                <button class="edit" onclick="editGame(${game.id})">ИЗМЕНИТЬ</button>
                <button class="delete" onclick="deleteGameConfirm(${game.id})">УДАЛИТЬ</button>
            </div>
        </div>
    `).join('');
}

function editGame(id) {
    const game = getGame(id);
    if (game) {
        editingId = id;
        document.getElementById('formTitle').textContent = 'ИЗМЕНИТЬ ИГРУ';
        document.getElementById('gameId').value = game.id;
        document.getElementById('title').value = game.title;
        document.getElementById('genre').value = game.genre;
        document.getElementById('year').value = game.year;
        document.getElementById('platform').value = game.platform;
        document.getElementById('developer').value = game.developer || '';
        document.getElementById('description').value = game.description || '';
    }
}

function resetForm() {
    editingId = null;
    document.getElementById('formTitle').textContent = 'ДОБАВИТЬ ИГРУ';
    document.getElementById('gameForm').reset();
    document.getElementById('gameId').value = '';
}

function deleteGameConfirm(id) {
    if (confirm('Удалить эту игру?')) {
        deleteGame(id);
        if (editingId === id) resetForm();
        renderGamesList();
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const gameData = {
        title: document.getElementById('title').value.trim(),
        genre: document.getElementById('genre').value.trim(),
        year: parseInt(document.getElementById('year').value),
        platform: document.getElementById('platform').value.trim(),
        developer: document.getElementById('developer').value.trim(),
        description: document.getElementById('description').value.trim()
    };
    
    if (!gameData.title || !gameData.genre || !gameData.year || !gameData.platform) {
        alert('Заполните все обязательные поля');
        return;
    }
    
    const gameId = document.getElementById('gameId').value;
    
    if (gameId) {
        updateGame(parseInt(gameId), gameData);
        alert('Игра обновлена');
    } else {
        addGame(gameData);
        alert('Игра добавлена');
    }
    
    resetForm();
    renderGamesList();
}

function setupForm() {
    const form = document.getElementById('gameForm');
    if (!form) return;
    
    form.addEventListener('submit', handleFormSubmit);
    
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', resetForm);
    }
}

window.editGame = editGame;
window.deleteGameConfirm = deleteGameConfirm;

if (document.getElementById('gamesList')) {
    renderGamesList();
    setupForm();
}