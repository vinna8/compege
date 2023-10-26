import styled from 'styled-components';
import * as selectors from "../../../redux/selectors";
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ComputerEge = () => {
    const isAuth = useSelector(selectors.isAuth);

	if (!isAuth) {
        return <Navigate to="/login"/> 
    }

    return (
        <div>ura</div>
    )
}

export default ComputerEge;