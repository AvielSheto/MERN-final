import axios from 'axios'
const API_URL = 'http://localhost:5000/api/movies/'

// Get movies
const getMovies = async ()=>{
    const response = await axios.get(API_URL)
    return response.data
}

// Get Movie
const getMovie = async (movieId)=>{
    const response = await axios.get(API_URL + movieId);
    return response.data
}

// Create movie
const createMovie = async (movieData) => {
    const response = await axios.post(API_URL, movieData);
    return response.data;
}

// Update movie 
const updateMovie = async (id, obj)=>{
    const response = await axios.put(API_URL + id, obj);
    return response.data;
}

// Delete Movie
const deleteMovie = async (movieId)=>{
    const response = await axios.delete(API_URL + movieId);
    return response.data
}

// const updateMovie = async (movieId)=>{
//     const 
// }

const movieService = {
    getMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie,
};

export default movieService;