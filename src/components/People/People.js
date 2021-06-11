import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import './people.css';

export class People extends Component {

    constructor(props) {
        super(props);
        this.state = {
            people: [],
            filterPeople: [],
            toggleimg:"https://img.icons8.com/flat-round/2x/plus.png"
        }
    }


    componentDidMount() {

        Axios.get("https://instagramtrends.herokuapp.com/getUserdata")
            .then((res) => {
                this.setState({
                    people: res.data
                })
                console.log(this.state.people);
            })
    }

    handleclickLink = () => {
        const {toggleimg} = this.state;
        const tick = "https://img.icons8.com/cotton/2x/checked--v3.png";
        
        this.setState({
            toggleimg: tick
        })



    }


    render() {

       

        const { people, filterPeople, toggleimg } = this.state;
        const current_user = localStorage.getItem("username");
        people.map((item, i) => {
            if (item.fullname !== current_user) {
                filterPeople.push(item);
            }
        })

        console.log(filterPeople);

        return (
            <div className="people_main">
                <div className="profile_page">
                    <div className="people_header">
                        <h2>Trending</h2>
                    </div>

                    <div className="suggested">
                        <span className="suggeted_word">Suggested</span>
                        <div>
                            {
                                filterPeople.map((item, i) => {
                                    return (
                                        <div>
                                            <div className="people_profile">
                                                <img src="https://i.pinimg.com/originals/32/c4/32/32c4323e2732b268159662781ddceac7.png" alt="Profile Pic" />
                                                <span>{item.fullname}</span>
                                            </div>
                                            <div className="add_people" >
                                                <img src={toggleimg} alt=""/>
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

export default People
