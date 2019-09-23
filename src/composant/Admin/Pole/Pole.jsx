import React, {useEffect, useState} from 'react';
import * as PropTypes from 'prop-types';
import Table from "../../Commun/Table/Table";
import ConsultationModification, {VIEW} from '../Action/ConsultationModification';

import columns from './columns';
import Supprimer from "../Action/Supprimer";
import InputText from "../../Commun/Input/InputText";

const Pole = props => {

    const {fetchPoles, fetchPole, poleList, poleDetail, fetchNewPole, fetchDeletePole, fetchUpdatePole} = props;
    const [consultationModification, setConsultationModification] = useState({visible: false, state: VIEW});
    const [supressionPole, setSupressionPole] = useState(false);
    const [data, setData] = useState(poleDetail || {});
    const [deletedData, setDeletedData] = useState(undefined);

    useEffect(() => {
        fetchPoles();
    }, [fetchPoles]);

    const acceptPole = () => {
        fetchNewPole(data, success => {
            if (success) {
                //si la requête est un succes, on ferme la fenetre
                setConsultationModification({visible: false})
            }
        })
    };

    const modificationPole = () => {
        fetchUpdatePole(data.poleId, data);
        setConsultationModification({visible: false})
    };

    const supprimerPole = () => {
        deletedData.forEach(pole => {
            fetchDeletePole(pole.poleId);
        });
        setSupressionPole(false);
    };

    const openConsultationModification = row => {
        fetchPole(row.poleId, data => {
            setData(data)
        });
        setConsultationModification({visible: true, state: VIEW});
    };

    const updateField = ((event, type) => {
        setData({
            ...data,
            [type]: event.target.value
        });
    });

    return (
        <React.Fragment>
            <Table
                title={"Gestion des pôles"}
                columns={columns}
                data={poleList}
                onClick={openConsultationModification}
                onDelete={data => {
                    setDeletedData(data);
                    setSupressionPole(true)
                }}
                onAdd={() => {
                    setData({});
                    setConsultationModification({visible: true, state: 'new'})
                }}
            />

            <ConsultationModification
                title={"Pôle"}
                open={consultationModification.visible}
                state={consultationModification.state}
                onClose={() => {
                    setConsultationModification({visible: false});
                    setData({});
                }}
                data={data}
                onAccept={acceptPole}
                onUpdate={() => modificationPole()}
                onChangeState={state => setConsultationModification({...consultationModification, state: state})}
            >
                <InputText
                    id="poleName"
                    name={"PoleName"}
                    label="Nom"
                    value={data.poleName || ""}
                    disabled={consultationModification.state === VIEW}
                    onChange={(event => updateField(event, "poleName"))}
                />
                <InputText
                    id={"poleCity"}
                    name={"PoleCity"}
                    label={"Ville"}
                    value={data.poleCity || ""}
                    disabled={consultationModification.state === VIEW}
                    onChange={event => updateField(event, "poleCity")}
                />
                <InputText
                    id={"poleAddress"}
                    name={"PoleAddress"}
                    label={"Adresse"}
                    value={data.poleAddress || ""}
                    disabled={consultationModification.state === VIEW}
                    onChange={event => updateField(event, "poleAddress")}
                />
                <InputText
                    id={"poleCp"}
                    name={"PoleCp"}
                    label={"Code Postal"}
                    type={"number"}
                    value={data.poleCp || ""}
                    disabled={consultationModification.state === VIEW}
                    onChange={event => updateField(event, "poleCp")}
                />

            </ConsultationModification>

            <Supprimer
                title={"Suppression Pole"}
                open={supressionPole}
                onClose={() => setSupressionPole(undefined)}
                onAccept={supprimerPole}
                text={"êtes vous sur de vouloir supprimer le(s) pôle(s) sélectionné(s) ?"}
            />

        </React.Fragment>
    )
};

Pole.propTypes = {
    fetchPoles: PropTypes.func,
    fetchPole: PropTypes.func,
    poleList: PropTypes.array,
    poleDetail: PropTypes.object,
    fetchNewPole: PropTypes.func,
    fetchDeletePole: PropTypes.func,
    fetchUpdatePole: PropTypes.func
};

export default Pole;