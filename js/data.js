const STORAGE_KEY = 'games_catalog';

function getGames() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveGames(games) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
}

function addGame(game) {
    const games = getGames();
    game.id = Date.now();
    games.push(game);
    saveGames(games);
    return game;
}

function updateGame(id, newData) {
    const games = getGames();
    const index = games.findIndex(g => g.id == id);
    if (index !== -1) {
        games[index] = { ...games[index], ...newData };
        saveGames(games);
        return games[index];
    }
    return null;
}

function deleteGame(id) {
    const games = getGames();
    const filtered = games.filter(g => g.id != id);
    saveGames(filtered);
}

function getGame(id) {
    return getGames().find(g => g.id == id);
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

if (getGames().length === 0) {
    addGame({ title: 'The Legend of Zelda', genre: 'Экшен', year: 2017, platform: 'Nintendo Switch', developer: 'Nintendo', description: 'Отличная приключенческая игра с открытым миром' });
    addGame({ title: 'Cyberpunk 2077', genre: 'RPG', year: 2020, platform: 'PC', developer: 'CD Projekt Red', description: 'Ролевая игра в мире будущего' });
    addGame({ title: 'God of War Ragnarok', genre: 'Экшен', year: 2022, platform: 'PlayStation', developer: 'Santa Monica', description: 'Эпическое приключение по скандинавской мифологии' });
}