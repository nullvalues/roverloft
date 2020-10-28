import { BehaviorSubject } from 'rxjs';
import { mechanics } from '../_services'

let apiUrl = "http://localhost:3030";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value },
    authHeader,
    authString
};

function login(username, userpass) {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({"username":username,"userpass":userpass});

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${apiUrl}/auth/authenticate`, requestOptions)
        .then(mechanics.handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return Promise.resolve(user);
        })
        .catch(error => console.log('error', error));
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

function authHeader() {
    // return authorization header with jwt token
    const currentUser = currentUserSubject.value;
    if (currentUser && currentUser.token) {
        return `Bearer ${currentUser.token}`;
    } else {
        return '';
    }
}

function authString() {
    // return authorization header with jwt token
    const currentUser = currentUserSubject.value;
    if (currentUser && currentUser.token) {
        return { Authorization: `Bearer ${currentUser.token}` };
    } else {
        return {};
    }
}
