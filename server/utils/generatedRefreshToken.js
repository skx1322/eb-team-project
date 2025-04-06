import jwt from "jsonwebtoken";
import AdminModel from "../model/admin.model.js";
const generatedRefreshToken = async (admin_id) => {
    const token = await jwt.sign({id: admin_id}, process.env.SECRET_REFRESH_KEY, {expiresIn: '1h'})
    
    const updateRefreshTokenUser = await AdminModel.updateOne({
        _id: admin_id,
    },{
        admin_passExpire: token,
    })

    return token;
};

export default generatedRefreshToken;