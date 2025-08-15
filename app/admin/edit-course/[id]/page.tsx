import React from 'react'
import EditCourseClient from './EditCourseClient'

type Props = {
  params: Promise<{ id: string }>
}

const page = async ({params}: Props) => {
  const { id } = await params;
  
  return <EditCourseClient id={id} />
}

export default page