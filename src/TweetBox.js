import React from 'react';

class TweetBox extends React.Component {
    render() {
      return(
            <div style={{display:'inline-block'/*,border:"1px solid #00c0ef"*/,borderRadius:'10',width:'300px',height:'100px',marginLeft:'180px',marginTop:'50px'}}>
                
                <div className="rad-info-box rad-txt-primary" style={{/*border:"2px solid red",*/display: 'inline-block',verticalAlign: 'middle',marginRight:'10px'}}>
                    <img src={require('./twitter.png')} alt='twitter icon' style={{width:'90px',height:'90px'}}></img>
                </div>
                <div className="rad-info-box rad-txt-primary"style={{/*border:"2px solid red",*/display: 'inline-block',verticalAlign: 'middle'}}>
                    <span className="heading" style={{fontFamily: "Helvetica Neue ,Helvetica,Arial,sans-serif",fontSize:'19px',color:'#00c0ef'}}>Nombre de tweets</span><br/><br/>
                    <span className="value" style={{color:"#00c0ef"}}><span>{this.props.tweetNumber} </span>Tweet</span>
                </div>

            </div>
        );
    }
}

export default TweetBox;