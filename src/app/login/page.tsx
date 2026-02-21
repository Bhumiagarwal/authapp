'use client'

import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

export default function LoginPage(){
    const router = useRouter();
    const [user,setuser] = React.useState({
        
        email:"",
        password:"",

    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setloading] = React.useState(false)

    const onLogin = async ()=>{
        try {
            setloading(true)
            const response = await axios.post("/api/users/login",user)
            console.log("login successfull",response.data)
            toast.success("login succeccfull")
            router.push("/profile")

        } catch (error : any) {
            console.log("login failed!" , error.message)
            toast.error(error.message)
        }finally{
            setloading(false)
        }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user]);

    return (
        <>
        <div className="flex flex-col items-center  justify-center min-h-screen py-2">
                <h1>{loading?"proccessing":"login"}</h1>


            <label htmlFor="email" > email </label>
            <input
            className="p-3 border border-red-700 rounded-lg mb-4 
            focus:outline:none focus:border-red-600"
            type='email' id='email' value = {user.email} 
            onChange={(e) => setuser({...user,email:e.target.value})} 
            placeholder="email"/>



            <label htmlFor="password" > password </label>
            <input
            className="p-3 border border-red-700 rounded-lg mb-4 focus:outline:none focus:border-red-600"
            type='password' id='password' value = {user.password} 
            onChange={(e) => setuser({...user,password:e.target.value})} 
            placeholder="password"/>

           <button onClick={onLogin}
            className="text-heading bg-red-600
            box-border border border-transparent hover:bg-neutral-secondary-medium
            focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5
            rounded-full text-sm px-4 py-2.5 focus:outline-none
            focus:border-white-600 ">Login here </button>
             <Link href='/signup'>Visit signup</Link>


        </div>
        
        
        </>
    )




}