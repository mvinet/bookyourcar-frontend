import NewLocation from './NewLocation.jsx'
import {connect} from "react-redux";
import {fetchNewLocation} from "../../../redux/actions/location";
import {setMessage, setNoMessageFor} from "../../../redux/actions/message";


//Pour recuperer des fonctions de redux (les actions ...)
const mapDispatchToProps = (dispatch) => {
    return {
        fetchNewLocation: (input, callback) => dispatch(fetchNewLocation(input, callback)),
        setMessage: message => dispatch(setMessage(message)),
        setNoMessageFor: attribut => dispatch(setNoMessageFor(attribut))
    }
};

//pour envoyer des objets du store de redux
const mapStateToProps = () => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(NewLocation)
