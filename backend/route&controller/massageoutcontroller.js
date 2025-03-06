import Conversation from "../models/conversation.js";
import Massage from "../models/massages.js"; // Assuming this is your message model
import { getReciverSocketId,io } from "../Socket/socket.js";

export const sendMassage = async (req, res) => {
  try {
    const { massage } = req.body;  // Ensure this is 'massage' (as per your schema)
    const { id: receiverId } = req.params; // The receiver's ID from the route params
    const senderId = req.user._id; // Get the sender's ID from the authenticated user

    console.log(`Sender ID: ${senderId}, Receiver ID: ${receiverId}, Massage: ${massage}`);

    let chats = await Conversation.findOne({
      participent: { $all: [senderId, receiverId] }
    });

    if (!chats) {
      chats = await Conversation.create({
        participent: [senderId, receiverId]
      });
    }

    const newMassage = new Massage({
      senderId,
      receiverId,
      massage,  // Use 'massage' here as per your schema
      conversationId: chats._id
    });

    await newMassage.save();

    chats.massages.push(newMassage._id);
    await chats.save();

    const receiverSocketId = getReciverSocketId(receiverId);  // Correct function name
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMassage', newMassage);
    }

    res.status(201).send(newMassage);  // Return the newly created message
  } catch (error) {
    console.log('Error in sendMassage controller:', error.message);
    res.status(500).send({ success: false, message: error.message });
  }
};

export const getMassage = async (req, res) => {
  try {
    const { id: receiverId } = req.params; // Receiver's ID from the route params
    const senderId = req.user._id; // Sender's ID from the authenticated user
    console.log('Sender ID:', senderId); // Debugging log
    // Find the conversation between the sender and receiver

    
    const chats = await Conversation.findOne({
      participent: { $all: [senderId, receiverId] }
    }).populate("massages"); // Populate the massages field with the message data

    console.log(chats); // Check the result to ensure messages are populated

    if (!chats) {
      return res.status(404).send([]); // If no conversation is found, return an empty array
    }

    // Return the list of messages
    const messages = chats.massages; // This will be an array of populated message documents
    res.status(200).send(messages); // Send the messages as a response

  } catch (error) {
    console.log('Error in getMassage controller:', error.message);
    res.status(500).send({ success: false, message: error.message });
  }
};
