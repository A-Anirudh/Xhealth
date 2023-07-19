import {useState} from 'react';
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';


const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('submit');
    }
  return (
    <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email' className='my-2'>
                <Form.Label>Email:</Form.Label>
                <Form.Control type='email' placeholder='enter email' value={email} onChange={(e)=>{setEmail(e.target.value)}}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className='my-2'>
                <Form.Label>Password:</Form.Label>
                <Form.Control type='password' placeholder='enter password' value={password} onChange={(e)=>{setPassword(e.target.value)}}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-3'>
                Sign In
            </Button>

            <Row className='py-3'>
                <Col>
                New Customer? <Link to='/register'>sign up</Link>
                </Col>
            </Row>


        </Form>
    </FormContainer>
  )
}

export default LoginScreen