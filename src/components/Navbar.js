import React, { useState } from 'react';
import styles from '../styles/Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import LoginSignupModal from './LoginSignupModal'; // Import the modal component

const Navbar = ({ onSearch, showSearch = true }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false); // State to toggle the modal

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery);
      const cardsSection = document.getElementById('cards-section');
      if (cardsSection) {
        cardsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">RECIPE BOOK</Link>
      </div>
      {showSearch && (
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by ingredients (e.g., apples, chicken)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className={styles.searchButton}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      )}
      <button className={styles.profileButton} onClick={() => setShowModal(true)}>
        <FontAwesomeIcon icon={faUser} />
      </button>
      {showModal && <LoginSignupModal onClose={() => setShowModal(false)} />}
    </nav>
  );
};

export default Navbar;
