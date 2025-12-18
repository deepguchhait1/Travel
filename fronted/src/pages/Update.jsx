import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { detailsData, updateData } from '../lib/api';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export default function Update() {

  const { id } = useParams();
  const navigate = useNavigate();
  // const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["detail", id],
    queryFn: () => detailsData(id)

  })
  const [formData, setFormData] = useState({ name: "", age: 0, reg: 0 });
  useEffect(() => {
    if (data?.data) {
      setFormData({
        name: data.data.name,
        age: data.data.age,
        reg: data.data.reg
      });
    }
  }, [data])
  
  const mutation = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      toast.success("Data updated");
      navigate('/');
      // queryClient.invalidateQueries({ queryKey: ["data"] })

    },
    onError: (e) => {
      toast.error(`Data not submitted: ${e.response.data.msg}`);
      navigate('/');

    }
  })
  const handelSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({id, data: formData});
  }
  return (
    <div>
      <form method="post" className='gap-2' onSubmit={handelSubmit}>
        <label htmlFor="">Name</label>
        <input type="text" className='border-2 m-2 ' value={formData?.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} name="name" id="" /><br></br>
        <label htmlFor="">Age</label>
        <input type="number" className='border-2 m-2 ' value={formData?.age == 0 ? "" : formData.age} onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })} name="age" id="" /><br></br>
        <label htmlFor="">Reg. No</label>
        <input type="number" className='border-2 m-2 ' value={formData?.reg == 0 ? "" : formData.reg} onChange={(e) => setFormData({ ...formData, reg: Number(e.target.value) })} name="reg" id="" /><br></br>
        <button type="submit" className='btn btn-accent'>Save</button>
      </form>
    </div>
  )
}
