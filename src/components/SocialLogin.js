 import React, { Component } from 'react'
 import FacebookLogin from 'react-facebook-login'
 import GoogleLogin from 'react-google-login'
 import config from '../config.json'

 class SocialLogin extends Component {
    constructor() {
        super();
        this.state = { isAuthenticated: false, user: null, token: ''};
    }

    logout = () => {
        this.setState({isAuthenticated: false, token: '', user: null})
    };

    facebookResponse = (response) => {
        console.log(response);
        var loggedUser = {
            email : response["email"],
            name : response["name"]
        }
        var tok = response["accessToken"]
        this.setState({isAuthenticated: true, user:loggedUser, token:tok});
    };

    googleResponse = (response) => {
        console.log(response);
        var loggedUser = {
            email : response["Pt"]["yu"],
            name : response["Pt"]["Ad"]
        }
        var tok = response["accessToken"]
        this.setState({isAuthenticated: true, user:loggedUser, token:tok});
    };

    onFailure = (error) => {
      alert(error);
    }

    render() {
        let content = !!this.state.isAuthenticated ?
            (
                <div>
                    <p>Authenticated</p>
                    <div>
                        {this.state.user.email}
                    </div>
                    <div>
                        <button onClick={this.logout} className="button">
                            Log out
                        </button>
                    </div>
                </div>
            ) :
            (
                <div>
                    <FacebookLogin
                        appId={config.FACEBOOK_APP_ID}
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={this.facebookResponse} />
                    <GoogleLogin
                        clientId={config.GOOGLE_CLIENT_ID}
                        buttonText="Login"
                        onSuccess={this.googleResponse}
                        onFailure={this.googleResponse}
                    />
                </div>
            );

        return (
            <div className="App">
                {content}
            </div>
        );
    }
 }

 export default SocialLogin
