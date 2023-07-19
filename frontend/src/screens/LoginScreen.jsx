import { useState } from 'react';
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';


const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('submit');
    }
    return (
        <section className='main-comtainer'>
            <div className='form login' >
                <div className='form-content'>
                    <header className='heading'>Sign In</header>

                    <form onSubmit={submitHandler} >

                        <div className='field input-field'>

                            <input className='inputs' type='email' placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                        </div>

                        <div className='field input-field'>
                            <input className='inputs' type='password' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                        </div>

                        <div className='form-link'>
                            <a href='/register'>Forgot Password</a>
                        </div>

                        <button type='submit' className='field button-field' >
                            Login
                        </button>

                        <div className='new'>
                            New User?<a href='/register'>Sign Up</a>
                        </div>


                    </form>
                </div>
            </div>
        </section>

    )
}

export default LoginScreen