import { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaSmile } from "react-icons/fa";
import { MdCancel } from "react-icons/md"; // Import cancel icon
import Picker from "emoji-picker-react";
import { useToast } from "@chakra-ui/react";
import "./Post.css";

export default function Post() {
  const [imageFiles, setImageFiles] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [existingContents, setExistingContents] = useState([]);
  const fileInputRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    fetch("http://localhost:5000/api/multiple/cloud/contents")
      .then((res) => res.json())
      .then((data) => setExistingContents(data))
      .catch((error) => console.error("Error fetching contents:", error));
  }, []);

  const validationSchema = Yup.object({
    profileName: Yup.string()
      .min(3, "Must be at least 3 characters")
      .required("Required"),
    title: Yup.string()
      .min(3, "Title must be at least 5 characters")
      .required("Required"),
    content: Yup.string()
      .min(10, "Post must be at least 10 characters")
      .test(
        "is-duplicate",
        "Content already exists",
        (value) => !existingContents.includes(value)
      )
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: { profileName: "", title: "", content: "" },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      imageFiles.forEach((file) => formData.append("files", file));
      formData.append("profileName", values.profileName);
      formData.append("title", values.title);
      formData.append("content", values.content);

      try {
        const response = await fetch(
          "http://localhost:5000/api/multiple/cloud",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        if (response.ok) {
          toast({
            title: "✅ Post Uploaded!",
            description: data.message,
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "top-right",
            variant: "subtle",
          });
          resetForm();
          setImageFiles([]);
        } else {
          toast({
            title: "❌ Upload Failed!",
            description: data.message || "An error occurred.",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top-right",
            variant: "left-accent",
          });
        }
      } catch (error) {
        toast({
          title: "⚠️ Error!",
          description: "Error uploading the post: " + error.message,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
          variant: "left-accent",
        });
      }
    },
  });

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImageFiles((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImageFiles((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="post-container">
      <div className="post-card">
        <h2 className="post-title">Create Post</h2>
        <form onSubmit={formik.handleSubmit} className="post-form">
          <input
            type="text"
            className="post-title-input"
            placeholder="Enter title"
            {...formik.getFieldProps("title")}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="error-message">{formik.errors.title}</div>
          )}

          <input
            type="text"
            className="post-name-input"
            placeholder="Your name"
            {...formik.getFieldProps("profileName")}
          />
          {formik.touched.profileName && formik.errors.profileName && (
            <div className="error-message">{formik.errors.profileName}</div>
          )}

          <textarea
            className="post-textarea"
            placeholder="What's on your mind?"
            {...formik.getFieldProps("content")}
          />
          {formik.touched.content && formik.errors.content && (
            <div className="error-message">{formik.errors.content}</div>
          )}

          {/* Image Previews with Remove Button */}
          {imageFiles.length > 0 && (
            <div className="post-image-preview">
              {imageFiles.map((image, index) => (
                <div key={index} className="image-preview-wrapper">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    className="post-image"
                  />
                  <button
                    className="remove-image-button"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <MdCancel size={20} color="red" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="post-options">
            <div className="post-buttons">
              <button
                type="button"
                className="post-photo"
                onClick={() => fileInputRef.current.click()}
              >
                Choose File
              </button>
              <button
                type="button"
                className="post-feeling"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <FaSmile /> Feeling/Activity
              </button>
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: "none" }}
              multiple
            />
          </div>

          {showEmojiPicker && (
            <Picker
              onEmojiClick={(emojiObject) =>
                formik.setFieldValue(
                  "content",
                  formik.values.content + emojiObject.emoji
                )
              }
            />
          )}

          <button
            type="submit"
            className="post-submit"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
