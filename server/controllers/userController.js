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
    const user = await User.findByIdAndUpdate(id,{
      isAvatarImageSet : true,
      avatarImage : avatarImage
    }, {new:true})

    return res.json({isSet: user.isAvatarImageSet, avatarImage: user.avatarImage})
  } catch (error) {
    next(error);
  }
}

exports.getAll = async (req, res, next) =>{
  try {
    const id = req.params.id;
    const users = await User.find({ _id: { $ne: id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};



module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};