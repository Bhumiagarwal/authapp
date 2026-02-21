'use client'
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function ProfilePage(){
    const router = useRouter()
    const [data, setData] = useState( {username:"",email:"",id:""} )
    const logout = async () =>{
        try {
            const response = await axios.get("/api/users/logout")
            toast.success("logout success")
            router.push('/login')

        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message);
            
        }
    }

    const getUserDetails = async ()=>{
        const res = await axios.get('/api/users/me')
        console.log(res.data)
       setData({
        username: res.data.data.username,
        email: res.data.data.email,
        id: res.data.data._id
});
    }


    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="bg-gray-800 text-white max-w-md w-full p-8 rounded-2xl shadow-xl">

            <h1 className="flex items-center justify-center"> ProfilePage</h1>
            <hr className="my-6 border-gray-200" />

        {/* User Info Section */}
        <div className="space-y-3 text-gray-600 mb-5">
          <p>
            <span className="font-semibold text-white">Name:</span> <Link href={`/profile/${data.id}`}> {data.username} </Link>
          </p>
          <p>
            <span className="font-semibold text-white">Email:</span> {data.email}
          </p>
        </div>
           {/* <h2>{data==='nothing'?"Nothing":<Link href={`/profile/${data}`}> {data} </Link>} </h2> */}
       { /* button */}
           <button
           onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white 
            px-5 py-2 rounded-lg transition duration-300 shadow-md"
            >Logout
            </button>

            <button
           onClick={getUserDetails}
            className="bg-red-500 hover:bg-red-600 text-white 
            px-5 py-2 rounded-lg transition duration-300 shadow-md"
            >Get User Details
            </button>
        </div>
        </div>
    )
}