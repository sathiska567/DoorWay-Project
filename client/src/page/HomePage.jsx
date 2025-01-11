import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import headerImage from '../assets/headerImage.jpg';
import styles from '../styles/Home.module.css';
import useAuthStore from '../hooks/authStore';

export default function HomePage() {
  const [authToken, setAuthToken] = useState(null);
  const [userInfo, setUserInfo] = useState({ username: '', email: '' });

  const token = useAuthStore((state) => state.token);
  const username = useAuthStore((state) => state.username);
  const email = useAuthStore((state) => state.email);

  useEffect(() => {
    setAuthToken(token);
    setUserInfo({ username, email }); 
  }, [token, username, email]);


  return (
    <>
      <div className={styles.header}>
        <NavBar />
        <div className={styles.imageSection}>
          <img
            src={headerImage}
            alt="Header"
            loading="lazy"
          />
          <div className={styles.textOverlay}>
            <h1 className={styles.welcome}>Welcome {userInfo.username}</h1>
            <p className={styles.description}>
              Discover a world of possibilities and innovation. We're excited to have you here
              and look forward to helping you achieve your goals.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}