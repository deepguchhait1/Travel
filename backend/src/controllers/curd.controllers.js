import cloudinary from "../middleware/cloudinari.js";
import User from "../models/user.model.js";

export const showData = async (req, res) => {
  try {
    const data = await User.find();
    if (!data)
      return res
        .status(300)
        .json({ success: false, msg: "The data is not Save" });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log("showData Controller error :", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
export const showOneData = async (req, res) => {
  try {
    const data = await User.findById({ _id: req.params.id });
    if (!data)
      return res
        .status(300)
        .json({ success: false, msg: "The data is not Found" });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log("showOneData Controller error :", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
export const addData = async (req, res) => {
  try {
    console.log(req.body);
    const { name, age} = req.body;

    if (name == "" || age == "") {
      return res
        .status(300)
        .json({ success: false, msg: "Plese fill all the parts" });
    }
    // const dataEx = await User.findOne({ reg });
    // if (dataEx)
    //   return res
    //     .status(300)
    //     .json({ success: false, msg: "The User is already Existes" });
    const picData=await cloudinary.uploader.upload(req.file.path);

    const newData = await User.create({ name, age, pic:picData.secure_url });
    if (!newData)
      return res.status(300).json({ success: false, msg: "User not Added" });

    res.status(200).json({ success: true, data: newData });
  } catch (error) {
    console.log("addData Controller error :", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
export const updateData = async (req, res) => {
  try {
    console.log(req.body);

    const updatedData = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedData)
      return res
        .status(300)
        .json({ success: false, msg: "The User is not Found" });
    res.status(200).json({ success: true, msg: "The data is Updated" });
  } catch (error) {
    console.log("updateData Controller error :", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
export const deleteData = async (req, res) => {
  try {
    const delData = await User.findByIdAndDelete(req.params.id);
    if (!delData)
      return res
        .status(300)
        .json({ success: false, msg: "The data is not Found" });
    res.status(200).json({ success: true, msg: "The data is Deleted" });
  } catch (error) {
    console.log("deleteData Controller error :", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
