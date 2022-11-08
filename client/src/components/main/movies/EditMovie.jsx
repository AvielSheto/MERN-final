import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getMovie, updateMovie, reset } from '../../../features/movie/movieSlice'
import { toast } from 'react-toastify'
import Loading from '../../loading/Loading'
// mui
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Autocomplete from '@mui/material/Autocomplete';

function EditMovie() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams()
    // const [img, setImg ] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        genres: [],
        image: '',
        premiered: ''
    })
    const { name, genres, image, premiered } = formData;

    const { movies, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.movie
    )

    useEffect(() => {
        dispatch(getMovie(id))
        if (isError) {
            toast.error(message)
        }

        // if (isSuccess) {
        //     // navigate('/main/movies/allmovies')
        //     console.log(isSuccess);
        // }

        if (movies.length === 1) {
            setFormData(...movies)
        }
    }, [isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const movieData = {
            name,
            genres,
            image,
            premiered
        }
        console.log(movieData);

        dispatch(updateMovie(id , movieData))
        console.log(movies);
    }

    const addGenres = (value) => {
        // {
        //     value.InputProps.startAdornment?.map((genre) => {
        //         return (
        //             genres.push(genre.props.label)
        //         )
        //     })
        // }
    }

    const allGenres = [
        { title: 'Drama' },
        { title: 'Science-Fiction' },
        { title: 'Thriller' },
        { title: 'Action' },
        { title: 'Crime' },
        { title: 'Horror' },
        { title: 'Romance' },
        { title: 'Adventure' },
        { title: 'Espionage' },
        { title: 'Music' },
        { title: 'Mystery' },
    ];

    // if (isLoading) {
    //     return <Loading />
    // }

    return (
        <div>
            <Container className='form' maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <h1 className='display-3'>Edit Movie</h1>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="name"
                            label="Name"
                            type="text"
                            onChange={onChange}
                            value={name}
                            autoComplete="name"
                        />
                        <Autocomplete
                            multiple
                            id="size-small-standard-multi"

                            options={allGenres}
                            getOptionLabel={(genres) => genres}
                            value={genres}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined || value === "" || option.id === value.id
                            }
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    onChange={addGenres({ ...params })}
                                    required
                                    id="genres"
                                    value={genres}
                                    name="genres"
                                    {...params}
                                    label="Genres"
                                />
                            )}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="image"
                            label="Image URL"
                            type="text"
                            onChange={onChange}
                            value={image}
                            autoComplete="image"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="premiered"
                            label="Premiered"
                            type="text"
                            onChange={onChange}
                            value={premiered}
                            autoComplete="premiered"
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Edit Movie</Button>
                        <Grid container>

                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default EditMovie