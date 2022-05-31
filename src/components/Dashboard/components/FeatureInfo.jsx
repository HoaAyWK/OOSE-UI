import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import PersonIcon from '@mui/icons-material/Person';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './featureInfo.css';
export default function FeaturedInfo() {
  const dispatch = useDispatch();
  const [userList, setuserList] = useState([]);
  const [theaterList, settheaterList] = useState([]);
  const [movieList, setmovieList] = useState([]);
  const getUser = async () => {
    // const data = await dispatch(getAllusers());
    // const dataResult = unwrapResult(data);
    // setuserList(dataResult);
    // setuserList(dataResult);
  };
//   const getMovie = async () => {
//     const data = await dispatch(getFilmsSync());
//     const dataResult = unwrapResult(data);
//     setmovieList(dataResult);
//     // setuserList(dataResult);
//   };
//   const getTheater = async () => {
//     const data = await dispatch(getTheaterSystemSync());
//     const dataResult = unwrapResult(data);
//     settheaterList(dataResult);
//     // setuserList(dataResult);
//   };
  useEffect(() => {
    getUser();
    // getMovie();
    // getTheater();
  }, []);
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Users</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{userList.length}</span>
          <span className="featuredMoneyRate">
            <PersonIcon />
          </span>
        </div>
        <span className="featuredSub">All User of Griffin</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Movies</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{movieList.length}</span>
          <span className="featuredMoneyRate">
            <MovieCreationIcon />
          </span>
        </div>
        <span className="featuredSub">All Movie of Griffin</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Theater</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{theaterList.length}</span>
          <span className="featuredMoneyRate">
            <TheaterComedyIcon />
          </span>
        </div>
        <span className="featuredSub">All Theater of Griffin</span>
      </div>
    </div>
  );
}