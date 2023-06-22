import React from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";
import { getCountryFlag } from "../../utils/getCountryFlag";

function Gig() {
  const { id } = useParams();
  // console.log(id);
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  const formattedCreatedAt = new Date(dataUser?.createdAt).toLocaleDateString();

  const country = getCountryFlag(dataUser?.country);

  return (
    <div className="gig">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              <h1>{data.cat}</h1>
            </span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <span>{dataUser.username}</span>
                {/* {console.log(dataUser)} */}
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {/* { console.log(Math.round(data.totalStars / data.starNumber),"gjkd")} */}
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {/* {console.log(data,"data from somthih")} */}
              {data.images.map((img) => (
                <img key={img} src={img} alt="" />
              ))}
            </Slider>
            <h2>About This Gig</h2>
            <p>{data.desc}</p>
            {/* {console.log(data)} */}
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img src={dataUser.img || "/img/noavatar.jpg"} alt="" />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src="/img/star.png" alt="" key={i} />
                          ))}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button>
                      Contact <h3>⬇</h3>
                    </button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      {dataUser.country}
                      <span className="desc">
                        <span className="flag">
                          <img src={country.normal} alt="" />
                        </span>
                      </span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">{formattedCreatedAt}</span>
                    </div>
                    <div className="item">
                      <span className="title">Email</span>
                      <span className="desc">{dataUser.email}</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                    <div className="item">
                      <span className="title">Desc</span>
                      <span className="desc">{dataUser.desc}</span>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            )}
            <Reviews gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>₹ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.deliveryTime} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />

                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Link to={`/pay/${id}`}>
              <button>Continue</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;

// import React from "react";
// import "./Gig.scss";
// import { Slider } from "infinite-react-carousel/lib";
// import { Link, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useGetGigByIdQuery, useGetUserByIdQuery } from "../../service/gigApi";
// import { useGetReviewsQuery } from "../../service/reviewsApi";
// import Reviews from "../../components/reviews/Reviews";
// // import { store } from "../../store/store";

// function Gig() {
//   const { id } = useParams();

//   const { data: gigData, error: gigError, isLoading: gigIsLoading } =
//     useGetGigByIdQuery(id);
//   const userId = gigData?.userId;

//   const { data: userData, error: userError, isLoading: userIsLoading } =
//     useGetUserByIdQuery(userId);

//   const formattedCreatedAt = new Date(userData?.createdAt).toLocaleDateString();

//   return (
//     <div className="gig">
//       {gigIsLoading ? (
//         "Loading..."
//       ) : gigError ? (
//         "Something went wrong!"
//       ) : (
//         <div className="container">
//           <div className="left">
//             <span className="breadcrumbs">
//               <h1>{gigData.cat}</h1>
//             </span>
//             <h1>{gigData.title}</h1>
//             {userIsLoading ? (
//               "Loading..."
//             ) : userError ? (
//               "Something went wrong!"
//             ) : (
//               <div className="user">
//                 <img
//                   className="pp"
//                   src={userData.user.img || "/img/noavatar.jpg"}
//                   alt=""
//                 />
//                 <span>{userData.username}</span>
//                 {!isNaN(gigData.totalStars / gigData.starNumber) && (
//                   <div className="stars">
//                     {Array(Math.round(gigData.totalStars / gigData.starNumber))
//                       .fill()
//                       .map((item, i) => (
//                         <img src="/img/star.png" alt="" key={i} />
//                       ))}
//                     <span>
//                       {Math.round(gigData.totalStars / gigData.starNumber)}
//                     </span>
//                   </div>
//                 )}
//               </div>
//             )}
//             <Slider slidesToShow={1} arrowsScroll={1} className="slider">
//               {gigData.images.map((img) => (
//                 <img key={img} src={img} alt="" />
//               ))}
//             </Slider>
//             <h2>About This Gig</h2>
//             <p>{gigData.desc}</p>
//             <div className="seller">
//               <h2>About The Seller</h2>
//               <div className="user">
//                 <img src={userData.img || "/img/noavatar.jpg"} alt="" />
//                 <div className="info">
//                   <span>{userData.username}</span>
//                   {!isNaN(gigData.totalStars / gigData.starNumber) && (
//                     <div className="stars">
//                       {Array(
//                         Math.round(gigData.totalStars / gigData.starNumber)
//                       )
//                         .fill()
//                         .map((item, i) => (
//                           <img src="/img/star.png" alt="" key={i} />
//                         ))}
//                       <span>
//                         {Math.round(gigData.totalStars / gigData.starNumber)}
//                       </span>
//                     </div>
//                   )}
//                   <button>
//                     Contact <h3>⬇</h3>
//                   </button>
//                 </div>
//               </div>
//               <div className="box">
//                 <div className="items">
//                   <div className="item">
//                     <span className="title">From</span>
//                     <span className="desc">{userData.country}</span>
//                   </div>
//                   <div className="item">
//                     <span className="title">Member since</span>
//                     <span className="desc">{formattedCreatedAt}</span>
//                   </div>
//                   <div className="item">
//                     <span className="title">Email</span>
//                     <span className="desc">{userData.email}</span>
//                   </div>
//                   <div className="item">
//                     <span className="title">Languages</span>
//                     <span className="desc">English</span>
//                   </div>
//                   <div className="item">
//                     <span className="title">Desc</span>
//                     <span className="desc">{userData.desc}</span>
//                   </div>
//                 </div>
//                 <hr />
//               </div>
//             </div>
//             <Reviews gigId={id} />
//           </div>
//           <div className="right">
//             <div className="price">
//               <h3>{gigData.shortTitle}</h3>
//               <h2>₹ {gigData.price}</h2>
//             </div>
//             <p>{gigData.shortDesc}</p>
//             <div className="details">
//               <div className="item">
//                 <img src="/img/clock.png" alt="" />
//                 <span>{gigData.deliveryTime} Days Delivery</span>
//               </div>
//               <div className="item">
//                 <img src="/img/recycle.png" alt="" />
//                 <span>{gigData.revisionNumber} Revisions</span>
//               </div>
//             </div>
//             <div className="features">
//               {gigData.features.map((feature) => (
//                 <div className="item" key={feature}>
//                   <img src="/img/greencheck.png" alt="" />
//                   <span>{feature}</span>
//                 </div>
//               ))}
//             </div>
//             <Link to={`/pay/${id}`}>
//               <button>Continue</button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Gig;
