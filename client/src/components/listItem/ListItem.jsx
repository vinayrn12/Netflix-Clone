import "./listItem.scss";
import {
    PlayArrow,
    Add,
    ThumbUpAltOutlined,
    ThumbDownOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListItem({ index, item }) {
    const [isHovered, setIsHovered] = useState(false);
    const [movie, setMovie] = useState({});

    useEffect(() => {
        const getMovie = async () => {
            try {
                const res = await axios.get("/movies/find/" + item, {
                    headers: {
                        token:
                            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzM5YmQyMDM0ZDhkZjE3ZWE2ZmVkZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNTQ5NjU4NywiZXhwIjoxNjM1OTI4NTg3fQ.YCsRrRvW3tvCmVDzBULTkcnyOCHrEAILa5B34dTlAm8",
                    },
                });
                setMovie(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getMovie();
    }, [item]);

    return (
        <>
            <Link to={{ pathname: "/watch", movie: movie }}>
                <div
                    className="listItem"
                    style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <img src={movie?.imgSm} alt="" />
                    {isHovered && (
                        <>
                            <video src={movie.trailer} autoPlay={true} loop />
                            <div className="itemInfo">
                                <div className="icons">
                                    <PlayArrow className="icon" />
                                    <Add className="icon" />
                                    <ThumbUpAltOutlined className="icon" />
                                    <ThumbDownOutlined className="icon" />
                                </div>
                                <div className="itemInfoTop">
                                    <span>{movie.title}</span>
                                    <span>{movie.duration}</span>
                                    <span className="limit">+{movie.limit}</span>
                                    <span>{movie.year}</span>
                                </div>
                                <div className="desc">{movie.desc && movie.desc.substring(0, 180)}...</div>
                                <div className="duration">{movie.duration}</div>
                                <div className="genre">{movie.genre}</div>
                            </div>
                        </>
                    )}
                </div>
            </Link>
        </>
    );
}