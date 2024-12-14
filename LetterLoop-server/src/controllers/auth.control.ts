import { NextFunction, Request, Response } from "express"
import { OAuth2Client } from "google-auth-library"
import dotenv from "dotenv";
dotenv.config();
const redirectUrl = "http://localhost:3300/oauth/google/callback";
const oClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  redirectUrl
);

export const handleAuthUrl = (req:Request, res:Response, next:NextFunction) => {

    res.header('refferrer-policy', 'no-referrer-when-downgrade')
    
    
    const authorizeUrl = oClient.generateAuthUrl({
      access_type: "offline",
      scope: "https://www.googleapis.com/auth/userinfo.profile",
      prompt: "consent",
    });
    res.json({url:authorizeUrl});

    next();
}

const getUserData = async (access_token:string)=>{
  const response = fetch('https://www.googleapis.com/oauth2/v3/userinfo?access_token='+access_token)
  const data = (await response).json()
  console.log("user data: ",data)
}
export const handleGoogleCallback = async (req:Request,res:Response)=>{
  const code = req.query.code
  if(!code){
    return res.status(404).json({message:"No code provided"})
  }
  try {
    const response = await oClient.getToken(code as string);
    await oClient.setCredentials(response.tokens);
    console.log("user set")
    const user = oClient.credentials;
    console.log("credentials:", user);
    await getUserData(user.access_token as string);
    return res.status(200).json({message:"Success"})
    
  } catch (error) {
    res.status(400).json({message:"Server Error",error:error})
  }
  
}