import React from 'react';
import styles from './AlertBlock.module.css';
const AlertBlock = ({ name }) => (
  <div className={styles.wrapper}>
    <p className={styles.message}>{`${name} is allready in contacts`}</p>
  </div>
);

export default AlertBlock;
