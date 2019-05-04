import React, {useEffect} from 'react';
import * as PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {
    CssBaseline,
    Icon,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";

const PoleInfos = props => {

    const {classes, fetchPolesInfoq, datapage} = props;
    useEffect(() => {
        fetchPolesInfos();
    }, []);

    return (
        <div className={classes.main}>
            <CssBaseline/>
            <Paper className={classes.paper}>
                <Typography variant="h4" gutterBottom>Liste des Poles</Typography>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nom</TableCell>
                            <TableCell>Adresse</TableCell>
                            <TableCell>CodePostal</TableCell>
                            <TableCell>Ville</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datapage && datapage.map((row, i) =>
                            <TableRow key={i}>
                                <TableCell>{row.poleName}</TableCell>
                                <TableCell>{row.poleAddress}</TableCell>
                                <TableCell>{row.poleCp}</TableCell>
                                <TableCell>{row.poleCity}</TableCell>
                                <TableCell><IconButton onClick={() => navigateToPoleInfos(row.poleId)}>
                                    <Icon>pageview</Icon>
                                </IconButton>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    )
};

PoleList.propTypes = {
    classes: PropTypes.object,
    fetchVehicles: PropTypes.func,
    datapage: PropTypes.array
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
    }
}))(PoleInfos);