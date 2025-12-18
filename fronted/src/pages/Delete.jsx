import { useMutation } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { deleteData } from '../lib/api'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

export default function Delete() {
    const { id } = useParams();
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: deleteData,
        onSuccess: () => {
            toast.success("Data Delete");
            navigate('/')
        },
        onError: (e) => {
            console.log(e);
            toast.error(`Data not submitted: ${e.response.data.msg}`);
            navigate('/')

        }
    })
    useEffect(() => {
        mutation.mutate(id);

    }, [])
    return null
}
