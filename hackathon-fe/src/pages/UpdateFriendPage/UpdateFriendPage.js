import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { BsArrowLeft } from "react-icons/bs";
import * as friendsService from "../../utilities/friends-service";
import { splitDOB } from "../../utilities/helpers";

import Header from "../../components/Header/Header";

import styles from "../CreateFriendPage/CreateFriendPage.module.css";

function UpdateFriendPage () {
  const navigate = useNavigate();
  const { id } = useParams();

  const [profileInput, setProfileInput] = useState(null);
  const [displayFile, setDisplayFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [buttonHTML, setButtonHTML] = useState('Add profile photo');

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchFriend = async () => {
      const friendInfo = await friendsService.showFriend(id);
      setProfileInput({
        ...friendInfo
      });
      if (friendInfo.photo) {
            setDisplayFile(friendInfo.photo);
            setButtonHTML('Change photo');
      }
    }
    fetchFriend();
  }, [id]);

  function handleAddPhotoClick (evt) {
    evt.preventDefault();
    fileInputRef.current.click();
}

function handleFileChange (evt) {
    // assigns file upload to display image, adds file to state for form submit, and toggles button HTML
    const file = evt.target.files[0];
    if (file) {
        setDisplayFile(URL.createObjectURL(file));
        setUploadedFile(file);
        setButtonHTML('Change photo');
    } else {
        setDisplayFile(null);
        setUploadedFile(null);
        setButtonHTML('Add profile photo');
    } 
}

  const handleGiftTypeToggle = (type) => {
    const newGiftTypes = profileInput.giftPreferences.includes(type)
      ? profileInput.giftPreferences.filter((t) => t !== type)
      : [...profileInput.giftPreferences, type];
    setProfileInput({ ...profileInput, giftPreferences: newGiftTypes });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await friendsService.updateFriend(id, profileInput);
    if (uploadedFile) {
        const photoResponse = await friendsService.uploadPhoto(id, uploadedFile);
        if (photoResponse.ok && response.message === 'Friend updated') navigate(`/friend/${id}`);
    }
    if (response.message === 'Friend updated') navigate(`/friend/${id}`);

  };

  return (
    <>
      <Header />
      <div className={styles["create-profile-container"]}>
        <div>
          <p onClick={() => navigate(-1)}>
            <BsArrowLeft />
          </p>
          <h1>Edit Friend Profile</h1>
        </div>

        <form onSubmit={submitHandler} encType="multipart/form-data">
          <div>
            { displayFile ? (
                    <img src={`${displayFile}`} alt="Uploaded" style={{ height: '80px', width: '80px', paddingBottom: '6px' }}/>
                ) : (
                    <label htmlFor="image" className={styles["add-image"]} >+</label>
            )}
            <input type="file" name="photo" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
            <button onClick={handleAddPhotoClick}>{buttonHTML}</button>
          </div>
          <br />

          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={profileInput && profileInput.name}
              onChange={(e) => setProfileInput({ ...profileInput, name: e.target.value })}
            />
          </div>
          <br />

          <div>
            <div>
              <label htmlFor="dob">DOB</label>
              <input
                type="date"
                id="dob"
                value={profileInput && profileInput.dob}
                onChange={(e) =>
                  setProfileInput({ ...profileInput, dob: e.target.value })
                }
              />
            </div>

            <div>
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                value={profileInput && profileInput.gender}
                onChange={(e) =>
                    setProfileInput({ ...profileInput, gender: e.target.value })
                }
              >
                <option disabled></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <br />

          <div>
            <label htmlFor="location">Location</label>
            <input
              id="location"
              value={profileInput && profileInput.location}
              onChange={(e) =>
                setProfileInput({ ...profileInput, location: e.target.value })
              }
            />
          </div>
          <br />

          <div>
            <p>Gift type Preferences (choose all that apply)</p>
            <div>
              <button
                type="button"
                onClick={() => handleGiftTypeToggle("Present")}
              >
                Present
              </button>
              <button
                type="button"
                onClick={() => handleGiftTypeToggle("Experience")}
              >
                Experience
              </button>
              <button
                type="button"
                onClick={() => handleGiftTypeToggle("Donation")}
              >
                Donation
              </button>
            </div>
          </div>
          <br />

          {/* <div>
            <label htmlFor="giftcost">Gift Cost</label>
            <select
              id="giftcost"
              value={profile.giftCost}
              onChange={(e) =>
                setProfile({ ...profile, giftCost: e.target.value })
              }
            >
              <option disabled></option>
              <option value="Low">$ - Low</option>
              <option value="Medium">$$ - Medium</option>
              <option value="High">$$$ - High</option>
            </select>
          </div> */}
          <br />

          <button onClick={submitHandler}>Confirm</button>
        </form>
      </div>
    </>
  );
}

export default UpdateFriendPage;
