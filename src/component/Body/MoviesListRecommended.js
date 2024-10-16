import { movies } from "../../constants";
import React, { useContext, useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import imdb from "../../assets/image/IMDB_Logo_2016.svg";
import { PostContext } from "../../contexts/Context";
import { useNavigate } from "react-router-dom";
import { GET_MOVIES } from "../../contexts/Action.types";

const Cards = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { state, dispatch } = useContext(PostContext);
  const nav = useNavigate();
  const handleClick = (e) => {
    const e1 = e.target;
    if (e1.closest(".cards") !== null) {
      dispatch({ type: GET_MOVIES, payload: e.target.parentNode.id });
      nav("/movieDetails");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="card-segment">
      {isLoading
        ? Array(10)
            .fill("")
            .map((a, index) => {
              return (
                <div className="cards" key={"shimmer-" + index}>
                  <SkeletonTheme color="#202020" highlightColor="#444">
                    <Skeleton height={300} duration={2} />
                  </SkeletonTheme>
                </div>
              );
            })
        : movies.map((data, index) => {
            return (           <></> );
          })}
    </div>
  );
};

export default React.memo(Cards);
