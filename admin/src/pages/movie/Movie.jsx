import './movie.css';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';
import { useState } from 'react';
import storage from '../../firebase';
import { useContext } from 'react';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { updateMovie } from '../../context/movieContext/apiCalls';

const Movie = () => {
    const location = useLocation();
    const movie = location.movie;

    const [updatedmovie, setUpdatedMovie] = useState(movie);
    const [img, setImg] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [video, setVideo] = useState(null);
    const [imgTitle, setImgTitle] = useState(null);
    const [uploaded, setUploaded] = useState(0);
    const [temp, setTemp] = useState([]);
    const [uploadIndicator, setUploadIndicator] = useState(false);

    const { dispatch } = useContext(MovieContext);

    const history = useHistory();

    const handleChange = (e) => {
        const value = e.target.value;
        setUpdatedMovie({ ...updatedmovie, [e.target.name]: value });
    };

    const upload = async (items) => {
        items.forEach(item => {
            const fileName = new Date().getTime() + item.label + item.file.name;
            const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(url => {
                        setUpdatedMovie(prev => {
                            return { ...prev, [item.label]: url }
                        });
                    });
                    setUploaded(prev => prev + 1);
                }
            );
        });
    };

    const handleUpload = (e) => {
        e.preventDefault();
        const items = [
            ...img ? [{ file: img, label: 'img' }] : [],
            ...video ? [{ file: video, label: 'video' }] : [],
            ...trailer ? [{ file: trailer, label: 'trailer' }] : [],
            ...imgTitle ? [{ file: imgTitle, label: 'imgTitle' }] : []
        ];
        setTemp(items);
        setUploadIndicator(true);
        if (items.length !== 0) {
            upload(items);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(updatedmovie);
        updateMovie(updatedmovie, dispatch);
        let path = '/movies';
        history.push(path);
    }

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Movie</h1>
                <Link to="/newMovie">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={movie.img} alt="" className="productInfoImg" />
                        <span className="productName">{movie.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">ID:</span>
                            <span className="productInfoValue">{movie._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Genre:</span>
                            <span className="productInfoValue">{movie.genre}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Year:</span>
                            <span className="productInfoValue">{movie.year}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Limit:</span>
                            <span className="productInfoValue">{movie.limit}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Movie Title</label>
                        <input type="text" id='title' name='title' onChange={handleChange} placeholder={movie.title} />
                        <label>Year</label>
                        <input type="text" id='year' name='year' onChange={handleChange} placeholder={movie.year} />
                        <label>Genre</label>
                        <input type="text" id='genre' name='genre' onChange={handleChange} placeholder={movie.genre} />
                        <label>Limit</label>
                        <input type="text" id='limit' name='limit' onChange={handleChange} placeholder={movie.limit} />
                        <label>Trailer</label>
                        <input type="file" id='trailer' name='trailer' onChange={e => setTrailer(e.target.files[0])} className='fileUpload' />
                        <label>Video</label>
                        <input type="file" id='video' name='video' onChange={e => setVideo(e.target.files[0])} className='fileUpload' />
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={movie.img} alt="" className="productUploadImg" />
                            <input type="file" id="img" name='img' onChange={e => setImg(e.target.files[0])} className='fileUpload' />
                        </div>
                        <div className="productUpload">
                            <img src={movie.imgTitle} alt="" className="productUploadImg" />
                            <input type="file" id="imgTitle" name='imgTitle' onChange={e => setImgTitle(e.target.files[0])} className='fileUpload' />
                        </div>
                        {
                            uploadIndicator && uploaded === temp.length ? (
                                <button onClick={handleSubmit} className="productButton">Update</button>
                            ) : (
                                <button onClick={handleUpload} className="productButton">Upload</button>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Movie;