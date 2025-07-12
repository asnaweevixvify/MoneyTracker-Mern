import React from 'react'

function Login() {
  return (
    <div className="form-container">
        <h1 className='title'>เข้าสู่ระบบ</h1>
        <form>
            <h3>Username</h3>
            <input type='text'></input>
            <h3>Password</h3>
            <input type='password'></input>
            <button type='submit'>เข้าสู่ระบบ</button>
        </form>
    </div>
  )
}

export default Login