import React, { useState } from 'react';
import {
  Alert,
  Box,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Mail, Lock, Visibility, VisibilityOff, MailOutline, LockOutlined } from '@mui/icons-material';
import CustomButton from './../components/CustomButton';
import img from '../assets/loginImage.jpg';
import styles from '../styles/LoginForm.module.css';
import TextInput from '../components/TextInput';
import axios from 'axios';
import { login } from '../api/apiService';
import AlertComponent from '../components/AlertComponent';

const LoginPage = () => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form submitted:', formData);
      const response = await login(formData.email, formData.password);
      setShowAlert(true);  
      console.log(response.data);
    } catch (error) {
      setShowAlert(true);
      // alert('This is an info alert — check it out!');
    }
  };
  

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginFormSection}>
          <div className={styles.welcomeText}>

          {showAlert ? (
            <AlertComponent 
            message = {"User Login Successful"}
            type = {"success"}
            />
          ) : (
            <AlertComponent 
              message = {"User Login Have An issue"}
              type = {"error"}
              />
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
                label={"Email"}
                name="email"
                type={"email"}
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                icon={MailOutline}
                positionStart={"start"}
              />
            </div>

            <div className={styles.formGroup}>
              <TextInput
                label="Password"
                name="password"
                type="password"
                icon={LockOutlined}
                value={formData.password}
                onChange={handleChange}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>

            <div className={styles.forgotPassword}>
              <a href="#">Forgot password?</a>
            </div>

            <div className={styles.formActions}>
              <CustomButton
                button="Sign In"
                onClick={handleSubmit}
                fullWidth
              />
            </div>

            <div className={styles.signupPrompt}>
              Don't have an account?
              <a href="#" className={styles.signupLink}>Sign up</a>
            </div>
          </form>
        </div>

        <div className={styles.loginImageSection}>
          <img src={img} alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
