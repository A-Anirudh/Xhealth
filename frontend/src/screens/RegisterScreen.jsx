import {useState} from 'react';
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';


const RegisterScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('submit');
    }
  return (
    <FormContainer>
        <h1>Sign Up</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='my-2'>
                <Form.Label>Name:</Form.Label>
                <Form.Control type='text' placeholder='enter name' value={name} onChange={(e)=>{setName(e.target.value)}}></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='my-2'>
                <Form.Label>Email:</Form.Label>
                <Form.Control type='email' placeholder='enter email' value={email} onChange={(e)=>{setEmail(e.target.value)}}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className='my-2'>
                <Form.Label>Password:</Form.Label>
                <Form.Control type='password' placeholder='enter password' value={password} onChange={(e)=>{setPassword(e.target.value)}}></Form.Control>
            </Form.Group>
            
            <Form.Group controlId='confirmPassword' className='my-2'>
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-3'>
                Sign In
            </Button>

            <Row className='py-3'>
                <Col>
                Already have an account? <Link to='/login'>sign in</Link>
                </Col>
            </Row>


        </Form>
    </FormContainer>
  )
}

export default RegisterScreen;