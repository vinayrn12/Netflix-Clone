import { Visibility } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import './widgetSmall.css';
import axios from 'axios';

const WidgetSmall = () => {
    const [newUsers, setNewUsers] = useState([]);

    useEffect(() => {
        const getNewUsers = async () => {
            try {
                const res = await axios.get('/users?new=true', {
                    headers: {
                        token: "bearer " + JSON.parse(localStorage.getItem('user')).accessToken
                    }
                });
                setNewUsers(res.data);
            }
            catch (err) {
                console.log(err);
            }
        };
        getNewUsers();
    }, []);

    return (
        <div className="widgetSmall">
            <span className="widgetSmallTitle">New Join Members</span>
            <ul className="widgetSmallList">
                {newUsers.map((user) => (
                    <li className="widgetSmallListItem">
                        <img
                            src={user.profilePic || "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"}
                            alt=""
                            className="widgetSmallImage"
                        />
                        <div className="widgetSmallUser">
                            <span className="widgetSmallUsername">{user.username}</span>
                        </div>
                        <button className="widgetSmallButton">
                            <Visibility className='widgetSmallIcon' />
                            Display
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default WidgetSmall;