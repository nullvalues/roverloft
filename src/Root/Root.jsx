import React from 'react';
import { authenticationService } from '../_services';
import { xBehavior} from "../_services";

class Root extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            payload: null
        };
    }

    componentDidMount() {
        xBehavior.getExes().then(payload => this.setState({ payload }));
    }

    render() {
        const { currentUser, payload } = this.state;
        console.log("Payload = ", payload, " Current User = ", currentUser);
        return (
            <div style={{backgroundColor:'lightblue'}}>
                <h1>Authenticated Application Root</h1>
                <h2>{currentUser.firstName} {currentUser.lastName}</h2>
                <p>Here are the exes you requested:</p>
                {payload &&
                    <table style={{border: '1px solid black', fontFamily:'arial', borderSpacing: '0px', padding: '3px'}}>
                        <tbody>
                    {payload.exes.map(ex =>
                            <tr>
                                <td style={{border: '1px dotted green', borderRight:'none'}} key={ex._id}>{ex._id}</td>
                                <td style={{border: '1px dotted green'}}>{ex.x}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                }
            </div>
        );
    }
}

export { Root };