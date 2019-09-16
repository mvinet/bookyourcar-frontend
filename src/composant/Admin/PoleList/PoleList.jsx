import React, {useEffect, useState} from 'react';
import * as PropTypes from 'prop-types';
import PoleListItem from "./PoleListItem";
import withStyles from '@material-ui/core/styles/withStyles';
import UpdatePole from "../Pole/UpdatePole.jsx"

const PoleList = props => {

    const {classes, fetchPoles, listPoles, fetchPoleInfos} = props;


    const [currentPole, setCurrentPole] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [dataCurrentPole, setDataCurrentPole] = useState(null);

    useEffect(() => {
        fetchPoles();

        if (currentPole != null && openPopup) {
            fetchPoleInfos(currentPole, success => {
                setOpenPopup(true);
                setDataCurrentPole(success);
            })
        }
    }, [fetchPoles, fetchPoleInfos, openPopup, setDataCurrentPole, currentPole]);

    return (
        <React.Fragment>
            {listPoles && listPoles.map(item =>
                <PoleListItem
                    key={item.poleId} data={item}
                />
            )}

            <UpdatePole
                open={openPopup}
                onClose={() => setOpenPopup(false)}
                data={dataCurrentPole}
            />
        </React.Fragment>


    )
};


/* return (
     <div className={classes.main}>
         <CssBaseline />
         <Paper className={classes.paper}>
             <Typography variant="h4" gutterBottom>Liste des Poles</Typography>
             <Link to={`/poleCreate`} className={classes.link}>
                 <Button variant="contained"
                     color="primary"
                     className={classes.button}>
                     Nouveau Pole
                             </Button>
             </Link>
             <Table className={classes.table}>
                 <TableHead>
                     <TableRow>
                         <TableCell>Nom</TableCell>
                         <TableCell>Adresse</TableCell>
                         <TableCell>CodePostal</TableCell>
                         <TableCell>Ville</TableCell>
                         <TableCell></TableCell>
                         <TableCell></TableCell>
                     </TableRow>
                 </TableHead>
                 <TableBody>
                     {listPoles && listPoles.map((row, i) =>
                         <TableRow key={i}>
                             <TableCell>{row.poleName}</TableCell>
                             <TableCell>{row.poleAddress}</TableCell>
                             <TableCell>{row.poleCp}</TableCell>
                             <TableCell>{row.poleCity}</TableCell>
                             <TableCell>
                                 <Link to={`/poleInfos/${row.poleId}`} className={classes.link}>
                                     <IconButton>
                                         <Icon>pageview</Icon>
                                     </IconButton>
                                 </Link>
                             </TableCell>
                             <TableCell>
                                 <IconButton onClick={() => deletePole(row.poleId)}>
                                         <DeleteIcon />
                                 </IconButton>
                             </TableCell>
                         </TableRow>
                     )}
                 </TableBody>
             </Table>

         </Paper>
     </div>
 )
};*/

PoleList.propTypes = {
    classes: PropTypes.object,
    fetchPoles: PropTypes.func,
    listPoles: PropTypes.array,
    fetchDeletePole: PropTypes.func
};

export default withStyles(theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 'auto',
            marginLeft: '10%',
            marginRight: '10%',
        }
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: '100%',
            padding: 0
        }
    },


    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    button: {
        marginRight: theme.spacing.unit * 3,
    },
    link: {
        textDecoration: 'none',
        alignSelf: 'flex-end',
    },
}))(PoleList);
