/* eslint-disable react/prop-types */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      toast.success("Review added successfully", {
        position: "bottom-left",
        autoClose: 1000,
        theme: "dark",
      });
    },
    onError: (err) => {
      const errorMessage =
        err.response?.data?.message || "Failed to add review";
      toast.error(errorMessage, {
        position: "bottom-left",
        autoClose: 1000,
        theme: "dark",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ gigId, desc, star });
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "loading"
        : error
        ? "Something went wrong!"
        : data.map((review) => <Review key={review._id} review={review} />)}
      <div className="add">
        <h3>Add a review</h3>
        <form action="" className="addForm" onSubmit={handleSubmit}>
          <input type="text" placeholder="write your opinion" />
          <select name="" id="">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;

// import React from "react";
// import { useMutation, useQuery } from "react-query";
// import { useAddReviewMutation, useGetReviewsQuery } from "../../service/reviewsApi";
// import Review from "../review/Review";
// import "./Reviews.scss";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Reviews = ({ gigId }) => {
//   const { data: reviews, isLoading, isError } = useGetReviewsQuery(gigId);
//   const addReviewMutation = useAddReviewMutation();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const desc = e.target[0].value;
//     const star = e.target[1].value;

//     try {
//       await addReviewMutation.mutateAsync({ gigId, desc, star });
//       toast.success("Review added successfully", {
//         position: "bottom-left",
//         autoClose: 1000,
//         theme: "dark",
//       });
//     } catch (error) {
//       toast.error("Failed to add review", {
//         position: "bottom-left",
//         autoClose: 1000,
//         theme: "dark",
//       });
//     }
//   };

//   return (
//     <div className="reviews">
//       <h2>Reviews</h2>
//       {isLoading ? (
//         "loading"
//       ) : isError ? (
//         "Something went wrong!"
//       ) : (
//         reviews.map((review) => <Review key={review._id} review={review} />)
//       )}
//       <div className="add">
//         <h3>Add a review</h3>
//         <form action="" className="addForm" onSubmit={handleSubmit}>
//           <input type="text" placeholder="write your opinion" />
//           <select name="" id="">
//             <option value={1}>1</option>
//             <option value={2}>2</option>
//             <option value={3}>3</option>
//             <option value={4}>4</option>
//             <option value={5}>5</option>
//           </select>
//           <button>Send</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Reviews;
