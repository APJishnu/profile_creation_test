"use client";
import React from "react";
import { Spin } from "antd";
import styles from "./loader.module.scss";

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderBackdrop}>
      <div className={styles.loaderContainer}>
        <Spin 
          size="large" 
          tip="Loading..."
          className={styles.spinLoader}
        />
      </div>
    </div>
  );
};

export default Loader;
