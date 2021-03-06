import PasswordForgot from "./PasswordForgot.jsx";
import {connect} from "react-redux";
import {fetchForgotPassword} from "../../../redux/actions/auth";
import {getToken} from "../../../redux/reducers/auth";
import {setMessage} from "../../../redux/actions/message";


//Pour recuperer des fonctions de redux (les actions ...)
const mapDispatchToProps = (dispatch) => {
    return {
        forgotPassword: (input, success) => dispatch(fetchForgotPassword(input, success)),
        setMessage: (message) => dispatch(setMessage(message))
    }
};

//pour envoyer des objets du store de redux
const mapStateToProps = (state) => {
    return {
        token: getToken(state)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordForgot)