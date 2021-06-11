import React, { Component } from 'react';
import { connect } from 'react-redux';



const mapStateToProps = state => ({
    current_user: state.user
});


export class CurrentUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current_user_name : ""
        }
    } 

    componentDidMount(){

        

        const name = localStorage.getItem('username');
        console.log(name)
        this.setState({
            current_user_name: name
        })
    }

  
    render() {
        const { current_user_name } = this.state;
        
        return (
            <div>
                <div>
                    <h2>Welcome {current_user_name}</h2 >
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(CurrentUser);
