'use client'
import React, { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import { IoCheckmarkDoneOutline, IoCloseOutline } from 'react-icons/io5';
import { format } from 'timeago.js';
import CoursePlayer from '../../utils/CoursePlayer';
import Link from 'next/link';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useAddReviewMutation } from '@/redux/features/courses/coursesApi';
import { VscVerifiedFilled } from 'react-icons/vsc';
import Ratings from '../../utils/Ratings';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import CheckOutForm from '../Payment/CheckOutForm';

type Props = {
  data: any;
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
}

const CourseDetails: FC<Props> = ({ data: course, setRoute, setOpen: setModalOpen }) => {
  const { data: userData } = useLoadUserQuery(undefined, {});
  const { user } = useSelector((state: any) => state.auth);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  
  const [addReview, { isSuccess: reviewSuccess, error: reviewError }] = useAddReviewMutation();

  const discountPercentage = course?.estimatedPrice && course?.price 
    ? Math.round(((course.estimatedPrice - course.price) / course.estimatedPrice) * 100)
    : 0;

  const isPurchased = user?.courses?.find((item: any) => item._id === course._id);

  useEffect(() => {
    if (reviewSuccess) {
      toast.success("Review added successfully!");
      setReview("");
      setRating(1);
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = reviewError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [reviewSuccess, reviewError]);

  const handleOrder = (e: any) => {
    if (user) {
      setOpen(true);
    } else {
      setModalOpen(true);
      setRoute("Login");
    }
  };

  const handleReviewSubmit = async () => {
    if (review === "") {
      toast.error("Review can't be empty");
      return;
    }
    
    await addReview({ id: course._id, review, rating });
  };

  return (
    <div className="w-[90%] 800px:w-[90%] m-auto py-5 min-h-screen">
      <div className="w-full flex flex-col-reverse 800px:flex-row">
        {/* Left Side - Course Info */}
        <div className="w-full 800px:w-[65%] 800px:pr-5">
          <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
            {course.name}
          </h1>
          
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <Ratings rating={course.ratings} />
              <h5 className="text-black dark:text-white ml-2">
                {course.reviews?.length} Review{course.reviews?.length !== 1 ? 's' : ''}
              </h5>
            </div>
            <h5 className="text-black dark:text-white">
              {course.purchased} Student{course.purchased !== 1 ? 's' : ''}
            </h5>
          </div>

          <br />

          <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
            What you will learn from this course?
          </h1>

          <div>
            {course.benefits?.map((item: any, index: number) => (
              <div className="w-full flex 800px:items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <IoCheckmarkDoneOutline size={20} className="text-green-500" />
                </div>
                <p className="pl-2 text-black dark:text-white">{item.title}</p>
              </div>
            ))}
          </div>

          <br />

          <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
            What are the prerequisites for starting this course?
          </h1>

          <div>
            {course.prerequisites?.map((item: any, index: number) => (
              <div className="w-full flex 800px:items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <IoCheckmarkDoneOutline size={20} className="text-green-500" />
                </div>
                <p className="pl-2 text-black dark:text-white">{item.title}</p>
              </div>
            ))}
          </div>

          <br />

          <div>
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              Course Overview
            </h1>
            
            <div className="mt-5">
              {course?.courseData?.map((item: any, index: number) => (
                <div className="w-full" key={index}>
                  <div className="w-full flex items-center">
                    <div
                      className="w-full flex items-center justify-between bg-transparent py-4 border-b border-[#ffffff1e]"
                    >
                      <h1 className="text-[18px] text-black dark:text-white">
                        {index + 1}. {item.title}
                      </h1>
                      <h5 className="text-black dark:text-white">
                        {item.videoLength}min
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <br />

          <div className="w-full">
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              Course Details
            </h1>
            <p className="text-[18px] mt-[20px] whitespace-pre-line w-full text-black dark:text-white">
              {course.description}
            </p>
          </div>

          <br />

          <div className="w-full">
            <div className="800px:flex items-center">
              <Ratings rating={course?.ratings} />
              <div className="mb-2 800px:mb-[unset]" />
              <h5 className="text-[25px] font-Poppins text-black dark:text-white">
                {Number.isInteger(course?.ratings)
                  ? course?.ratings.toFixed(1)
                  : course?.ratings.toFixed(2)}{' '}
                Course Rating • {course?.reviews?.length} Review
                {course?.reviews?.length !== 1 ? 's' : ''}
              </h5>
            </div>
            <br />
            
            {/* Add Review Section */}
            {isPurchased && (
              <div className="w-full bg-gray-50 dark:bg-slate-700 p-5 rounded-lg mb-5">
                <h5 className="text-[20px] font-Poppins text-black dark:text-white mb-3">
                  Add a Review
                </h5>
                <div className="w-full flex">
                  <Image
                    src={user?.avatar ? user.avatar.url : '/default-avatar.png'}
                    width={50}
                    height={50}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <div className="w-full ml-3">
                    <h5 className="text-[18px] font-Poppins text-black dark:text-white">
                      {user?.name}
                    </h5>
                    <div className="flex items-center my-3">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className={`w-[20px] h-[20px] cursor-pointer ${
                              i <= rating ? "text-yellow-500" : "text-gray-300"
                            }`}
                            onClick={() => setRating(i)}
                          >
                            ★
                          </div>
                        ))}
                      </div>
                    </div>
                    <textarea
                      name=""
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      id=""
                      cols={40}
                      rows={5}
                      placeholder="Write your comment..."
                      className="outline-none bg-transparent border border-[#ffffff57] w-[95%] 800px:w-full p-2 rounded text-black dark:text-white"
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <div
                    className="w-[120px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-5 cursor-pointer flex items-center justify-center"
                    onClick={handleReviewSubmit}
                  >
                    Submit
                  </div>
                </div>
              </div>
            )}
            
            {course?.reviews &&
              [...course.reviews].reverse().map((item: any, index: number) => (
                <div className="w-full pb-4" key={index}>
                  <div className="flex">
                    <div className="w-[50px] h-[50px]">
                      <Image
                        src={item.user?.avatar ? item.user.avatar.url : '/default-avatar.png'}
                        width={50}
                        height={50}
                        alt=""
                        className="w-[50px] h-[50px] rounded-full object-cover"
                      />
                    </div>
                    <div className="hidden 800px:block pl-2">
                      <div className="flex items-center">
                        <h5 className="text-[18px] pr-2 text-black dark:text-white">
                          {item.user?.name}
                        </h5>
                        <Ratings rating={item.rating} />
                      </div>
                      <p className="text-black dark:text-white">{item.comment}</p>
                      <small className="text-[#ffffff83]">
                        {format(item.createdAt)} •
                      </small>
                    </div>
                    <div className="pl-2 flex 800px:hidden items-center">
                      <h5 className="text-[18px] pr-2 text-black dark:text-white">
                        {item.user?.name}
                      </h5>
                      <Ratings rating={item.rating} />
                    </div>
                  </div>

                  <div className="block 800px:hidden">
                    <p className="text-black dark:text-white pb-2">{item.comment}</p>
                    <small className="text-[#ffffff83]">{format(item.createdAt)} •</small>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Right Side - Course Preview & Purchase */}
        <div className="w-full 800px:w-[35%] relative">
          <div className="sticky top-[100px] left-0 z-50 w-full">
            <CoursePlayer
              videoUrl={course?.demoUrl}
              title={course?.title}
            />
            
            <div className="flex items-center">
              <h1 className="pt-5 text-[25px] text-black dark:text-white font-Poppins font-[600]">
                {course?.price === 0 ? 'Free' : '$' + course?.price}
              </h1>
              {course?.estimatedPrice && (
                <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white">
                  ${course?.estimatedPrice}
                </h5>
              )}

              {discountPercentage > 0 && (
                <h4 className="pl-5 pt-4 text-[22px] text-black dark:text-white">
                  {discountPercentage}% Off
                </h4>
              )}
            </div>

            <div className="flex items-center">
              {isPurchased ? (
                <Link
                  className="w-full"
                  href={`/course/${course._id}`}
                >
                  <div className="w-full mt-3 text-center bg-[#37a39a] rounded-[5px] cursor-pointer !py-[12px] !min-h-[45px] !px-[35px] !text-[16px] font-Poppins font-semibold text-white hover:bg-[#2e8b87] transition-colors">
                    Enter to Course
                  </div>
                </Link>
              ) : (
                <div
                  className="w-full mt-3 text-center bg-[crimson] rounded-[5px] cursor-pointer !py-[12px] !min-h-[45px] !px-[35px] !text-[16px] font-Poppins font-semibold text-white hover:bg-[#c41e3a] transition-colors"
                  onClick={handleOrder}
                >
                  Buy Now ${course?.price}
                </div>
              )}
            </div>

            <br />

            <p className="pb-1 text-black dark:text-white">• Source code included</p>
            <p className="pb-1 text-black dark:text-white">• Full lifetime access</p>
            <p className="pb-1 text-black dark:text-white">• Certificate of completion</p>
            <p className="pb-3 800px:pb-1 text-black dark:text-white">• Premium Support</p>
          </div>
        </div>
      </div>

      <>
        {open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3">
              <div className="w-full flex justify-end">
                <IoCloseOutline
                  size={40}
                  className="text-black cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-full">
                {/* Add Stripe payment form here */}
                <CheckOutForm course={course} user={user} />
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetails;
