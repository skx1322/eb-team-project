import jwt from "jsonwebtoken";
const generatedAccessToken = async (admin_id) => {
  const token = await jwt.sign(
    { id: admin_id },
    process.env.SECRET_ACCESS_KEY,
    { expiresIn: `30m` }
  );
  return token;
};

export default generatedAccessToken;