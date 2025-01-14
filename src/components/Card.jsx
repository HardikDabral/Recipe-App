import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Import the search icon
import styles from '../styles/Card.module.css';

const Card = ({ title, imageUrl, id }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/recipe/${id}`);
    };

    // Truncate title if it exceeds 40 characters
    const truncatedTitle = title.length > 40 ? `${title.substring(0, 40)}...` : title;

    return (
        <motion.div
            className={styles.card}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
        >
            <div className={styles.imageContainer}>
                <img src={imageUrl} alt={title} className={styles.image} />
            </div>
            <div className={styles.content}>
                <h2 className={styles.title}>{truncatedTitle}</h2>
                <button className={styles.viewButton} onClick={handleClick}>
                    <FontAwesomeIcon icon={faSearch} /> View Recipe
                </button>
            </div>
        </motion.div>
    );
};

export default Card;