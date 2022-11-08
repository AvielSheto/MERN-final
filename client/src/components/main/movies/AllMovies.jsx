import React, { useState, useEffect } from 'react';
import "./_movies.scss";
import { useDispatch, useSelector } from 'react-redux';
import { deleteMovie, getMovies, reset } from '../../../features/movie/movieSlice';
import { useNavigate } from 'react-router-dom';
import Loading from '../../loading/Loading';
// Mui 
import TextField from '@mui/material/TextField';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
// bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function AllMovies() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState();

  const { movies, isLoading, isError, message } = useSelector(
    (state) => state.movie
  )

  useEffect(() => {
    dispatch(getMovies())

    if (isError) {
      console.log(message)
    }
    
    return () => {
      dispatch(reset())
    }
  }, [isError, message, navigate, dispatch])

  if (isLoading) {
    return <Loading />
  }

  const handleDelete = (movieId) => {
    dispatch(deleteMovie(movieId))
    setSearch('');
  }

  const handleEdit = (movieId) => {
    navigate(`/main/editmovie/${movieId}`);
  }
  
  return (
    <>
      <div className='my-2'>
        <TextField onChange={(e) => { setSearch(e.target.value) }} label='Find Movie: ' variant="outlined" size="small" />
      </div>
      <div className='d-flex justify-content-center'>
        <div className='col-11 col-md-10'>
          <Row xs={2} sm={3} md={4}>
            {movies?.filter(filtered => {
              if (!search) {
                return filtered
              }
              else {
                return filtered?.name.toLowerCase().startsWith(search.toLowerCase())
              }
            }).map((movie) => {
              return (
                <Col className='movie p-2' key={movie._id}>
                  <div>
                    <DropdownButton title={<SettingsOutlinedIcon />} className='float-end m-0'>
                      <Dropdown.Item onClick={() => handleEdit(movie._id)}>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDelete(movie._id)}>Delete</Dropdown.Item>
                    </DropdownButton>
                    <h1 className='display-6 fs-3'>{movie.name}</h1>
                    <h1 className='display-6 fs-6 fw-light float-start'><strong className='fs-5 fw-light'>premiered: </strong>{movie.premiered}</h1>
                    <h1 className='display-6 fs-6 fw-light float-start'><strong className='fs-5 fw-light'>genres: </strong>{movie.genres.join()}</h1>
                    <img className='w-75' src={movie.image} alt="show" />
                  </div>
                </Col>
              )
            })}
          </Row>
        </div>
      </div>
    </>
  )
}

export default AllMovies