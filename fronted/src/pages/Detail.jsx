import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { detailsData } from '../lib/api';

export default function Detail() {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["detail", id],
    queryFn: () => detailsData(id)
  })

  return (
    <div>
      <div className="">
        <h1>Details</h1>
        <h1>{data?.data?._id}</h1>
        <h1>{data?.data?.name}</h1>
        <h1>{data?.data?.age}</h1>
        <h1>{data?.data?.reg}</h1>
        <Link to="/"><button className='btn btn-neutral'>Back</button></Link>
      </div>
    </div>
  )
}
