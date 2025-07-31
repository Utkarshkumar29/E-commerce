import { useState } from "react";
import { storage, signInWithGoogle } from "../../firebase/app";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [loginSuscess, setLoginSuccess] = useState(false);

  const handleImageChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (!file) return alert("Please select an image file");
    const storageRef = ref(storage, `profile-images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress.toFixed(0));
      },
      (error) => {
        console.error("Upload error:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
          console.log("File available at", downloadURL);
        });
      }
    );
    setLoginSuccess(true);
  };

  if (loginSuscess) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return (
    <div className="">
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <input type="email" placeholder="Email" />
      <input
        type="file"
        placeholder="Profile Image"
        onChange={handleImageChange}
      />
      <button onClick={handleSubmit}>Register</button>
       <button
        onClick={signInWithGoogle}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sign in with Google
      </button>
      {imageURL && (
        <div className="mt-4">
          ✅ Image uploaded! <br />
          <a href={imageURL} target="_blank" rel="noopener noreferrer">
            View Image
          </a>
        </div>
      )}
    </div>
  );
};

export default Login;
