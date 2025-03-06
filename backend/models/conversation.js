import mongoose from "mongoose";


const conversationSchema =mongoose.Schema({
  participent :[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }
  ],
  massages:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Massage",
      default: []
    }
  ]
},{timestamps:true})

const Conversation = mongoose.model('Conversation',conversationSchema)


export default Conversation;