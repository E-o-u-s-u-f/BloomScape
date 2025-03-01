import { useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";

const inboxChats = [
  {
    id: 0,
    name: "Dhruvo",
    lastMessage: "Can you tell me your experience?",
    timestamp: "10:30 AM",
    profileImage:
      "https://scontent.fdac138-1.fna.fbcdn.net/v/t39.30808-6/463385899_1030702125474008_4514660079567697957_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHqDa6AYKv-Zsge2DVcxrsewkJ_pMWIZGbCQn-kxYhkZpChCCywRKIXkXW6r9aaSC0TMl5UqcC3U82op2ESd2UA&_nc_ohc=l8Gu3eF0LcMQ7kNvgHAn5HQ&_nc_zt=23&_nc_ht=scontent.fdac138-1.fna&_nc_gid=A7CBN2vIZcagR5B66-ul6ei&oh=00_AYCivEe9CrWEBFUUTaT7hMFYc4HDC1BM_pz-bQZcmppzqQ&oe=6799BA60",
    unreadMessages: 2,
    isOnline: true,
  },
  {
    id: 1,
    name: "Tibro",
    lastMessage: "Can you tell me your experience?",
    timestamp: "9:15 AM",
    profileImage:
      "https://scontent.fdac138-2.fna.fbcdn.net/v/t39.30808-1/467309338_544752341884509_43585402498420033_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeH_tKYldXTutH0sZkzMpvvEi38V6iDo0fKLfxXqIOjR8j_e1INxe7sz4NWOKT_PKn1AKHxpM-SuMAhVttNU9RkP&_nc_ohc=hL1Y9FMORJYQ7kNvgGUA8ij&_nc_zt=24&_nc_ht=scontent.fdac138-2.fna&_nc_gid=Ap4t9D7xqepI4bBFnzuuU-L&oh=00_AYCsIcsFnJFzNrVmaBRj9Jq1BANcqxJkVVtJPP50tVqCqw&oe=6799C4BC",
    unreadMessages: 10,
    isOnline: false,
  },
  {
    id: 2,
    name: "Eousuf",
    lastMessage: "Can you tell me your experience?",
    timestamp: "8:45 AM",
    profileImage:
      "https://scontent.fdac138-2.fna.fbcdn.net/v/t39.30808-1/474483707_1191931369118124_5538215198107449011_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGtDjE-eoz4YNbK-s0UhOUkKoQ_nxjDgIMqhD-fGMOAgyjTlWGvvf9AfiEOGw-BCnFSM1U8PphwCXDTkbH8i6Pj&_nc_ohc=T29OdWvwMocQ7kNvgHII0AG&_nc_zt=24&_nc_ht=scontent.fdac138-2.fna&_nc_gid=AA00HrZP9_tvgR7CPoj_F-Q&oh=00_AYBi79G_7ssBzNvvZItLlNwiGrVlnpfk2jRD5QochFeHJQ&oe=6799BA6A",
    unreadMessages: 5,
    isOnline: true,
  },
  {
    id: 3,
    name: "Rafy",
    lastMessage: "CP CP CP",
    timestamp: "8:45 PM",
    profileImage:
      "https://scontent.fdac138-2.fna.fbcdn.net/v/t39.30808-1/377574145_833652851768856_9169122203741747444_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeEQidhw2430kA11XmyhsacsQ8xPA_YCenBDzE8D9gJ6cEoI2iV4ZXnmg_bLSIjEEzHTI4XQXjEmnYjjioGhq9HH&_nc_ohc=KHsCqRISdToQ7kNvgELjzJc&_nc_zt=24&_nc_ht=scontent.fdac138-2.fna&_nc_gid=Ab3Hb4W6i9XAAx9T5WijD4W&oh=00_AYDFRtdcGg04YOXlxW1401jYPaWQyrRA-7En_odZsQjgWA&oe=679ACB23",
    unreadMessages: 1,
    isOnline: true,
  },
  {
    id: 4,
    name: "Mejor Dalim",
    lastMessage: "ek ek kee dekhe nebo",
    timestamp: "8:45 AM",
    profileImage:
      "https://scontent.fdac138-1.fna.fbcdn.net/v/t39.30808-6/474368592_466794333153338_7067618515941140559_n.jpg?stp=dst-jpg_s206x206_tt6&_nc_cat=109&ccb=1-7&_nc_sid=fe5ecc&_nc_eui2=AeF29QgZvo2R9QzMrKM5XrFtJaF7Up2DxdkloXtSnYPF2dAqbTPou3c8dt3SopMgc8K_JDgPCVllddAKrxYchwWv&_nc_ohc=0S-JfnjvL38Q7kNvgF1R_Vn&_nc_zt=23&_nc_ht=scontent.fdac138-1.fna&_nc_gid=AS99OvHs1oPdfZHqfl5sjID&oh=00_AYC-lD5ILHJnCvkvxALStZcEapZm0JW8aqL5fMaMIe5U1Q&oe=679AC74E",
    unreadMessages: 5,
    isOnline: true,
  },
  {
    id: 5,
    name: "Hasu Apa",
    lastMessage: "Sheikh Hasina palay nah",
    timestamp: "8:45 AM",
    profileImage:
      "https://dims.apnews.com/dims4/default/78ec81d/2147483647/strip/false/crop/5696x3784+0+0/resize/1486x987!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2Fdf%2Fa0%2F916d3faadc53769019f893c6bb2a%2Ffc2cd49d1f6d4946abb95ab56deca87b",
    unreadMessages: 5,
    isOnline: true,
  },
  {
    id: 6,
    name: "Shahabgi",
    lastMessage: "ei ei wait ei ei wait",
    timestamp: "8:45 AM",
    profileImage:
      "",
    unreadMessages: 5,
    isOnline: true,
  },
  {
    id: 7,
    name: "Sadman",
    lastMessage: "ok ok ok",
    timestamp: "8:45 AM",
    profileImage:
      "https://scontent.fdac138-1.fna.fbcdn.net/v/t39.30808-1/385330492_6554233691328915_494201276600721692_n.jpg?stp=c0.266.1536.1536a_dst-jpg_s200x200_tt6&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeETea-s8NPRGjiaPwiiCzWqqOmThyQYTH-o6ZOHJBhMf1BYXhajL1FlYyt-e7wIrnsaLs9ZRqoMN4BNBl6HYbkP&_nc_ohc=Pu7P0X4O68MQ7kNvgGLMcWL&_nc_zt=24&_nc_ht=scontent.fdac138-1.fna&_nc_gid=AfbHs1N60IWwmdGBPnVu5Fs&oh=00_AYC_L4eQtFoEY3My8d_8IicMeNb-HSM0tMrVTuCf1SpUvg&oe=679ADEC4",
    unreadMessages: 5,
    isOnline: true,
  },
  {
    id: 8,
    name: "Hasu Apa",
    lastMessage: "Can you tell me your experience?",
    timestamp: "8:45 AM",
    profileImage:
      "",
    unreadMessages: 5,
    isOnline: true,
  },
];
function Chat({ isOpen, onClose }) {
  const [chatselect, setChatselect] = useState(null);

  const chatselection = (chat) => setChatselect(chat);
  const closechatselection = () => setChatselect(null);

  return (
    <>
      {isOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50 }}>
          {/* Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(10px)",
            }}
            onClick={!chatselect ? onClose : undefined}
          >
            {chatselect && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: "65%",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  padding: "20px",
                }}
              >
                <button
                  onClick={closechatselection}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    color: "#6b7280",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <FaArrowRight size={35} />
                </button>
                <div style={{ marginTop: "50px" }}>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: "#000",
                    }}
                  >
                    {chatselect}'s Chat
                  </h3>
                  <div
                    style={{
                      backgroundColor: "#f9fafb",
                      padding: "20px",
                      borderRadius: "5px",
                      boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                      overflowY: "auto",
                    }}
                  >
                    <p style={{ color: "#374151" }}>
                      Start chatting with {chatselect}...
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Drawer */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              height: "100%",
              width: "35%",
              backgroundColor: "#fff",
              boxShadow: "-2px 0 4px rgba(0, 0, 0, 0.1)",
              borderLeft: "2px solid #000",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "2px solid #000",
                backgroundColor: "#e5e7eb",
                height: "115px",
                padding: "0 20px",
              }}
            >
              <h5
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Inbox
              </h5>
              <button
                onClick={() => {
                  onClose();
                  closechatselection();
                }}
                style={{
                  color: "#6b7280",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <RiCloseLargeFill size={35} />
              </button>
            </div>
            <div
              style={{
                padding: "20px",
                overflowY: "auto",
                height: "calc(100% - 115px)",
              }}
            >
              {inboxChats.map((chat) => (
                <a
                  href="#"
                  key={chat.id}
                  onClick={() => chatselection(chat.name)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "15px",
                    borderBottom: "2px solid #000",
                    cursor: "pointer",
                    backgroundColor:
                      chatselect === chat.name ? "#6b7280" : "#fff",
                    color: chatselect === chat.name ? "#fff" : "#000",
                  }}
                >
                  <img
                    src={chat.profileImage}
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid #d1d5db",
                    }}
                    alt={chat.name}
                  />
                  <div style={{ marginLeft: "20px", flex: 1 }}>
                    <h4 style={{ fontWeight: "bold" }}>{chat.name}</h4>
                    <p>{chat.lastMessage}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <small style={{ color: "#6b7280" }}>{chat.timestamp}</small>
                    {chat.unreadMessages > 0 && (
                      <span style={{ color: "#d32f2f" }}>
                        {chat.unreadMessages}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;
