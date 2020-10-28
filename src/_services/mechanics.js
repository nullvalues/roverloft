export const mechanics = {
    handleResponse
};

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log("Data is: ", data);
        if (!response.ok) {
            /* I'm not sure I agree with this approach...let's just comment out for now and see if there's
               some truth to the need.  I can't think of a reason that an authorization restriction should
               *force* a logout.  But maybe there's more to this we'll discover later.
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
                window.location.reload();
            }
            */

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}