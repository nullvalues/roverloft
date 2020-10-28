import React from 'react';
import {Router, Route, Redirect } from 'react-router-dom';

import { authenticationService, history } from '../_services';
import { LoginPage } from '../LoginPage';
import { Root } from '../Root';


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)

class Loft extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login')
    }

    render() {
        const { currentUser } = this.state;
        return (
            <Router history={history}>
                <div>
                    {currentUser &&
                    <div>
                        <div>
                            <div onClick={this.logout} style={{textDecoration:'underline', fontFamily:'arial'}}>Logout</div>
                        </div>
                    </div>
                    }
                </div>
                <div>
                    <p>Appropriate header message here...</p>
                    <PrivateRoute exact path="/" component={Root} />
                    <Route path="/login" component={LoginPage} />
                </div>
            </Router>
        );
    }
}

export { Loft };