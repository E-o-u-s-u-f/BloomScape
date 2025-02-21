import React from "react";
import PostCard from "../components/PostCard";
import Footer from "../components/Footer";
import "../App.css";

const HomePage = () => {
  const posts = [
    {
      profileName: "Nazmus Sakib",
      time: "Just now",
      content:
        "Bonsai, a word that means planted in a container in Japanese, is more than just a gardening technique—it’s a centuries-old art form that bridges the gap between nature and creativity. Bonsai trees are miniature versions of full-sized trees, meticulously cultivated and shaped to capture the grandeur of their larger counterparts. Beyond aesthetics, bonsai embodies patience, mindfulness, and a deep connection with nature.",
      imageUrls: [
        "https://media.istockphoto.com/id/155908124/photo/small-green-bonsai-tree-in-a-brown-plant-pot.jpg?s=612x612&w=is&k=20&c=b7HZ60FHU14yOqXciXsPUSJbqMlcHhgQQ0mbl64vWpg=",
        "https://media.istockphoto.com/id/1380361370/photo/decorative-banana-plant-in-concrete-vase-isolated-on-white-background.jpg?s=612x612&w=is&k=20&c=uUmrMUqTjBNCQZli8J6LYmYZPvtoQan-OqE4ru6njI8=",

        "https://media.istockphoto.com/id/155908124/photo/third-image.jpg",
        "https://media.gettyimages.com/id/539829042/photo/proud-gardener.jpg?s=612x612&w=gi&k=20&c=g8iji1hfzvjdEKXYS3A4S75LJuWAxl6ifyz1LlmAGPU=",
      ],
    },
    {
      profileName: "Eousuf Abdullah",
      time: "1 hour ago",
      content:
        "Caring for plants, whether indoors or outdoors, is both an art and a science. It’s not just about watering them occasionally; plants need attention, understanding, and care to flourish. Whether you're a seasoned gardener or a beginner, following some basic plant care principles can help your greenery thrive.",
      imageUrls: [
        "https://cdn.shopify.com/s/files/1/1740/1449/files/Monthly_Gardening_Checklist_-_Web.jpg?v=1644012327",
        "https://abeautifulmess.com/wp-content/uploads/2023/06/rubbertree-1.jpg",
      ],
    },
    {
      profileName: "Asifuzzaman Shanto",
      time: "2 days ago",
      content:
        "Plants bring life to any space, whether it’s your home, office, or garden. However, keeping them healthy and thriving requires more than just occasional watering. By following a few essential care tips, you can ensure your plants grow beautifully and remain vibrant all year round.",
      imageUrls: [
        "https://media.istockphoto.com/id/1316944376/photo/woman-take-care-of-cypress-plants.jpg?s=612x612&w=0&k=20&c=wbRywSNXwNVbTeb0LUZ4fNJdEpF1xwg9jmJfEt1Mjic=",
        "https://www.nationaldaycalendar.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cg_faces:center%2Cq_auto:eco%2Cw_768/MjA1MTEyMTE4OTk4MDE3NjY4/website-feature---national-gardening-day--april-14.png",
        "https://thumbs.dreamstime.com/b/senior-gardener-gardening-his-permaculture-garden-senior-gardener-gardening-his-permaculture-garden-preparing-ground-160233739.jpg",
      ],
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
          imageUrls={post.imageUrls}
        />
      ))}
      <Footer/>
    </div>
  );
};

export default HomePage;
