import React , {useContext} from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
    const alertContect = useContext(AlertContext);
    const {alert} = alertContect;

        return (
        alert != null && (
            <div className={`alert alert-light`}>
                <i className="fa fa-info-circle">{alert.msg}</i>
            </div>
        )
        );
};

export default Alert;
