import {
  faCaretUp,
  faCaretDown,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MDEditor from "@uiw/react-md-editor";
import React, { useEffect, useState } from "react";
import { AnswerInterface, PostInterface } from "../post/Post";
import styles from "./Answer.module.css";
import avatar from "../../assets/images/avatar.jpg";
import { voteType } from "../questionDetail/QuestionDetail";
import axios from "axios";
import { cleanup } from "@testing-library/react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../signIn/signInSlice";
interface AnswerProps {
  answer: AnswerInterface;
  deleteAnswer: (id: number) => void;
  postVote: (type: voteType, obj: PostInterface | AnswerInterface) => void;
  postChoose: (answerId: number) => void;
  isOwner: boolean;
}

export function Answer({
  answer,
  deleteAnswer,
  postVote,
  postChoose,
  isOwner,
}: AnswerProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState<string | undefined>(answer.body);
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    console.log(isOwner, "1232131");
  }, []);

  const patchAnswer = () => {
    const data = JSON.stringify({
      id: answer?.id,
      body: inputValue,
    });

    axios({
      method: "patch",
      url: `${process.env.REACT_APP_SERVER_HOST}/answers`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    })
      .then(() => {
        // alert("수정 완료!!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.postBox}>
        <div className={styles.recommendBox}>
          <div
            className={styles.upDown}
            onClick={() => {
              postVote(voteType.up, answer as AnswerInterface);
            }}
          >
            <FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon>
          </div>
          <div className={styles.upDownNumber}>{answer?.votes}</div>
          <div
            className={styles.upDown}
            onClick={() => {
              postVote(voteType.down, answer as AnswerInterface);
            }}
          >
            <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
          </div>

          <div
            className={
              answer.choose === true ? styles.choose : styles.notChoose
            }
            onClick={() => {
              if (isOwner) postChoose(answer.id);
            }}
          >
            <FontAwesomeIcon icon={faCheck} />
          </div>
        </div>
        <div className={styles.contentBox}>
          <div className={styles.content}>
            {isEdit ? (
              <div className={styles.updateBox}>
                <MDEditor
                  className={styles.updateEditor}
                  onChange={setInputValue}
                  preview="edit"
                  value={inputValue}
                />
                <button
                  className={styles.updateButton}
                  onClick={() => {
                    patchAnswer();
                    setIsEdit(!isEdit);
                  }}
                >
                  Update
                </button>
              </div>
            ) : (
              <MDEditor.Markdown
                source={`${inputValue}`}
                className={styles.preview}
              />
            )}
          </div>
          <div className={styles.tagsBox}>
            <ul className={styles.tags}>
              {/* <li>amazon-ec2</li> */}
              {/* <li>aws-codepipeline</li> */}
            </ul>
          </div>
          <div className={styles.contentUtilsBox}>
            <ul className={styles.editBox}>
              <li>Share 🚧</li>
              {userInfo?.id === answer.user.id ? (
                <li
                  onClick={(e) => {
                    setIsEdit(!isEdit);
                  }}
                >
                  Edit
                </li>
              ) : (
                ""
              )}
              {userInfo?.id === answer.user.id ? (
                <li
                  onClick={() => {
                    deleteAnswer(answer.id);
                  }}
                >
                  Delete
                </li>
              ) : (
                ""
              )}
            </ul>
            <div className={styles.userBox}>
              <img
                src={answer.user.image}
                alt="userImage"
                className={styles.avatar}
              />
              <div className={styles.username}>{answer?.user.nickname}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
