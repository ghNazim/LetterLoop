import { NextFunction, Request, Response } from "express"
import { OAuth2Client } from "google-auth-library"
import dotenv from "dotenv";
dotenv.config();

export const handleAuthUrl = (req:Request, res:Response, next:NextFunction) => {

    res.header('refferrer-policy', 'no-referrer-when-downgrade')
    const redirectUrl = "http://localhost:3300/oauth/google/callback";
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUrl
    );
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: "https://www.googleapis.com/auth/userinfo.profile",
      prompt: "consent",
    });
    res.json({url:authorizeUrl});

    next();
}