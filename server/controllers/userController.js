const User = require("../models/userModel");
const bcrypt = require("bcrypt");
exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    // check username
    const userCheck = await User.findOne({ username: username });
    if (userCheck)
      return res.json({ msg: "Username already Taken", status: false });

    // check email address
    const emailCheck = await User.findOne({ email: email });
    if (emailCheck)
      return res.json({ msg: "Email already Taken", status: false });

    //  encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating a new account
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // delete password
    delete user.password; //-------------- need observation ----------------

    res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // finding username
    const user = await User.findOne({ username: username });
    const check = await bcrypt.compare(password, user.password)
    
    // checking password
    if (user && check) {
      delete user.password; //-------------- need observation ----------------

      res.json({ status: true, user });
    } else {
      return res.json({ msg: "Please enter valid credentials", status: false });
    }
  } catch (error) {
    next(error);
  }
};

exports.setAvatar= async (req, res, next) => {
  try {
    const id = req.params.id
    const avatarImage = req.body.avatarImage
    const user = await User.findOne({_id: id})
    user.isAvatarImageSet = true;
    user.avatarImage = avatarImage;
    user.save();
  } catch (error) {
    next(error);
  }
}
