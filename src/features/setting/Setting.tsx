import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Setting.module.css";
import { MenuProps } from "../activity/Activity";
import { Editor } from "../editor/Editor";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export function Setting({ setCurPage, userInfo }: MenuProps) {
  const [nickname, setNickname] = useState<string | null>(
    userInfo ? userInfo.nickname : ""
  );
  const [location, setLocation] = useState<string | null>(
    userInfo ? userInfo.location : ""
  );
  const [image, setImage] = useState<string | undefined>(
    userInfo ? userInfo.image : ""
  );
  const [aboutMe, setAboutMe] = useState<string | undefined>(
    userInfo ? userInfo.aboutMe : ""
  );
  const [saved, setSaved] = useState(false);
  const saveProfile = () => {
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    if (nickname) {
      formData.append("nickname", nickname);
    }
    if (location) {
      formData.append("location", location);
    }
    if (aboutMe) {
      formData.append("aboutMe", aboutMe);
    }

    axios({
      method: "patch",
      url: `${process.env.REACT_APP_SERVER_HOST}/users/`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then(() => setSaved(true))
      .catch((error) => {
        console.log(error);
      });
  };
  const fileInput = React.createRef<any>();

  const imageChangeHandler = () => {
    let reader = new FileReader();
    reader.onloadend = () => {
      setImage(`${reader.result}`);
    };
    let url = reader.readAsDataURL(fileInput.current.files[0]);
    console.log(image);
  };

  useEffect(() => {
    console.log(userInfo);
    setCurPage("setting");
    // if (userInfo) {
    //   const { nickname, location, aboutMe, image } = userInfo;
    //   setNickname(nickname);
    //   setLocation(location);
    //   setAboutMe(aboutMe);
    //   setImage(image);
    // }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Edit your profile</div>
      <div className={styles.infoBox}>
        <div className={styles.imgSetting}>
          <div className={styles.midHead}>Public information</div>
          <div className={styles.imgBox}>
            <img className={styles.img} src={image} alt="profile picture" />
            <label htmlFor="fileInput" className={styles.profileBtn}>
              Change picture
            </label>
          </div>

          <input
            type="file"
            onChange={imageChangeHandler}
            ref={fileInput}
            className={styles.fileInput}
            id="fileInput"
          ></input>
        </div>
        <div className={styles.infoSetting}>
          <div className={styles.lastHead}>Display name</div>
          <input
            type="text"
            className={styles.input}
            value={nickname !== null ? nickname : ""}
            onChange={(e) => setNickname(e.target.value)}
          ></input>
          <div className={styles.lastHead}>Location</div>
          <input
            type="text"
            className={styles.input}
            placeholder="위치 입력"
            value={location !== null ? location : ""}
            onChange={(e) => setLocation(e.target.value)}
          ></input>
        </div>
      </div>
      <div className={styles.aboutMeBox}>
        <div className={styles.lastHead}>About me</div>
        <Editor setValue={setAboutMe} value={aboutMe} />
      </div>
      <div className={styles.btnBox}>
        <div className={`${saved ? styles.saved : styles.beforeSaved}`}>
          <FontAwesomeIcon
            icon={faCheck}
            className={styles.icon}
          ></FontAwesomeIcon>
          <div>Your profile has been saved successfully.</div>
        </div>
        <div className={styles.saveBtn} onClick={saveProfile}>
          Save profile
        </div>
      </div>
    </div>
  );
}
