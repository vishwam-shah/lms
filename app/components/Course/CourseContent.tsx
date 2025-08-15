'use client';
import { useGetSingleCourseQuery } from '@/redux/features/courses/coursesApi';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header';
import Footer from '../Footer';
import CourseDetails from './CourseDetails';

type Props = {
  id: string;
};

const CourseContent: React.FC<Props> = ({ id }) => {
  const { data, isLoading } = useGetSingleCourseQuery(id);
  const [route, setRoute] = useState('Login');
  const [open, setOpen] = useState(false);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data?.course?.name + ' - LMS'}
            description={data?.course?.description}
            keywords={data?.course?.tags}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={0}
          />
          <CourseDetails
            data={data?.course}
            setRoute={setRoute}
            setOpen={setOpen}
          />
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseContent;
