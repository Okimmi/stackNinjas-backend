const axios = require("axios");
const { User } = require("../../models/user");
const jwt = require("jsonwebtoken");
// const bcrypt = require('bcryptjs');

const { SECRET_KEY } = process.env;

exports.googleAuth = async (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  );
};

exports.googleRedirect = async (req, res) => {
  console.log("asasfasfasfasfs");
  try {
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const urlObj = new URL(fullUrl);
    const urlParams = new URLSearchParams(urlObj.search);
    const code = urlParams.get("code");
    const tokenData = await axios.post(`https://oauth2.googleapis.com/token`, {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
      grant_type: "authorization_code",
      code,
    });

    const accessToken = tokenData.data.access_token;
    const userData = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(req.user);

    let user = await User.findOne({ googleId: userData.data.id });

    console.log("user", user);

    if (!user) {
      user = await User.create({
        googleId: userData.data.id,
        email: userData.data.email,
        password: "123456789Qw",
        avatar: userData.data.picture,
      });
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "30d" });

    console.log(user._id);

    await User.findByIdAndUpdate(user._id, { token });

    res
      .status(200)
      .redirect(`${process.env.FRONTEND_BASE_URL}/current/${token}`);
  } catch (error) {
    console.error("Error in googleRedirect:", error);
    return res.status(500).json({ error: error.message });
  }
};
