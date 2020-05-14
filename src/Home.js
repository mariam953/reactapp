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
import Header from './Header';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './css/loading.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import NotFound from './NotFound'


const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }));

const StyledTableCell = withStyles((theme) => ({
head: {
    backgroundColor: theme.palette.warning.dark,//palette.common.black,
    color: theme.palette.common.white,
},
body: {
    fontSize: 14,
},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);


function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
    <div className={classes.root}>
        <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="first page"
        >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
        >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
    </div>
    );
}


TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

const useStyles2 = makeStyles({
table: {
    minWidth: 500,
},
});
//highcharts js
var today = new Date();
var t = new Date( today.getTime() );
//var formatted = t.format("dd.mm.yyyy hh:MM:ss");

var options = {
    chart: {
        type: 'column'
    },
    title: {
      text: '<b>USA</b> Trending topic for '+t.toISOString().replace('T',' ').replace('Z','')
    },
    /*subtitle: {
        text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
    },*/
    accessibility: {
        announceNewData: {
            enabled: true
        }
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Nomber de tweets par topic'
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y}'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{point.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> tweets<br/>'
    },

    series: [
        {
            name: "Browsers",
            colorByPoint: true,
            data: [
                
            ]
        }
    ]
  };

export default function CustomPaginationActionsTable() {
    const [error, setError] = useState(null);
    const [isTweetLoaded, setIsTweetLoaded] = useState(false);
    const [isTrendLoaded, setTrendIsLoaded] = useState(false);
    const [tweets, setTweets] = useState([]);
    const [trends, setTrends] = useState([]);
    const options2= {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: []
        }]
        }
        
            
  // Remarque : le tableau vide de dépendances [] indique
  
    const classes = useStyles2();
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
                    <NotFound/>
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

        var highchartdata = trends.map((row) => {
            return {name:row.name,y:parseInt(row.tweet_volume)}
        });

        var arrayLength = tweets.length;

        var piechartdata = [
            {
                name: 'Positive',
                color:'#ff9800',
                y: 0,
                sliced: true,
            }, {
                name: 'Negative',
                color:'#e51c23',
                y: 0,
                sliced: true,
            }, {
                name: 'Neutral',
                color:'#2196f3',
                y: 0,
                sliced: true,
            }
        ];

        for (var i = 0; i < arrayLength; i++) {
            var sentiment =  parseFloat(tweets[i]['sentiment'][0]);
            switch(true) {
                case (sentiment>0):
                  // code block
                  piechartdata[0].y = piechartdata[0].y +1;
                  //console.log("positive");
                  break;
                case (sentiment<0):
                  // code block
                  piechartdata[1].y++;
                  //console.log("negative");
                  break;
                default:
                    piechartdata[2].y++;
                    //console.log("neutral");

              }
            //Do something
        }

        var total = parseFloat(piechartdata[0].y+piechartdata[1].y+piechartdata[2].y);

        /*for (i = 0; i < 3; i++) {
            piechartdata[i].y=piechartdata[i].y*100/total;
            console.log(typeof(parseFloat(piechartdata[i].y)*100/total))
        }*/

        //console.log(dd);*100/c
        options.series[0].data = highchartdata;
        options2.series[0].data = piechartdata;
        options2.title.text = 'Sentimen Analysis for top trending topic <b>'+trends[0].name+'</b>';

    
    return (
    <div>
        <Header p1selected="selected"/>
        <div style={{display:"inline-block",verticalAlign: "top",marginTop:"70px",marginLeft:'180px'}}>
            <div style={{ width:"700px", display:"inline-block",verticalAlign: "top"}}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                    
                />
            </div>
            <div style={{ marginLeft:'120px',width:"600px",display:"inline-block",verticalAlign: "top"}}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options2}
                    
                />
            </div>
        
        </div>
        <div className="alert alert-warning" role="alert" style={{width:"1500px",lineHeight:"50px",margin:"auto",marginTop:"50px",fontSize:"20px"}}>
            Analyzed tweets for <b>{trends[0].name}</b>
        </div>
        
        <div style={{ width:"83%",textAlign:"center", marginLeft: "auto",marginRight: "auto",marginTop:"50px" }}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Tweet</StyledTableCell>
                        <StyledTableCell align="left">Sentiment</StyledTableCell>
                        <StyledTableCell align="left">Score</StyledTableCell>
                        <StyledTableCell align="left">Username </StyledTableCell>
                        <StyledTableCell align="left">Likes</StyledTableCell>
                        <StyledTableCell align="left">Retweets</StyledTableCell>
                        <StyledTableCell align="left">Posted At</StyledTableCell>
                        <StyledTableCell align="left">Tweet Link</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                    ? tweets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : tweets
                    ).map((row) => (
                    <StyledTableRow key={row.username}>
                        <StyledTableCell component="th" scope="row" style={{ width: '260px' }} >
                        {row.text}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                            {
                                row.sentiment[0]>0 && <span className="badge badge-pill badge-warning">Positive</span>
                            }
                            {
                                row.sentiment[0]<0 && <span className="badge badge-pill badge-danger">Negative</span>
                            }
                            {
                                parseFloat(row.sentiment[0])===0 && <span className="badge badge-pill badge-primary">Neutral</span>
                            }
                        </StyledTableCell>
                        <StyledTableCell style={{ width: 160 }} align="left">
                            {
                                row.sentiment[0]>0 && <span className="badge badge-pill badge-warning">{row.sentiment[0]}</span>
                            }
                            {
                                row.sentiment[0]<0 && <span className="badge badge-pill badge-danger">{row.sentiment[0]}</span>
                            }
                            {
                                parseFloat(row.sentiment[0])===0 && <span className="badge badge-pill badge-primary">{row.sentiment[0]}</span>
                            }
                        </StyledTableCell>
                        <StyledTableCell style={{ width: 160 }} align="left">
                        {row.username}
                        </StyledTableCell>
                        <StyledTableCell style={{ width: 160 }} align="left">
                        {row.likes}
                        </StyledTableCell>
                        <StyledTableCell style={{ width: 160 }} align="left">
                        {row.retweets}
                        </StyledTableCell>
                        <StyledTableCell style={{ width: 160 }} align="left">
                        {new Date(row.timestamp).toISOString()}
                        </StyledTableCell>
                        <StyledTableCell style={{ width: 160 }} align="left">
                        <a href={"https://www.twitter.com"+row.tweet_url} rel="noopener noreferrer" target="_blank"><button type="button" class="btn btn-link">Link</button></a>
                        </StyledTableCell>
                        
                    </StyledTableRow>
                    ))}
        
                    {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                        <StyledTableCell colSpan={6} />
                    </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={3}
                        count={tweets.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
                    </TableRow>
                </TableFooter>
                </Table>
            </TableContainer>
        </div>
    </div>
          );
        }
      }
