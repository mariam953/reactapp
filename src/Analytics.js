import React,{ useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import {withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TweetBox from './TweetBox';
import Header from './Header';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './css/styleerror.css';
import './css/loading.css';



export default function CustomPaginationActionsTable() {
    const [error, setError] = useState(null);
    const [isTweetLoaded, setIsTweetLoaded] = useState(false);
    const [isTrendLoaded, setTrendIsLoaded] = useState(false);
    const [tweets, setTweets] = useState([]);
    const [trends, setTrends] = useState([]);
    
  // Remarque : le tableau vide de dépendances [] indique
  
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, tweets.length - page * rowsPerPage);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    useEffect(() => {
        fetch("http://127.0.0.1:5000/tweets")
            .then(res => res.json())
            .then(
            (result) => {
                setIsTweetLoaded(true);
                setTweets(result);
            },
            // Remarque : il faut gérer les erreurs ici plutôt que dans
            // un bloc catch() afin que nous n’avalions pas les exceptions
            // dues à de véritables bugs dans les composants.
            (error) => {
                setError(error);
            }
            )
        }, [])

    
        
    useEffect(() => {
        fetch("http://127.0.0.1:5000/trends")
            .then(res => res.json())
            .then(
            (result) => {
                setTrendIsLoaded(true);
                setTrends(result);
            },
            // Remarque : il faut gérer les erreurs ici plutôt que dans
            // un bloc catch() afin que nous n’avalions pas les exceptions
            // dues à de véritables bugs dans les composants.
            (error) => {
                setError(error);
            }
            )
        }, [])
    
if (error) {
        return(
            <div>
                <Header p1selected="selected"/>
                <div id="notfound">
                    <div class="notfound">
                        <div class="notfound-404">
                            <h1>Oops!</h1>
                            <h2>Internal server error</h2>
                        </div>
                        <a href="/">Rechager la page</a>
                    </div>
                </div>  
            </div> 
        );
    } else if (!isTrendLoaded || !isTweetLoaded) {
    return( 
        <div>
            <Header p1selected="selected"/>
            <div class="twitter-bird-animation"></div>
            <div class="loading">
            <span class="text">Loading</span>
            <span class="blob1 blob"></span>
            <span class="blob2 blob"></span>
            <span class="blob3 blob"></span>
            </div>

        </div>
        );
    } else {
    return (
    <div>
        <Header p2selected="selected"/>
        <div style={{display:"inline-block",verticalAlign: "top",marginTop:"70px",marginLeft:'180px'}}>
            <TweetBox tweetNumber={Object.keys(tweets).length} />
        </div>
    </div>
          );
        }
      }
