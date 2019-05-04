import PoleList from "./PoleList.jsx";
import {connect} from "react-redux";
import {fetchPoles} from "../../../redux/actions/datapage";
import {getListPoles} from "../../../redux/reducers/datapage";


//Pour recuperer des fonctions de redux (les actions ...)
const mapDispatchToProps = dispatch => {
    return {
        fetchPoles: () => dispatch(fetchPoles())
    }
};

//pour envoyer des objets du store de redux
const mapStateToProps = state => {
    return {
        listPoles: getListPoles(state)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PoleList)