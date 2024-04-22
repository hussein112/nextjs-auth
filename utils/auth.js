import { jwtVerify } from 'jose'

export const verifyAuth = async(token) => {
    try{
        const verified = await jwtVerify(token, "string_jwt_secret")
        return verified.payload
    }catch(error){
        console.log("Your token is invalid")
    }
}