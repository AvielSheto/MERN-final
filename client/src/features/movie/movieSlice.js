import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieService from "./movieService";

const initialState = {
    movies: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create new movie
export const createMovie = createAsyncThunk('movie/create', async (movieData, thunkAPI) => {
    try {
        // const token = thunkAPI.getState().auth.user.token
        return await movieService.createMovie(movieData)
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete Movie
const deleteMovie = createAsyncThunk('movie/delete', async (id, thunkAPI) => {
    try {
        return await movieService.deleteMovie(id)
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


// Movie slice 
export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createMovie.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createMovie.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true

            })
            .addCase(createMovie.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(deleteMovie.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteMovie.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.movies = state.movies.filter((movie) => movie._id !== action.payload.id)
            })
            .addCase(deleteMovie.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.message = action.payload
            })

    }
})

export const { reset } = movieSlice.actions
export default movieSlice.reducer