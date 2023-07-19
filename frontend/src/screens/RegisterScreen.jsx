import { useState } from 'react';
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';


const RegisterScreen = () => {

    const [name, setName] = useState('');
    const [name2, setName2] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('submit');
    }
    return (
        <section className='main-comtainer'>
            <div className='form login'>
                <div className='form-content'>
                    <header className='heading'>Sign Up</header>
                    <form onSubmit={submitHandler}>
                        <div className='field input-field'>
                            <input type='text' placeholder='First name' value={name} onChange={(e) => { setName(e.target.value) }}></input>
                        </div>
                        <div className='field input-field'>
                            <input type='text' placeholder='Last name' value={name2} onChange={(e) => { setName2(e.target.value) }}></input>
                        </div>

                        <div className='field input-field'>

                            <input type='email' placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                        </div>

                        <div className='field input-field'>

                            <input type='password' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                        </div>

                        <div className='field input-field'>

                            <input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }}></input>
                        </div>

                        <button type='submit'  className='field button-field'>
                            Sign In
                        </button>

                        <div className='new'>

                            Already have an account? <Link to='/login'>Sign In</Link>

                        </div>


                    </form>
                </div>
            </div>
        </section>

    )
}

export default RegisterScreen;