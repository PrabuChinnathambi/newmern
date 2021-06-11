import React, { Component } from 'react';
import './post.css';
import Axios from 'axios';
import { connect } from 'react-redux';
import Heart from "react-animated-heart";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';




const mapStateToProps = state => ({
    current_user: state.user
});


export class Posts extends Component {

    constructor(props) {
        super(props)

        this.state = {
            post: '',
            selectedFile: '',
            allPosts: [],
            clickedpost_id: "",
            isClick: false,
            current_user_name: this.props.current_user
        };

    }

    componentDidMount() {
        this.getAllPosts();
    }

    getAllPosts = () => {
        Axios.get('https://instagramtrends.herokuapp.com/getpost')
            .then((res) => {
                let itemList = res.data;
                let newitems = itemList.slice();
                this.setState({
                    allPosts: newitems,
                })
            })

    }

    convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    handleChangeImage = async (e) => {
        console.log("Uploading");
        const file = e.target.files[0]
        const base64 = await this.convertBase64(file)
        this.setState({
            selectedFile: base64
        })
        console.log("Uploaded");
    }

    handlePostData = () => {
        this.props.changeState();
        const { post, selectedFile, current_user_name } = this.state;
        const username = localStorage.getItem('username');
        const payload = {
            username: username,
            post: post,
            selectedFile: selectedFile
        }

        console.log(payload);

        Axios.post('https://instagramtrends.herokuapp.com/putpost', payload)
            .then((res) => {
                console.log(res.data._id)
                this.setState({
                    post: "",
                    selectedFile: ""
                })
                window.location.reload();

            })
            .catch((error) => {
                console.log(error);
            })

    }


    handlelike = async (id) => {

        const username = localStorage.getItem('username');
        const payload = {
            post_id: id,
            user_name: username,
        }
        console.log(payload);

        await Axios.post("https://instagramtrends.herokuapp.com/likes", payload)
            .then((res) => {
                console.log(res.data);
                // window.location.reload()
                this.setState({
                    isClick: !this.state.isClick
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }


    render() {
        this.getAllPosts();
        const { post, selectedFile, allPosts, clickedpost_id, isClick } = this.state

        return (
            <div>
                <div className="post_main">
                    <div className="whats_trending">
                        <div className="profile_pic">
                            <img src="https://i.pinimg.com/originals/32/c4/32/32c4323e2732b268159662781ddceac7.png" alt="Profile Pic" />
                        </div>
                        <div className="textarea">
                            <textarea placeholder="What's trending...?" value={post} onChange={(e) => {
                                this.setState({
                                    post: e.target.value
                                })
                            }}></textarea>

                            <div className="treand_links">
                                <div className="image-upload">
                                    <label for="file-input" className="icon">
                                        <img src="https://img.icons8.com/flat-round/2x/4a90e2/plus.png" alt="" /><span>Image</span>
                                    </label>
                                    <input id="file-input" type="file" onChange={this.handleChangeImage}
                                        encType="multipart/form-data"
                                        required />
                                </div>
                                <button onClick={this.handlePostData}>Trend</button>
                            </div>
                        </div>
                    </div>
                    <div className="allposts_main">

                        {
                            allPosts.reverse().map((item, i) => {
                                return (
                                    <div className="post_card" key={i}>
                                        <div className="post_profile_pic">
                                            <img src="https://i.pinimg.com/originals/32/c4/32/32c4323e2732b268159662781ddceac7.png" alt="Profile Pic" /> <h3>{item.username}</h3>
                                        </div>
                                        <div className="post_inside">
                                            <span>{item.post}</span>
                                            <div className="post_pic">
                                                <img src={item.selectedFile} alt="no" />
                                            </div>
                                        </div>
                                        <div key={i} className="like_count">
                                            <div className="like_image">
                                                <FormControlLabel  onClick={() => { this.handlelike(item._id) }}
                                                    control={<Checkbox icon={<FavoriteBorder />}
                                                        checkedIcon={<Favorite />}
                                                        name="checkedH" />}
                                                />
                                            </div>
                                            <span>{item.likes.length}</span>

                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Posts);
