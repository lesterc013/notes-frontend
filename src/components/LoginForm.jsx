import PropTypes from 'prop-types'

const LoginForm = ({
  username,
  password,
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid='username'
            type='text'
            name='Username'
            value={username}
            onChange={(event) => {
              handleUsernameChange(event.target.value)
            }}
          />
        </div>

        <div>
          password
          <input
            data-testid='password'
            type='password'
            name='Password'
            value={password}
            onChange={(event) => handlePasswordChange(event.target.value)}
          />
        </div>

        <div>
          <button type='submit' name='login'>
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
