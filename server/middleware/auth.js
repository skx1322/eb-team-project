import jwt from "jsonwebtoken";
const auth = async(req, res, next)=>{
    try {
        const token = req.cookies.accessToken || req?.header?.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Provide a token.",
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET_ACCESS_KEY);
        if (!decode) {
            return res.status(401).json({
                success: false,
                message: "Provide a token.",
            })
        }

        req.userId = decode.id;
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong within the server.",
            output: error,
        })
    }
};

export default auth;