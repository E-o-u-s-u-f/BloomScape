import jwt from 'jsonwebtoken';

const jwtToken=(userId,res)=>{
  const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'30d'})

  res.cookie('jwt',token,{
    maxAge: 30*24*60*60*1000,
    httpOnly: true,
    samesize:"strict",
    secure: process.env.SECURE !="development"
  });
  return token;
}

export default jwtToken;