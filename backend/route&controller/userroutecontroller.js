import Conversation from "../models/conversation.js";
import User from "../models/user.model.js";

export const getUserBySearch = async (req, res) => {
  try {
    const search = req.query.search || '';
    const currentuserID = req.user._id;
    const user = await User.find({
      $and: [
        {
          $or: [
            {
              fullName: { $regex: '.*' + search + '.*', $options: 'i' }  // 'i' option for case-insensitive search
            }
          ]
        },
        {
          _id: { $ne: currentuserID }
        }
      ]
    }).select("-password").select("email");  // Select fields properly

    res.status(200).send(user);
  } catch (error) {
    console.log('Error in getUserBySearch controller:', error.message);
    res.status(500).send({ success: false, message: error.message });
  }
}
export const getCurrentChatters = async (req, res) => {
  try {
    const currentuserID = req.user._id;

    // Find conversations where the current user is a participant
    const currentchatters = await Conversation.find({
      participent: currentuserID,  // Fixed the field name from participent to participants
    }).sort({ updatedAt: -1 });

    console.log("Current Chatters:", currentchatters); // Debug log

    if (!currentchatters || currentchatters.length === 0) {
      return res.status(200).send([]); // Return empty array if no chatters
    }

    // Collect other participants' IDs (excluding the current user)
    const participantsIDS = currentchatters.reduce((ids, conversation) => {
      const otherparticipants = conversation.participent.filter(
        (id) => id.toString() !== currentuserID.toString()
      );
      return [...ids, ...otherparticipants];
    }, []);

    console.log("Participants IDs:", participantsIDS); // Debug log

    // Fetch users based on the other participants' IDs
    const users = await User.find({ _id: { $in: participantsIDS } }).select(
      "-password -email"
    );

    console.log("Fetched Users:", users); // Debug log

    // Return the found users
    res.status(200).send(users);
  } catch (error) {
    console.log("Error in getCurrentChatters controller:", error.message);
    res.status(500).send({ success: false, message: error.message });
  }
};
