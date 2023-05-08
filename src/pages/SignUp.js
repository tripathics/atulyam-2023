import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'
import { auth, db } from '../config/config-dev'
// import { auth, db } from '../config/config-prod'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth'

import { ReactComponent as SpinnerIcon } from '../media/icons/spinner.svg'
import { ReactComponent as GoogleIcon } from '../media/icons/google-g.svg'
import { ReactComponent as LinkIcon } from '../media/icons/link.svg'
import { motion } from 'framer-motion';

import styles from '../styles/Login.module.scss';
import cx from 'classnames'
import Alert from '../components/Alert';
import SupportLink from '../components/SupportLink';

const Signup = ({ user, updateAuthUserAttr, logoutUser }) => {
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
        return setDoc(doc(db, 'users', authUser.user.uid), {
          email: email
        })
      })
      .then(() => {
        setSuccessMsg('Signup Successful');
        resetForm();
        setErrorMsg('');
        setTimeout(() => {
          history('/update-profile');
        }, 500);
      })
      .catch((error) => {
        setLoading(false);
        setErrorMsg(error.message);
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const handleGoogleAuth = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async(result) => {
        const user = result.user;
        const snap = await getDoc(doc(db, 'users', user.uid))
        if (snap.exists() && snap.data().isProfileComplete) {
          const update = { user: user, isProfileComplete: true };
          if (snap.data().admin) update.admin = true;
          updateAuthUserAttr(update);
          history('/register');
        } else {
          setDoc(doc(db, 'users', user.uid), {
            email: user.email
          }).then(() => {
            setErrorMsg('');
            history('/update-profile');
          })
          .catch(err => {
            setLoading(false);
            resetForm();
            logoutUser(err.message, 'error')
          })
        }
      })
      .catch(err => {
        resetForm();
        setErrorMsg(err.message);
        setLoading(false);
      })
  }

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  useEffect(() => {
    if (user.user) history('/register');
  }, [])

  return (
    <motion.div className={cx(styles['login-page'], 'page-transition')}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
    >
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
              <button onClick={handleGoogleAuth} value='google' type='button' className='btn secondary'>
                <span className='btn-subtitle'></span>
                <span className='btn-text'>Continue with Google</span>
                <GoogleIcon />
              </button>
            </div>
          </form>
          <SupportLink />
        </div>
      </div>
    </motion.div>
  )
}

export default Signup