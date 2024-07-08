const LoginForm = ({ username, password, handleLogin, handleUsernameChange, handlePasswordChange }) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type='text'
            name='Username'
            value={username} 
            onChange={(event) => {handleUsernameChange(event.target.value)}} 
            />
        </div>

        <div>
          password
            <input
            type='password'
            name='Password'
            value={password}
            onChange={(event) => handlePasswordChange(event.target.value)} 
            />
        </div>

        <div>
          <button type='submit' name='login'>Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm