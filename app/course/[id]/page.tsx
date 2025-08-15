import React from 'react'
import CourseDetailsClient from './CourseDetailsClient'

type Props = {
  params: Promise<{ id: string }>
}

const page = async ({params}: Props) => {
  const { id } = await params;
  
  return <CourseDetailsClient id={id} />
}

export default page
