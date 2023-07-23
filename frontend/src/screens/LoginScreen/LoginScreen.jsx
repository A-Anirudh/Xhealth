import { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import style from "./LoginScreen.module.css";
import { toast } from 'react-toastify';
import { useLoginMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate=useNavigate();
  const dispatch=useDispatch();

  const[login]=useLoginMutation();

  const {userInfo}=useSelector((state)=>state.auth)//to get the localstoarge data from redux

  useEffect(() => {
    if(userInfo){
        navigate('/profile_user')
    }
  

  },[navigate,userInfo])
  

  const submitHandler = async (e) => {//when you click login
    e.preventDefault();
    try {
        const res=await login({email,password}).unwrap() //{email,password} will b the boduy

        dispatch(setCredentials({res}))
        
    } catch (err) {
        toast.error(err?.data?.message||err.error)
    }
    
  };

  return (
    <section className={style['main-comtainer']}>
      <div className={`${style.form} ${style.login}`}>
        <div className={style['form-content']}>
          <header className={style.heading}>Sign In</header>

          <form onSubmit={submitHandler}>
            <div className={style.field}>
              <input
                className={style.inputs}
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={style.field}>
              <input
                className={style.inputs}
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className={style['form-link']}>
              <Link to='/register'>Forgot Password</Link>
            </div>

            <button type='submit' className={`${style.field} ${style['button-field']}`}>
              Login
            </button>

            <div className={style.new}>
              New User?<Link to='/register'>Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginScreen;
