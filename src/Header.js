import React from 'react';

class TweetBox extends React.Component {
    render() {
      return(
        <header class="header-fixed">
            <div class="header-limiter">
            <h1><a href="/">Twitter<span>Analytics</span></a></h1>
            <nav>
                <a href="/Home" class={this.props.p1selected}>Home</a>
                <a href="/analysis" class={this.props.p2selected}>Analysis</a>
            </nav>
            </div>
        </header>        
        );
    }
}

export default TweetBox;
