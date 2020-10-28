import React from 'react';
import { authenticationService } from '../_services';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) {
            this.props.history.push('/');
        }
    }
    render() {
        return (
            <div>
                <h2>Login</h2>
                <table>
                    <tbody>
                    <tr>
                        <td>Username</td><td><input type="textarea" name="username" id="username" cols="30" rows="1"/></td>
                    </tr>
                    <tr>
                        <td>Password</td><td><input type="password" name="userpass" id="userpass" cols="30" rows="1"/></td>
                    </tr>
                    <tr>
                        <td colSpan="2"><input type="button" value="Login" onClick={() => {
                            let user = document.getElementById('username').value;
                            let pass = document.getElementById('userpass').value;
                            authenticationService.login(user, pass)
                                .then(
                                    user => {
                                        const { from } = this.props.location.state || { from: { pathname: "/" } };
                                        this.props.history.push(from);
                                        window.location.reload();
                                    }
                                );
                        }}/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export { LoginPage };