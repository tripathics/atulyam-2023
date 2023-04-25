import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import cx from 'classnames';
import styles from '../styles/Login.module.scss';

import { signInWithEmailAndPassword, signOut } from '@firebase/auth';
import { auth, db } from '../config/config';

import { ReactComponent as ErrorIcon } from '../media/icons/error.svg'
import { ReactComponent as SpinnerIcon } from '../media/icons/spinner.svg'
import { ReactComponent as LinkIcon } from '../media/icons/link.svg'
import { ReactComponent as GoogleIcon } from '../media/icons/google-g.svg'

import { NavLink } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const Login = ({ user, loginUser, logoutUser }) => {
  const history = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((res) => {
        const credential = GoogleAuthProvider.credentialFromResult(res);
        const token = credential.accessToken;
        const authUser = {
          user: res.user,
          admin: false
        }
        loginUser(authUser);
        redirect(authUser.admin);
      }).catch((err) => {
        setErrorMsg(err.message);
        resetForm();
        logoutUser();
        setLoading(false);
      });
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    signInWithEmailAndPassword(auth, email, password).then(async (res) => {
      const docSnap = await getDoc(doc(db, 'users', res.user.uid));
      if (docSnap.exists()) {
        console.log(docSnap.data())
        console.log(docSnap.data().isProfileComplete === true);
        const authUser = {
          user: res.user,
          isProfileComplete: docSnap.data().isProfileComplete === true,
          admin: false
        }
        loginUser(authUser);
        redirect(authUser);  
      }
      else {
        signOut(auth);
        setErrorMsg('Invalid user!');
        resetForm();
        setLoading(false);
      }
    }).catch(err => {
      setErrorMsg(err.message);
      resetForm();
      logoutUser();
      setLoading(false);
    })
  }

  const redirect = (user) => {
    if (user.isProfileComplete) {
      history('/register');
    } else {
      history('/profile');
    }
  }

  const resetForm = () => {
    setEmail('');
    setPassword('');
  }

  useEffect(() => {
    if (user.user) history('/');
  })

  return (
    <div className={styles['login-page']}>
      <div className='container'>
        <header className={cx('page-header', styles.header)}>
          <h1 className='heading'>Login</h1>
        </header>
        <div className={styles['form-box']}>
          <div className='messages'>
            {errorMsg && <div className={cx(styles['login-msg'], styles.error)}>
              <div className={styles.icon}><ErrorIcon /></div>
              {errorMsg}
            </div>}
          </div>
          <form className={styles['login-form']} onSubmit={handleLogin}>
            <div className={cx(styles['login-field'], styles.email)}>
              <input type='email' required placeholder='Your Email' onChange={(e) => setEmail(e.target.value)} value={email} ></input>
            </div>
            <div className={cx(styles['login-field'], styles.password)}>
              <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} required placeholder='Password'></input>
            </div>

            <div className={styles['btns-wrapper']}>
              <button className={cx('btn', { ['disabled']: loading })} type="submit">
                <span className='btn-subtitle'></span>
                <span className='btn-text'>Login</span>
                {loading && <SpinnerIcon />}
              </button>
              <NavLink to='/signup' className='btn secondary'>
                <span className='btn-subtitle'>Don't have an account?</span>
                <span className='btn-text'>Sign up</span>
                <LinkIcon />
              </NavLink>
            </div>
            <div className={styles['btn-wrapper']}>
              <button onClick={handleGoogleLogin} value='google' type='button' className='btn secondary'>
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

export default Login;