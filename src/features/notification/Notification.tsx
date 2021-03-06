import React, { useState } from "react";
import { Logout } from "../logout/Logout";
import styles from "./Notification.module.css";

type NotificationProps = { title: string };

export function Notification({ title }: NotificationProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>{title}</div>
      </header>
      <main className={styles.content}>
        <Logout></Logout>
      </main>
    </div>
  );
}
