const LoginForm = ({ username, password, handleLogin, setUsername, setPassword }) => {
  return (
  <form onSubmit={handleLogin}>
    <div>
      username
        <input
        type='text'
        name='Username'
        value={username} 
        onChange={(event) => {setUsername(event.target.value)}} 
        />
    </div>

    <div>
      password
        <input
        type='password'
        name='Password'
        value={password}
        onChange={(event) => setPassword(event.target.value)} 
        />
    </div>

    <div>
      <button type='submit' name='login'>Login</button>
    </div>
  </form>
  )
}

export default LoginForm