import { Alert, Button, TextInput , Modal} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSucccess,
  deleteUserFailure,
  signOutSuccess,
  signOutFailure
} from "../redux/user/userSlice";
import {HiOutlineExclamationCircle} from 'react-icons/hi';
import { Link } from "react-router-dom";
export default function DashProfile() {
  const dispatch = useDispatch();
  const { currentUser ,error ,loading } = useSelector((state) => state.user);
  const fileRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isUploadCompleted, setIsUploadCompleted] = useState(false);
  const [formData, setFormData] = useState({});
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  // console.log("imageFile-->", imageFile);
  // console.log("imageFileUrl-->", imageFileUrl);
  //how we know that image is changing or uploading
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const uploadImage = async () => {
    // console.log("uploading.....");
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    //if user inputs same file more than one time then it will handle it
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //else it will show 10.89 thats why we used toFixed(0) it will result 10
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploading(false);
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
          setIsUploadCompleted(true);
        });
      }
    );
  };
  // console.log("imageFileUploadProgress-->", imageFileUploadProgress);
  // console.log("imageFileUploading-->", imageFileUploading);
  // console.log("imageFileUploadError-->", imageFileUploadError);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSucccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(signOutFailure(data.message));
      } else {
        dispatch(signOutSuccess(data));
      }
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl ">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          onChange={handleImageChange}
          hidden
        />

        <div
          onClick={() => fileRef.current.click()}
          className="relative w-32 h-32 rounded-full self-center shadow-md overflow-hidden cursor-pointer"
        >
          {imageFileUploadProgress &&
            !isUploadCompleted && (
              <CircularProgressbar
                value={imageFileUploadProgress || 0}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={3}
                styles={{
                  root: {
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(62, 152, 199, ${
                      imageFileUploadProgress / 100
                    })`,
                    strokeLinecap: "butt",
                    transition: "stroke-dashoffset 0.5s ease 0s",
                    transform: "rotate(0.25turn)",
                    transformOrigin: "center center",
                  },
                  trail: {
                    stroke: "#d6d6d6",
                    strokeLinecap: "butt",
                    transform: "rotate(0.25turn)",
                    transformOrigin: "center center",
                  },
                  text: {
                    fill: "#f88",
                    fontSize: "16px",
                  },
                  background: {
                    fill: "#3e98c7",
                  },
                }}
              />
            )}
          <img
            className={`w-full h-full rounded-full object-cover border-6 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
            src={imageFileUrl || currentUser.profilePicture}
            alt=""
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          placeholder="email"
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline disabled={loading || imageFileUploading}>
          {loading ? 'loading...':'Update'}
        </Button>
        {currentUser.isAdmin && (
          <Link to={'/create-post'}>
          <Button className="w-full" type="button" gradientDuoTone="purpleToPink" outline>
            Create a post
          </Button>
        </Link>
        )}
      </form>
      <div className="text-red-500 mt-5 flex justify-between">
        <button onClick={() => setOpenModal(true)}>Delete user</button>
        <button onClick={handleSignout}>Sign out</button>
      </div>
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {error && (
        <Alert color="success" className="mt-5">
          {error}
        </Alert>
      )}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
