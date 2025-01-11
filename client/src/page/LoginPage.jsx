import React, { useState } from 'react';
import {
  Typography,
  Alert,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from '@mui/material';
import { MailOutline, LockOutlined } from '@mui/icons-material';
import CustomButton from './../components/CustomButton';
import img from '../assets/loginImage.jpg';
import styles from '../styles/LoginForm.module.css';
import TextInput from '../components/TextInput';
import { login } from '../api/apiService';
import AlertComponent from '../components/AlertComponent';
import useAuthStore from '../hooks/authStore';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [showAlert, setShowAlert] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { setToken , setUsername ,setEmail } = useAuthStore();

  const theme = useTheme();
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      setShowAlert({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    if (formData.password.trim() === '') {
      setShowAlert({ type: 'error', message: 'Password cannot be empty.' });
      return;
    }
    setIsLoading(true);

    try {
 
      const response = await login(formData.email, formData.password);

      setShowAlert({ type: 'success', message: 'User login successful!' });
      
      const jwtToken = response.data.token;
      const userName = response.data.user.name;
      const email = response.data.user.email;

      localStorage.setItem("token", jwtToken);

      setToken(jwtToken);
      setEmail(email)
      setUsername(userName)

      console.log('Response:', response.data );

      navigate('/')

    } catch (error) {
      
      setShowAlert({ type: 'error', message: 'Login failed. Please try again.' });
      console.error('Error:', error);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginFormSection}>
          <div className={styles.welcomeText}>
            {showAlert.message && (
              <AlertComponent message={showAlert.message} type={showAlert.type} />
            )}

            <Typography className={styles.formTitle} variant="h4">
              Welcome Back!
            </Typography>
            <Typography className={styles.formSubtitle} variant="body1">
              Please sign in to continue
            </Typography>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <TextInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                icon={MailOutline}
                positionStart="start"
                aria-label="Email"
              />
            </div>

            <div className={styles.formGroup}>
              <TextInput
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                icon={LockOutlined}
                value={formData.password}
                onChange={handleChange}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                aria-label="Password"
              />
            </div>

            <div className={styles.forgotPassword}>
              <a href="#">Forgot password?</a>
            </div>

            <div className={styles.formActions}>
              <CustomButton button="Sign In" type="submit" fullWidth disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </CustomButton>
            </div>

            <div className={styles.signupPrompt}>
              Don't have an account?{' '}
              <a href="#" className={styles.signupLink}>
                Sign up
              </a>
            </div>
          </form>
        </div>

        <div className={styles.loginImageSection}>
          <img src={img} alt="Login illustration" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
