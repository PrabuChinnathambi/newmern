import React, { Component } from 'react';
import './profile.css'
import Axios from 'axios';
import { Link } from 'react-router-dom';

export class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userDatas: [],
            filterderdData: [],
            toggleImg: false,
        }
    }

    componentDidMount() {

        const username = localStorage.getItem("username");
        const payload = {
            fullname: username
        }

        Axios.get("https://instagramtrends.herokuapp.com/getUserdata", payload)
            .then((res) => {
                this.setState({
                    userDatas: res.data
                })

            })

        const { userDatas, filterderdData } = this.state;


    }

    handleAddFriends = () => {
        this.setState({
            toggleImg: !this.state.toggleImg
        })

        console.log(this.state.toggleImg)

    }

    render() {
        const { userDatas, filterderdData, toggleImg } = this.state;
        const username = localStorage.getItem("username");
        const userdetails = userDatas.find(val => val.fullname === username)

        const filterDetails = userDatas.map((item, i) => {
            if (item.fullname !== username) {
                return (
                    filterderdData.push(item)
                );
            }
        })


        const toppeople = filterderdData.slice(0, 5);




        return (
            <div>
                <div className="profile_left">
                    <div className="profile_card">

                        <div className="profile_img">
                            <img src="https://i.pinimg.com/originals/32/c4/32/32c4323e2732b268159662781ddceac7.png" alt="Profile Pic" />
                        </div>

                        <div className="profile_username_email">
                            <div>
                                {
                                    userdetails ? (<div>
                                        <span className="username">{userdetails.fullname}</span>
                                    </div>) : ""
                                }
                            </div>
                            <div>
                                {
                                    userdetails ? (<div>
                                        <span className="email">{userdetails.email}</span>
                                    </div>) : ""
                                }
                            </div>
                        </div>

                    </div>
                    <div className="suggestions">
                        <span className="suggestion_title">Suggestions For You</span>
                        <Link to='/people' className="see_all_link">
                            <span>See All</span>
                        </Link>
                        <div>
                            {
                                toppeople.map((item, i) => {
                                    return (
                                        <div key={i}>
                                            <div className="suggestion_profile_main">
                                                <div className="suggestion_profile">
                                                    <img src="https://i.pinimg.com/originals/32/c4/32/32c4323e2732b268159662781ddceac7.png" alt="Profile Pic" />
                                                    <span>{item.fullname}</span>
                                                </div>
                                                <div className="add_people_plus_link" >
                                                    <div onClick={() => { this.handleAddFriends() }}>
                                                        {
                                                            toggleImg ? <span className="imglink"><img src="https://img.icons8.com/plasticine/2x/checked-2.png" alt="" /></span> : <span className="imglink"><img src="https://img.icons8.com/flat-round/2x/plus.png" alt="" /></span>
                                                        }</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default Profile
