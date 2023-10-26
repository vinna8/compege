import styled from 'styled-components';
import * as selectors from "../../redux/selectors";
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Answers = () => {
	const isAuth = useSelector(selectors.isAuth);
    const results = useSelector(selectors.results);
    const score = useSelector(selectors.score);

	if (!isAuth) {
        return <Navigate to="/login"/> 
    }

    return (
			<div>
				<H1>Результаты</H1>
                <H2>Вы набрали {score} из 100 баллов</H2>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <Th>Номер задания</Th>
                                <Th>Введенный ответ</Th>
                                <Th>Правильный ответ</Th>
                            </tr>
                        </thead>
                        {results && results.map((a, index) =>
                            <tbody key={index}>
                                <tr>
                                    <Td>{a.num}</Td>
                                    <Td>{a.answers}</Td>
                                    <Td>{a.rightAnswers}</Td>
                                </tr>
                            </tbody>
                        )}
                    </Table>
                </div>
			</div>
    )
}

export default Answers;

const H1 = styled.div`
	margin-top: 20px;
	margin-bottom: 30px;
	text-align: center;
	font-family: 'Montserrat', sans-serif;
	font-size: 30px;
`

const H2 = styled.div`
	margin-top: 20px;
	margin-bottom: 30px;
	text-align: center;
	font-family: 'Montserrat', sans-serif;
	font-size: 20px;
`

const Table = styled.table`
    margin: auto;
    width: 100%;
    border-radius: 25px;
    background: #FFFFFF;
    text-align: center;
    border-collapse: collapse;
    overflow: hidden;
`

const Th = styled.th`
    padding: 15px;
    background: rgba(219, 205, 254, 0.6);
`

const Td = styled.td`
    padding: 10px;
`
