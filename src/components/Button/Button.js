import React from 'react';
import styles from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ callbackfunc, text, type }) => {
  const key = text.toLowerCase();
  if (typeof callbackfunc === 'function') {
    return (
      <button
        onClick={() => callbackfunc(key)}
        className={styles.button}
        type={type}
      >
        {text}
      </button>
    );
  } else {
    return (
      <button className={styles.button} type={type}>
        {text}
      </button>
    );
  }
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  callbackfunc: PropTypes.func,
  type: PropTypes.string.isRequired,
};

export default Button;
