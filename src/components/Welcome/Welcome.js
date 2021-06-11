import React, { Component } from 'react';
import Login from '../Login/Login';
import Register from '../Register/Register';
import './welcome.css';

export class Welcome extends Component {
    render() {
        return (
            <div>
                <div className="welcome_page">
                    <div className="welcome_left">
                        <img src="https://i.pinimg.com/originals/32/c4/32/32c4323e2732b268159662781ddceac7.png" alt="Trending" />
                    </div>
                    <div className="welcome_right">
                        <h1>Trending now</h1>
                        <h3>Join Trending today</h3>
                        <Register/>
                        <Login/>
                        
                    </div>
                </div>
                <div className="copywrite">
                    <span> © 2021 Trending, Inc.</span>
                </div>

            </div>

        )
    }
}

export default Welcome
