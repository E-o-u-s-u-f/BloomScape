import { useState, useRef, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaSmile } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Picker from "emoji-picker-react";
import { useToast } from "@chakra-ui/react";
import JoditEditor from "jodit-react";
import "./Post.css";

export default function Post() {
  const [imageFiles, setImageFiles] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [existingContents, setExistingContents] = useState([]);
  const [userName, setUserName] = useState("");
  const fileInputRef = useRef(null);
  const editorRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Debug token
    if (!token) {
      toast({
        title: "Error",
        description: "Please log in to create a post",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    fetch("http://localhost:5000/api/multiple/cloud/contents", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Existing contents:", data); // Debug contents
        setExistingContents(data);
      })
      .catch((error) => console.error("Error fetching contents:", error));

      fetch("http://localhost:5000/api/user/profile", {
        credentials: "include", // Send cookies with the request
      })
        .then((res) => {
          console.log("Profile fetch status:", res.status);
          if (!res.ok) throw new Error("Failed to fetch user profile");
          return res.json();
        })
        .then((data) => {
          console.log("Profile data:", data);
          setUserName(data.fullName);
        })
        .catch((error) => {
          console.error("Error fetching user name:", error);
          toast({
            title: "Error",
            description: "Could not fetch user profile",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        });
  }, []);

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .required("Required"),
    content: Yup.string()
      .test("min-length", "Post must be at least 10 characters", (value) => {
        if (!value) return false;
        const textContent = value.replace(/<[^>]*>/g, "");
        return textContent.length >= 10;
      })
      .test("is-duplicate", "Content already exists", (value) => {
        if (!value) return true;
        const textContent = value.replace(/<[^>]*>/g, "");
        console.log("Checking duplicate:", textContent, existingContents); // Debug duplicate check
        return !existingContents.some((content) => content === textContent);
      })
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: { title: "", content: "" },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Submitting with:", { ...values, profileName: userName });
      try {
        const formData = new FormData();
        imageFiles.forEach((file) => formData.append("files", file));
        formData.append("profileName", userName);
        formData.append("title", values.title);
        formData.append("content", values.content);

        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/multiple/cloud", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        console.log("Response status:", response.status); // Debug response
        const data = await response.json();
        console.log("Response data:", data); // Debug data
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
          throw new Error(data.message || "Upload failed");
        }
      } catch (error) {
        console.error("Submission error:", error);
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
    console.log("Image files changed:", event.target.files);
    const files = Array.from(event.target.files);
    setImageFiles((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    console.log("Removing image at index:", index);
    setImageFiles((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const editorConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: "What's on your mind?",
      height: 300,
    }),
    []
  );

  return (
    <div className="post-container">
      <div className="post-card">
        <h2 className="post-title">Create Post</h2>
        <div className="post-name-display">
          <strong>Posting as:</strong> {userName || "Loading..."}
        </div>
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

          <div className="textarea-container">
            <JoditEditor
              ref={editorRef}
              value={formik.values.content}
              config={editorConfig}
              tabIndex={1}
              onBlur={(newContent) => formik.setFieldValue("content", newContent)}
              onChange={(newContent) => {}}
            />
          </div>
          {formik.touched.content && formik.errors.content && (
            <div className="error-message">{formik.errors.content}</div>
          )}

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
                    type="button"
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
              onEmojiClick={(emojiObject) => {
                console.log("Emoji selected:", emojiObject.emoji);
                formik.setFieldValue(
                  "content",
                  formik.values.content + emojiObject.emoji
                );
              }}
            />
          )}

          <button
            type="submit"
            className="post-submit"
            disabled={!formik.isValid || formik.isSubmitting || !userName}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}