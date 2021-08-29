import { 
useState } from 'react';

const LoginForm = ({ 
error, 
loading, 
handleLoginUser }) => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
};

return   (    
  <div className="LoginPage"> 
      <form onSubmit={ e => handleSubmit(e)}>
        <label>  
            Email
          <input
            data-cy={`email`}
            id="email"
            name="email"
            type="email"
            // value={email}
            onChange={ e => setEmail( e.target.value ) }
            placeholder="email"
            autoComplete="username"
          >
          </input>
        </label>
        <label>
          Password   
          <input
            data-cy={`password`}
            id="password"
            name="password"
            type="password"
            // value={password}
            onChange={ e => setPassword( e.target.value ) }
            placeholder="password"
            autoComplete="current-password"
          >
          </input>
        </label>
          <div>                   
          </div>
          { error  && (<div className="error"> { error.message }</div>)}
          <div></div>
          <button
            data-cy={`submit-login`}
            id="submit-login"
            type="submit"
            disabled={loading}
            onClick={e => handleLoginUser(email, password)}
          >
              Sign In
          </button>
        </form>    
  </div> 
  );
};

export default LoginForm;