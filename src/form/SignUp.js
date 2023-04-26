import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'
import { auth, db } from '../config/config'
import { doc, setDoc } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth'

import { ReactComponent as SpinnerIcon } from '../media/icons/spinner.svg'
import { ReactComponent as GoogleIcon } from '../media/icons/google-g.svg'
import { ReactComponent as LinkIcon } from '../media/icons/link.svg'

import styles from '../styles/Login.module.scss';
import cx from 'classnames'
import Alert from '../components/Alert';

const SignIn = ({ user, loginUser, logoutUser }) => {
  const history = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match!');
      setLoading(false);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        const authUser = {
          user: credential.user,
          admin: false,
          isProfileComplete: false
        }
        // loginUser(authUser);
        return setDoc(doc(db, 'users', authUser.user.uid), {
          email: email
        })
      })
      .then(() => {
        setSuccessMsg('Signup Successfull.');
        resetForm();
        setErrorMsg('');
        setTimeout(() => {
          history('/update-profile', {
            state: { to: '/register' }
          });
        }, 500);
      }).catch((error) => {
        setLoading(false);
        setErrorMsg(error.message);
        console.error(error);
      })
  }

  // TODO: fetch user data from google API
  const SignUpWithGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        console.log(result.user);
        console.log(credential);
        console.log(token);
        // setSignedUp(true);
        // updateSignInRoutes();
      }).catch((err) => {
        // Handle Errors here.
        // const errorCode = err.code;
        // const errorMessage = err.message;
        // // The email of the user's account used.
        // const email = err.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(err);

        setLoading(false);
        setErrorMsg(err.message);
        resetForm();
        logoutUser();
        setLoading(false);
      });
  }

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  useEffect(() => {
    if (user.user) history('/');
  }, [])

  return (
    <div className={styles['login-page']}>
      <div className='container'>
        <header className={cx('page-header', styles.header)}>
          <h1 className='heading'>Sign Up</h1>
        </header>
        <div className={styles['form-box']}>

          <Alert message={successMsg} severity='success' handleDismiss={(e) => { e.preventDefault(); setSuccessMsg('') }} />
          <Alert message={errorMsg} severity='error' handleDismiss={(e) => { e.preventDefault(); setErrorMsg('') }} />

          <form className={styles['login-form']} onSubmit={handleSignUp}>
            <div className={cx(styles['login-field'], styles.email)}>
              <input type='email' required placeholder='Your Email' onChange={(e) => setEmail(e.target.value)} value={email} ></input>
            </div>
            <div className={cx(styles['login-fields'])}>
              <div className={cx(styles['login-field'], styles.password)}>
                <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} required placeholder='Password'></input>
              </div>
              <div className={cx(styles['login-field'], styles.password)}>
                <input type='password' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required placeholder='Confirm password'></input>
              </div>
            </div>

            <div className={styles['btns-wrapper']}>
              <button disabled={loading} className={'btn'} type="submit">
                <span className='btn-subtitle'></span>
                <span className='btn-text'>Sign up</span>
                {loading && <SpinnerIcon />}
              </button>
              <NavLink to='/signin' className='btn secondary'>
                <span className='btn-subtitle'>Already have an account?</span>
                <span className='btn-text'>Sign in</span>
                <LinkIcon />
              </NavLink>
            </div>
            <div className={styles['btn-wrapper']}>
              <button onClick={SignUpWithGoogle} value='google' type='button' className='btn secondary'>
                <span className='btn-subtitle'></span>
                <span className='btn-text'>Continue with Google</span>
                <GoogleIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn