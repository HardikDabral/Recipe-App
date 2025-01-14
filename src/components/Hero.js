import React from "react";
import styles from '../styles/Hero.module.css'; // Create a CSS module for styles
import { motion } from "framer-motion";

const Hero = () => {
  const scrollToCards = () => {
    const cardsSection = document.getElementById("cards-section");
    if (cardsSection) {
      cardsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.heroContainer}>
      <motion.div
        className={styles.background}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }} // Zoom in and out
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }} // Adjust duration and easing as needed
      />
      <div className={styles.heroContent}>
        <p className={styles.flashSale}>FLASH SALE! - 30% OFF ON ALL RECIPE</p>
        <h1 className={styles.mainHeadline}>
          Savor the Flavors <br /> of Every Season
        </h1>
        <h3 className={styles.subheadline}>
          Explore the Ultimate Recipe Collection
        </h3>
        <motion.button
          className={styles.ctaButton}
          onClick={scrollToCards}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Now
        </motion.button>
      </div>
    </div>
  );
};

export default Hero;