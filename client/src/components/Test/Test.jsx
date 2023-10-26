import styled from 'styled-components';
import { BsClock } from "react-icons/bs";
import Task from './Task';
import * as selectors from "../../redux/selectors";
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import Timer from '../../utils/timer/timer';

const Test = () => {
	const isAuth = useSelector(selectors.isAuth);

	if (!isAuth) {
        return <Navigate to="/login"/> 
    }

    return (
        <Container>
			<CompEge>
				{/*<Link to='/practice/test/compege'><Button>Тренажёр КЕГЭ</Button></Link>*/}
			</CompEge>
			<BlockTime>
                <BsClock style={{color: 'black', fontSize: '20px', verticalAlign: 'middle', marginRight: '5px'}}/>
				<Timer hours={3} minutes={55} seconds={10} />
			</BlockTime>
				
			<Wrapper>
				<Task />
			</Wrapper>
		</Container>

    )
}

export default Test;

const Container = styled.div`
	padding-bottom: 10px;
`

const CompEge = styled.div`
	margin-top: 25px;
`

/*const Button = styled.button`
	margin-top: 20px;
	padding: 0px 15px;
    width: auto;
    height: 45px;
    background: rgba(219, 205, 254, 0.6);
    border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 25px;
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    cursor: pointer;

	&:hover{
		opacity: 0.8;
	}
`*/

const BlockTime = styled.div`
	margin-left: auto;
	background: #FFFFFF;
	border: 1px solid #000000;
	border-radius: 25px;
	padding-top: 15px;
	width: 170px;
	height: 40px;
    text-align: center;
	font-size: 20px;
    font-family: 'Montserrat', sans-serif;
`

const Wrapper = styled.div`
	margin-top: 25px;
	margin-bottom: 50px;
	padding: 40px;
	border: 1px solid #000000;
	border-radius: 25px;
`