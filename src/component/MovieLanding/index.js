import React, { useContext, useEffect, useState } from "react";
import imdb from "../../assets/image/IMDB_Logo_2016.svg";
import Spinner from "../../utils/Spinner";
import { PostContext } from "../../contexts/Context";
import { useNavigate } from "react-router-dom";

export default function MovieLanding() {
  const { state } = useContext(PostContext);
  const [loading, setLoading] = useState(false);
  const [sessionMovies, setSessionMovies] = useState();
  const nav = useNavigate();
  useEffect(() => {
    if (sessionMovies) {
      setLoading(true);
    }
  }, [sessionMovies]);

  async function getmoviesfromLocal() {
    if (state.selectedMovies[0]) {
      localStorage.setItem("movies", JSON.stringify(state.selectedMovies[0]));
    }
    let n = await localStorage.getItem("movies");
    setSessionMovies(JSON.parse(n));
  }
  useEffect(() => {
    getmoviesfromLocal();
  }, []);

  const handleclick = (e) => {
    nav("/seatBooking");
  };

  return (
    <>
      {loading ? (
        <div className="movielanding-container">
          <div className="landing-img-container">
            <div className="image-gradient"></div>
            <img
              src={sessionMovies?.others.posters?.backdrops[0]?.link}
              className="background-for-landing"
            />
          </div>

          <div className="row landing-row">
            <div className="col-md-4 col-lg-4 landing-col-img">
              {" "}
              <img src={sessionMovies?.image} className="poster-header" />
            </div>
            <div className="col-md-8 col-lg-8">
              <div className="content-text">
                <p className="content-title">{sessionMovies?.title}</p>
                <div className="movie-details from-top-to-down">
                  <div className="movie-detail">
                    <i className="fa-solid fa-star"></i>
                    <span>{sessionMovies?.others?.imDbRating}</span>
                  </div>
                  <div className="movie-detail">
                    <i className="fa-solid fa-clock"></i>
                    <span>{sessionMovies?.others?.runtimeStr}</span>
                  </div>
                  <div className="movie-detail">
                    <span></span>
                  </div>
                  <div className="movie-detail-genres">
                    <span>
                      {sessionMovies?.genreList.map((data, i) => {
                        return (
                          <button
                            className="btn btn-outline-danger btn-genres"
                            key={"btn-genres" + i}
                          >
                            {data.value}
                          </button>
                        );
                      })}
                    </span>
                  </div>
                </div>
                <div className="content-description from-top-to-down">
                  {sessionMovies?.plot}
                </div>
                <div className="landing-button">
                  <a
                    className="btn btn-hover btn-danger from-top-to-down"
                    id={sessionMovies?.id}
                    onClick={handleclick}
                  >
                    Book Ticket
                  </a>
                </div>
              </div>
              {sessionMovies?.others?.actorList && (
                <div
                  className="row landing-cast-row all-cast-row"
                  id="cast-row"
                >
                  <div className="col-md-12">
                    <h2 className="landing-cast-text">Cast</h2>
                    <div className="cast-actor-header" id="cast-actor-header">
                      {sessionMovies?.others?.actorList
                        ?.slice(0, 15)
                        .map((data, index) => {
                          return (
                            <div
                              className="inner-cast-header"
                              key={"cast-details" + index}
                            >
                              <img
                                className="cast-actor-img"
                                style={{ width: "150px", height: "150px" }}
                                src={data.image}
                              />
                              <p className="cast-actor-name">{data.name}</p>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          
         
          
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
