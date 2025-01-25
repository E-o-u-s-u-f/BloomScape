import React from "react";

import PostCard from "../components/PostCard"
import "../App.css";


const HomePage = () => {
  const posts = [
    {
      profileName: "Nazmus Sakib",
      time: "Just now",
      content:
        "Bonsai, a word that means planted in a container in Japanese, is more than just a gardening technique—it’s a centuries-old art form that bridges the gap between nature and creativity. Bonsai trees are miniature versions of full-sized trees, meticulously cultivated and shaped to capture the grandeur of their larger counterparts. Beyond aesthetics, bonsai embodies patience, mindfulness, and a deep connection with nature.",
      imageUrl:
        "https://media.istockphoto.com/id/155908124/photo/small-green-bonsai-tree-in-a-brown-plant-pot.jpg?s=612x612&w=is&k=20&c=b7HZ60FHU14yOqXciXsPUSJbqMlcHhgQQ0mbl64vWpg=",
    },
    {
      profileName: "Eousuf Abdullah",
      time: "1 hour ago",
      content:
        "Caring for plants, whether indoors or outdoors, is both an art and a science. It’s not just about watering them occasionally; plants need attention, understanding, and care to flourish. Whether you're a seasoned gardener or a beginner, following some basic plant care principles can help your greenery thrive.",
      imageUrl:
        "https://media.istockphoto.com/id/1380361370/photo/decorative-banana-plant-in-concrete-vase-isolated-on-white-background.jpg?s=612x612&w=is&k=20&c=uUmrMUqTjBNCQZli8J6LYmYZPvtoQan-OqE4ru6njI8=",
    },
    {
      profileName: "Asifuzzaman Shanto",
      time: "2 days ago",
      content:
        "Plants bring life to any space, whether it’s your home, office, or garden. However, keeping them healthy and thriving requires more than just occasional watering. By following a few essential care tips, you can ensure your plants grow beautifully and remain vibrant all year round.",
      imageUrl:
        "https://media.istockphoto.com/id/1147472170/photo/hand-with-water-can-watering-indoor-plants-on-windowsill.jpg?s=612x612&w=is&k=20&c=mmFrU6m3BC-39rnAHCQE4749hZ2wiIXAzw9lwanGdVI=",
    },
  ];

  return (
    <div className="App">
      {posts.map((post, index) => (
        <PostCard
          key={index}
          profileName={post.profileName}
          time={post.time}
          content={post.content}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
};

export default HomePage;
