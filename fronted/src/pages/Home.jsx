import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addData, showData } from '../lib/api'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
export default function Home() {
  const [formData, setFormData] = useState({ name: "", age: 0, pic: null });
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: showData
  })
  const mutation = useMutation({
    mutationFn: addData,
    onSuccess: () => {
      toast.success("Data submitted");
      queryClient.invalidateQueries({ queryKey: ["data"] })
    },
    onError: (e) => {
      toast.error(`Data not submitted: ${e.response.data.msg}`);
    }
  })

  const handelSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('name', formData.name);
    fd.append('age', String(formData.age ?? ''));
    if (formData.pic) {
      fd.append('pic', formData.pic);
    }
    mutation.mutate(fd);
    setFormData({ name: "", age: 0, pic: null });
    e.target.reset();
  }
  if (isLoading) return <p>Loading...</p>;

  // updating data 
  // const upData = () => {
  //   console.log('hello');

  // }

  return (
    <div>
      <div className="">
        <form method="post" className='gap-2' onSubmit={handelSubmit}>
          <label htmlFor="">Name</label>
          <input type="text" className='border-2 m-2 ' value={formData?.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} name="name" id="" /><br></br>
          <label htmlFor="">Age</label>
          <input type="number" className='border-2 m-2 ' value={formData?.age == 0 ? "" : formData.age} onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })} name="age" id="" /><br></br>
          {/* <label htmlFor="">Reg. No</label>
          <input type="number" className='border-2 m-2 ' value={formData?.reg == 0 ? "" : formData.reg} onChange={(e) => setFormData({ ...formData, reg: Number(e.target.value) })} name="reg" id="" /><br></br> */}
          <label htmlFor="">Image</label>
          <input type="file" className='border-2 m-2 ' onChange={(e) => setFormData({ ...formData, pic: e.target.files && e.target.files[0] ? e.target.files[0] : null })} name="pic" id="" accept="image/*" /><br></br>
          <button type="submit" className='btn btn-accent'>Save</button>
        </form>
      </div>
      <div className="card">
        {data?.data?.map((item, index) => (
          <div key={index} className=" card-body card-dash bg-amber-400 m-4 w-[400px] ">
            <div className="flex justify-between align-middle items-center">
              <div className="bg-green-600 h-10 w-10 text-2xl font-mono card-dash text-white rounded-full flex justify-center align-middle items-center">
                <h1 className=''>{index + 1}</h1>
              </div>
              <div className="" >
                <h1 className='card-title'>Name : {item.name}</h1>
                <h1 className='card-title'>Age : {item.age}</h1>
                <img src={item.pic} alt={item.pic} height="50px" srcset="" />
              </div>
              <div className="flex flex-col gap-2">
                <Link to={`/details/${item._id}`}><button className='btn btn-accent px-12'>Details</button></Link>
                <div className="gap-2 flex">

                  <Link to={`/edit/${item._id}`}><button className='btn btn-secondary'>Edit</button></Link>
                  {/* <button className='btn btn-secondary' onClick={upData}>Edit</button> */}
                  <Link to={`/delete/${item._id}`}><button className='btn btn-primary'>Delete</button></Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
