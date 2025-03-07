import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/Input/passwordInput'
import { validateEmail, validatePassword } from '../../utils/helper'

const SignUp = () => {

  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError] = useState(null);

  const handleSignUp = async (e) => {
      e.preventDefault();

      if(name.length < 3) {
        setError('Name must have atleast 3 characters!');
        return;
      }

      if(!validateEmail(email)) {
        setError('Invalid email address!');
        return;
      }

      if(!validatePassword(password)) {
        setError('Invalid Password!');
        return;
      }

      setError("");

      //SignUp API call
    }

  return (
  <>
    <Navbar />

    <div className='flex items-center justify-center mt-28'>
      <div className='w-96 border rounded bg-white px-7 py-10'>
        <form onSubmit={handleSignUp}>
            <h4 className='text-2xl mb-7 login'>SIGN UP</h4>

              {/* Edit Placeholder to display example email address being written letter by letter and removed letter by letter */}
              <input
                type='text'
                placeholder='Name'
                className='input-box border-[1.5px] px-5'

                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type='text'
                placeholder='Email'
                className='input-box border-[1.5px] px-5'

                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className='text-red-500 text-sm pb-2'>{error}</p>}

              <button type='submit' className='btn-primary'>
                Sign Up
              </button>

              <p className='text-sm text-center mt-4'>
                Already have an account?{' '}
                <Link to='/login' className='font-bold text-primary cursor-pointer underline'>
                  Login
                </Link>
              </p>
          </form>
      </div>
    </div>
  </>

  )
}

export default SignUp