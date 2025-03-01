import mongoose from "mongoose";


const massagesSchema =mongoose.Schema({
  senderId :
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true
    }
  ,
  receiverId :
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true
  },
  massage :
  {
    type:String,
    required:true
  },
  conversationId:
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Conversation",
    default:[]
    
  }
},{timestamps:true})

const Massage = mongoose.model('Massage',massagesSchema)


export default Massage;