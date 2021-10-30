import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from 'axios';

const Home = ({ type }) => {
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);

    useEffect(() => {
        const getRandomLists = async () => {
            try {
                const res = await axios.get(`lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,
                    {
                        headers: {
                            token: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzM5YmQyMDM0ZDhkZjE3ZWE2ZmVkZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNTQ5NjU4NywiZXhwIjoxNjM1OTI4NTg3fQ.YCsRrRvW3tvCmVDzBULTkcnyOCHrEAILa5B34dTlAm8"
                        }
                    }
                );
                setLists(res.data);
            }
            catch (err) {
                console.log(err);
            }
        };
        getRandomLists();
    }, [type, genre]);

    return (
        <div className='home'>
            <Navbar />
            <Featured type={type} setGenre={setGenre} />
            {lists.map((list) => (
                <List list={list} />
            ))}
            <div className="emptySpace"></div>
        </div>
    )
}

export default Home;