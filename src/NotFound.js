import React from 'react';
import './css/styleerror.css';

class NotFound extends React.Component {
    render() {
      return(<div id="notfound">
      <div class="notfound">
          <div class="notfound-404">
              <h1>Oops!</h1>
              <h2>Internal server error</h2>
          </div>
          <a href="/">Refresh page</a>
      </div>
  </div>  
        );
    }
}

export default NotFound;