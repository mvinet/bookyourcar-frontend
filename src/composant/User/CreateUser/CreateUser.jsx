import React, {useEffect, useState} from 'react';
import * as PropTypes from 'prop-types';
import {Link} from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {HowToRegOutlined as HowToRegOutlinedIcon} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import InputText from "../../Commun/Input/InputText";
import {Redirect} from "react-router";
import InputSelect from "../../Commun/Input/InputSelect";
import {getBreakingLimit} from "../../../utils/cssUtils";

const CreateUser = props => {

    const {classes, registerUser, token, fetchPoles, poles, setMessage} = props;

    useEffect(() => {
        fetchPoles()
    }, [fetchPoles]);

    const [input, setInput] = useState({
        email: "",
        confirmPassword: "",
        password: "",
        nom: "",
        prenom: "",
        poleId: 0,
        phoneNumber: ""
    });
    const [accountSuccess, setAccountSuccess] = useState(false);

    /**
     * @Input event: données de l'input
     */
    const updateInput = event => {
        setInput({
            ...input,
            [event.target.id]: event.target.value
        })
    };

    /**
     *
     * @param event donnée du select
     */
    const updateSelect = event => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    };

    const fetchCreateUser = event => {
        event.preventDefault();
        registerUser(input, () => {
            setMessage({"Success" : ["Votre compte a bien été créé, veuillez maintenant valider votre email pour que l'administrateur puisse valider votre compte"]});
            setAccountSuccess(true);
        })
    };

    if (token || accountSuccess) {
        return <Redirect to={"/"}/>
    }

    return (
        <div className={classes.main}>
            <CssBaseline/>
            <form className={classes.form} onSubmit={fetchCreateUser}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <HowToRegOutlinedIcon/>
                    </Avatar>
                    <Typography component={"h1"} variant={"h5"}>
                        Inscription
                    </Typography>
                    <div className={classes.formInput}>
                        <InputText
                            name={"Prenom"}
                            id={"prenom"}
                            label={"Prénom"}
                            required
                            type={"text"}
                            onChange={updateInput}
                            value={input.prenom}
                        />
                        <InputText
                            id={"nom"}
                            name={"Nom"}
                            label={"Nom"}
                            type={"text"}
                            onChange={updateInput}
                            value={input.name}
                            required
                        />
                        <InputText
                            id={"phoneNumber"}
                            name={"PhoneNumber"}
                            label={"Numéro de téléphone"}
                            type={"text"}
                            onChange={updateInput}
                            value={input.phoneNumber}
                            required
                        />
                        <InputSelect
                            id={"poleId"}
                            name={"poleId"}
                            onChange={updateSelect}
                            label={"Pole"}
                            data={poles}
                            value={input.poleId}
                        />
                        <InputText
                            id={"email"}
                            name={"Email"}
                            label={"Email"}
                            type={"email"}
                            required
                            onChange={updateInput}
                            value={input.email}
                        />
                        <InputText
                            id={"password"}
                            name={"Password"}
                            label={"Mot de passe"}
                            type={"password"}
                            required
                            onChange={updateInput}
                            value={input.password}
                        />
                        <InputText
                            id={"confirmPassword"}
                            name={"ConfirmPassword"}
                            label={"Confirmation du mot de passe"}
                            type={"password"}
                            onChange={updateInput}
                            value={input.confirmPassword}
                        />
                        <Typography>
                            <Link className={classes.link} to={"/login"}>
                                Déjà un compte ?
                            </Link>
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Créer un compte
                        </Button>
                    </div>
                </Paper>
            </form>
        </div>
    )
};

CreateUser.propTypes = {
    //set a message
    setMessage: PropTypes.func,

    //classe css du composant
    classes: PropTypes.object,

    //token de l'utilisateur en cours
    token: PropTypes.string,

    //fonction qui permet d'enregistrer un nouveau utilisateur
    registerUser: PropTypes.func,

    //Lise de poles
    poles: PropTypes.array,

    //fonction qui permet de récuperer les poles
    fetchPoles: PropTypes.func
};

export default withStyles(theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(getBreakingLimit(theme))]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        [theme.breakpoints.down(getBreakingLimit(theme))] : {
            margin: 0,
            height: '100%'
        }
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        [theme.breakpoints.down(getBreakingLimit(theme))]: {
            height: '600',
            margin: 0
        }
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        [theme.breakpoints.down(getBreakingLimit(theme))]: {
            height: '100%'
        }
    },
    formInput: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    link: {
        float: 'right',
        marginTop: theme.spacing.unit * 2
    }
}))(CreateUser);