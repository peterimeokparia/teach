import 
React, { 
useState } from 'react';

import './style.css';

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
            name="email"
            type="email"
            value={email}
            onChange={ e => setEmail( e.target.value ) }
            placeholder="email"
          >
          </input>
          </label>
            <label>
            Password   
            <input
              name="password"
              type="password"
              value={password}
              onChange={ e => setPassword( e.target.value ) }
              placeholder="password"
            >
            </input>
            </label>
            <div>                   
            </div>
            { error  && (<div className="error"> { error.message }</div>)}
            <div></div>
            <button
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