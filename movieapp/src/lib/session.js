import storage from './localstorage'

function loggedIn() {
    return localStorage.getItem('sessionId');
}

function logIn(sessionId, user) {
    localStorage.setItem('sessionId', sessionId);
    storage.set('user', user);
    location.reload();
}

function logOut() {
    localStorage.removeItem('sessionId');
    localStorage.removeItem('user');
    location.reload();
}

function user(key) {
    let user = storage.get('user');
    if (!key) {
        return user
    }
    return user[key];
}

function isAdmin() {
    return user() && user().IS_ADMIN;
}

export default {
    user,
    isAdmin,
    loggedIn,
    logIn,
    logOut,
}