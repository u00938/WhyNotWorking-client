import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./questionList.module.css";
import { Post } from "../post/Post";
import { faCaretDown, faCog } from "@fortawesome/free-solid-svg-icons";

export function QuestionList() {
  return (
    <div className={styles.container}>
      <div className={styles.questionBox}>
        <div className={styles.header}>
          <div className={styles.titleBox}>
            <div>All Questions</div>
            <div>20,889,999 questions</div>
          </div>
          <div className={styles.filterBox}>
            <div className={styles.btnWrapper}>
              <div className={styles.btn}>Ask Question</div>
            </div>
            <div className={styles.filterWrapper}>
              <div className={styles.newest}>Newest</div>
              <div className={styles.active}>Active</div>
              <div className={styles.bountied}>Bountied</div>
              <div className={styles.unanswered}>Unanswered</div>
              <div className={styles.more}>
                More
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faCaretDown}
                ></FontAwesomeIcon>
              </div>

              <div className={styles.customFilter}>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faCog}
                ></FontAwesomeIcon>
                Filter
              </div>
            </div>
          </div>
        </div>
        <div className={styles.postList}>
          <Post />
          <Post />
        </div>
        <div className={styles.paginationBox}></div>
      </div>
      <div className={styles.tagBox}></div>
    </div>
  );
}