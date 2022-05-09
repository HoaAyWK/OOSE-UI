const key = 'authenticated';

class TokenService {
    getLocalRefreshToken() {
        const user = JSON.parse(localStorage.getItem(key));
        return user?.resfreshToken;
    }

    getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem(key));
        return user?.token;
    }

    updateLocalAccessToken(token) {
        let user = JSON.parse(localStorage.getItem(key));
        user.token = token;
        localStorage.setItem(key, JSON.stringify(user));
    }

    updateRefreshToken(refreshToken) {
        let user = JSON.parse(localStorage.getItem(key));
        user.resfreshToken = refreshToken;
        localStorage.setItem(key, JSON.stringify(user));
    }

    getUser() {
        return JSON.parse(localStorage.getItem(key));
    }

    setUser(user) {
        localStorage.setItem(key, JSON.stringify(user));
    }

    removeUser() {
        localStorage.removeItem(key);
    }

}

export default new TokenService();