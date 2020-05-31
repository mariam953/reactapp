import React from 'react';

class TweetBox extends React.Component {
    render() {
      return(
        <header className="header-fixed">
            <div className="header-limiter">
            <h1><a href="/">Twitter<span>Analytics</span></a></h1>
            <nav>
                <a href="/Home" className={this.props.p1selected}>Home</a>
                <a href="/analysis" className={this.props.p2selected}>Analysis</a>
            </nav>
            </div>
        </header>        
        );
    }
}

export default TweetBox;
