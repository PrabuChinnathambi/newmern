import React, { Component } from 'react';
import './home.css';
import { Link } from "react-router-dom";
import CurrentUser from './CurrentUser';
import Posts from '../Posts/Posts';
import Profile from '../Profile/Profile';


export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlag: true
        }
    }

    handleFlagStatus = () => {
        this.setState({
            isFlag: !this.state.isFlag
        })
    }

    render() {
        console.log(this.state.isFlag);
        return (
            <div>
                <div className="home_page">
                    <div className="home_left">
                        <div className="home_links">
                            <div className="logo">
                                <Link to="/home"><img src="https://i.pinimg.com/originals/32/c4/32/32c4323e2732b268159662781ddceac7.png" alt="Trending" /></Link>
                            </div>
                            <div className="navi_links">
                                <Link to="/home"><div className="home"><img src="https://img.icons8.com/ios/2x/home.png" /></div></Link>
                                <Link to="/hastag"><div className="home"><img src="https://img.icons8.com/ios/2x/hashtag.png" /></div></Link>
                                <Link to="/notify"><div className="home"><img src="https://img.icons8.com/ios/2x/appointment-reminders.png" /></div></Link>
                                <Link to="/message"><div className="home"><img src="https://img.icons8.com/ios/2x/edit-message.png" /></div></Link>
                                <Link to="/userprofile"><div className="home"><img src="https://img.icons8.com/ios/2x/user-location.png" /></div></Link>
                            </div>
                        </div>

                    </div>
                    <div className="home_middle">
                        <div className="top_dt">
                            <div className="title">
                                <h2>Home</h2>
                            </div>
                            <div className="current_user">
                                <CurrentUser />
                            </div>

                        </div>
                        <hr></hr>
                        <Posts changeState={this.handleFlagStatus} />

                    </div>
                    <div className="home_right">
                        <Profile />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
