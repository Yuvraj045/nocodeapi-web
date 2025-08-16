import jwtDecode from "jwt-decode";

const tokenKey = "token";

function getUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        const user = jwtDecode(jwt);
        return user;
    } catch (ex) {
        return;
    }
}

function logout() {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem("name");
    localStorage.removeItem("email");
}

export default {
    getUser, logout
}
