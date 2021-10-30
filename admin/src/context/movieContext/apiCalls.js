import { deleteMovieStart, deleteMovieSuccess, deleteMovieFailure, getMoviesFailure, getMoviesStart, getMoviesSuccess, createMovieStart, createMovieFailure, createMovieSuccess, updateMovieStart, updateMovieFailure, updateMovieSuccess } from "./MovieActions";
import axios from 'axios';

export const getMovies = async (dispatch) => {
    dispatch(getMoviesStart());
    try {
        const res = await axios.get('/movies', {
            headers: {
                token: 'bearer ' + JSON.parse(localStorage.getItem('user')).accessToken
            }
        });
        dispatch(getMoviesSuccess(res.data));
    }
    catch (err) {
        dispatch(getMoviesFailure());
    }
}

export const deleteMovie = async (id, dispatch) => {
    dispatch(deleteMovieStart());
    try {
        await axios.delete('/movies/' + id, {
            headers: {
                token: 'bearer ' + JSON.parse(localStorage.getItem('user')).accessToken
            }
        });
        dispatch(deleteMovieSuccess(id));
    }
    catch (err) {
        dispatch(deleteMovieFailure());
    }
};

export const createMovie = async (movie, dispatch) => {
    dispatch(createMovieStart());
    try {
        const res = await axios.post('/movies', movie, {
            headers: {
                token: 'bearer ' + JSON.parse(localStorage.getItem('user')).accessToken
            }
        });
        dispatch(createMovieSuccess(res.data));
    }
    catch (err) {
        dispatch(createMovieFailure());
    }
};

export const updateMovie = async (movie, dispatch) => {
    dispatch(updateMovieStart());
    try {
        const res = await axios.put('/movies/' + movie._id, movie, {
            headers: {
                token: 'bearer ' + JSON.parse(localStorage.getItem('user')).accessToken
            }
        });
        dispatch(updateMovieSuccess(res.data));
    }
    catch (err) {
        dispatch(updateMovieFailure());
    }
}