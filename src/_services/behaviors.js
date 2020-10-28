import { authenticationService } from '../_services';
import { mechanics } from "../_services";

let apiUrl = "http://localhost:3030";
let exesPath = "/about/exes";

export const xBehavior = {
    getExes
};

function getExes() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", authenticationService.authHeader());

    let requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    return fetch(`${apiUrl}${exesPath}`, requestOptions)
        .then(mechanics.handleResponse);

}