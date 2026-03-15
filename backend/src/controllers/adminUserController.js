import User from "../models/User.js";

export const getAllUsers = async (req,res)=>{

try{

const users = await User.find({role:"user"})
.sort({createdAt:-1});

res.json(users);

}catch(err){

res.status(500).json({
message:"Server error"
});

}

};

export const updateUserStatus = async (req,res)=>{

try{

await User.findByIdAndUpdate(
req.params.id,
{status:req.body.status}
);

res.json({
success:true
});

}catch(err){

res.status(500).json({
message:"Server error"
});

}

};