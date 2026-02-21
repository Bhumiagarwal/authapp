import {connect} from '@/src/dbConfig/dbConfig'
import User from '@/src/model/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { sendEmail } from '@/src/helpers/mailer'

connect()


export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        const {username, email, password} = reqBody 

        console.log(reqBody)

       const user =  await User.findOne({email})
        if(user) {
              
            return NextResponse.json({error: "user alreay exists"},{status:400})
          
        }


        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User ({
            username,
            email,
            password:hashedPassword
        })
        const savedUser = await newUser.save()

        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
        console.log("Sending email...");

        return NextResponse.json({
            message: "user created successfully!",
            success: true,
            savedUser
        })
        

       



    }
    
    catch(error:any){
        return NextResponse.json({error: error.message},{status:500})
    }

}