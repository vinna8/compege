import styled from 'styled-components';
import File from './File';
import { BsFileEarmarkZip } from "react-icons/bs";
import * as selectors from "../../redux/selectors";
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AiOutlineFileAdd } from "react-icons/ai";

const Theory = () => {
	const isAuth = useSelector(selectors.isAuth);

	if (!isAuth) {
        return <Navigate to="/login"/> 
    }

    return (
        <div>
			<H1>Теория</H1>
			<Block>
				<File/>
				<ContainerBtn>
					<Button>Скачать все
						<BsFileEarmarkZip style={{color: 'black', fontSize: '18px', verticalAlign: 'middle', marginLeft: '5px'}}/>
					</Button>
				</ContainerBtn>
			</Block>
		</div>
    )
}

export default Theory;

const H1 = styled.div`
	margin-top: 20px;
	margin-bottom: 30px;
	text-align: center;
	font-family: 'Montserrat', sans-serif;
	font-size: 40px;
`

const Block = styled.div`
	margin-bottom: 25px;
	background: #FFFFFF;
	border: 1px solid #000000;
	box-sizing: border-box;
	border-radius: 25px;
	padding: 25px;
`

const Button = styled.button`
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
`

const ContainerBtn = styled.div`
    display: flex;
    justify-content: center;
`