import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";

import { Pagination } from "../pagination/Pagination";
import { setCurrentPage } from "../sidebar/sidebarSlice";
import { Tag } from "../tag/Tag";
import styles from "./Tags.module.css";
import { TagInfo } from "../user/UUser";
import axios from "axios";

export function Tags() {
  let match = useRouteMatch();
  const dispatch = useDispatch();
  const [tags, setTags] = useState<TagInfo[]>();

  const getTagsByPage = (page: number) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_HOST}/tags?page=${page}`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setTags(res.data.data);
    });
  };

  useEffect(() => {
    dispatch(setCurrentPage(match.path));
    getTagsByPage(1);
  }, [dispatch, match]);

  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>Tags</div>
      <div className={styles.descriptionBox}>
        A tag is a keyword or label that categorizes your question with other,
        similar questions. Using the right tags makes it easier for others to
        find and answer your question.
      </div>
      <div className={styles.controllBox}>
        <link
          href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
          rel="stylesheet"
        ></link>
        <input
          className={styles.input}
          placeholder="&#xf002; Filter by tag name"
        ></input>
        <div className={styles.filterBox}>
          <div className={styles.popular}>Popular</div>
          <div className={styles.name}>Name</div>
          <div className={styles.new}>New</div>
        </div>
      </div>
      <div className={styles.listBox}>
        {tags
          ? tags.map((t, i) => {
              <Tag key={i} tagInfo={t} />;
            })
          : ""}
      </div>
      <div className={styles.paginationBox}>
        <Pagination getDataByPage={getTagsByPage} />
      </div>
    </div>
  );
}
