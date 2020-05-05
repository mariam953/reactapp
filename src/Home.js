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

export default function CustomPaginationActionsTable() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  // Remarque : le tableau vide de dépendances [] indique
  
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);
  
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
                setIsLoaded(true);
                setItems(result);
            },
            // Remarque : il faut gérer les erreurs ici plutôt que dans
            // un bloc catch() afin que nous n’avalions pas les exceptions
            // dues à de véritables bugs dans les composants.
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
            )
        }, [])
    
if (error) {
    return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
    return <div>Chargement...</div>;
    } else {
    return (
    <div>
        <Header p1selected="selected"/>
        <TweetBox tweetNumber={Object.keys(items).length} />
        <div style={{ width:"80%",textAlign:"center", marginLeft: "auto",marginRight: "auto",marginTop:"100px" }}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Tweet</StyledTableCell>
                        <StyledTableCell align="left">username </StyledTableCell>
                        <StyledTableCell align="left">likes</StyledTableCell>
                        <StyledTableCell align="left">retweets</StyledTableCell>
                        <StyledTableCell align="left">timestamp</StyledTableCell>
                        <StyledTableCell align="left">tweet_url</StyledTableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                    ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : items
                    ).map((row) => (
                    <StyledTableRow key={row.username}>
                        <StyledTableCell component="th" scope="row">
                        {row.text}
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
                        <a href={"https://www.twitter.com"+row.tweet_url} rel="noopener noreferrer" target="_blank">https://www.twitter.com/{row.tweet_url}</a>
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
                        count={items.length}
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
