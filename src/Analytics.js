import React from 'react';
import Header from './Header';

class Analytics extends React.Component {
    //document.getElementById("p2").className = "selected";//.getElementsByClassName('snap') // Returns the elements
    render() {
      return(
          <div>
              <Header p2selected="selected"/>
              <div style={{display:'inline-block'/*,border:"1px solid #00c0ef"*/,borderRadius:'10',width:'300px',height:'100px',marginLeft:'180px',marginTop:'50px'}}>
             Analytics
            </div>
          </div>
        );
    }
}

export default Analytics;