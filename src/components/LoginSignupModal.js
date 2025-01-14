import React from 'react';
import styles from '../styles/LoginSignupModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const LoginSignupModal = ({ onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>Login / Signup</h2>
        <form className={styles.form}>
          <input type="email" placeholder="Email" required className={styles.input} />
          <input type="password" placeholder="Password" required className={styles.input} />
          <button type="submit" className={styles.submitButton}>Login</button>
        </form>
        <p>Don't have an account? <a href="#">Sign up</a></p>
      </div>
    </div>
  );
};

export default LoginSignupModal;
