/* eslint-disable react/prop-types */
import React from "react";
import { useGetUserQuery } from "../../service/userApi";
import "./Review.scss";
import { getCountryFlag } from "../../utils/getCountryFlag";

const Review = ({ review }) => {
  const { data: userData, isLoading, isError } = useGetUserQuery(review.userId);

  const country = getCountryFlag(userData?.country);
  console.log(country);

  return (
    <div className="review">
      {isLoading ? (
        "loading"
      ) : isError ? (
        "error"
      ) : (
        <div className="user">
          <img
            className="pp"
            src={userData.img || "/img/noavatar.jpg"}
            alt=""
          />
          <div className="info">
            <span>{userData.username}</span>
            <div className="country">
              <span>{userData.country}</span>
              <span className="flag">
                <img src={country.mini} alt="" />
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="stars">
        {Array(review.star)
          .fill()
          .map((item, i) => (
            <img src="/img/star.png" alt="" key={i} />
          ))}
        <span>{review.star}</span>
      </div>
      <p>{review.desc}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <img src="/img/like.png" alt="" />
        <span>Yes</span>
        <img src="/img/dislike.png" alt="" />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;

