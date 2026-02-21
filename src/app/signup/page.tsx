'use client'
import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast";


export default function SignupPage(){
    const router = useRouter();

    const [user,setuser] = React.useState({
        email:"",
        password:"",
        username:""
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setloading] = React.useState(false)

    const onSignUp = async () =>{
        try {
            setloading(true)
            const response = await axios.post('/api/users/signup',user);
            console.log("signup success!", response.data)
            router.push('/login')


        } catch (error:any) {
            console.log("signup failed" , error.message)
                toast.error(error.message);
            
        }
        finally{
            setloading(false)
        }

    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user])


    return (
        <div className="flex flex-col items-center  justify-center min-h-screen py-2">
            <h1> {loading?"processing" : "signup"}</h1>
            <hr/>

            <label htmlFor="username" > username </label>
            <input
            className="p-3 border border-red-700 rounded-lg mb-4 focus:outline:none focus:border-red-600"
            type='text' id='username' value = {user.username} 
            onChange={(e) => setuser({...user,username:e.target.value})} 
            placeholder="username"/>

            <label htmlFor="password" > password </label>
            <input
            className="p-3 border border-red-700 rounded-lg mb-4 focus:outline:none focus:border-red-600"
            type='password' id='password' value = {user.password} 
            onChange={(e) => setuser({...user,password:e.target.value})} 
            placeholder="password"/>

            <label htmlFor="email" > email </label>
            <input
            className="p-3 border border-red-700 rounded-lg mb-4 
            focus:outline:none focus:border-red-600"
            type='email' id='email' value = {user.email} 
            onChange={(e) => setuser({...user,email:e.target.value})} 
            placeholder="email"/>


           <button onClick={onSignUp}
            className="text-heading bg-orange-600
            box-border border border-transparent hover:bg-neutral-secondary-medium
            focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5
            rounded-full text-sm px-4 py-2.5 focus:outline-none
            focus:border-orange-200 ">{buttonDisabled? "No signup":"Signup"} </button>
          
             <Link href='/login'>Visit Login</Link>
        </div>

    )
}