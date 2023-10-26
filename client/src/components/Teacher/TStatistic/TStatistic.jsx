import styled from 'styled-components';
import { useSelector } from "react-redux";
import Preloader from '../../../utils/preloader/preloader';
import * as selectors from "../../../redux/selectors";
import TBarChart from './TBarChart';

const TStatistic = () => {
    const statisticStudent = useSelector(selectors.statisticStudent);
    const isFetching = useSelector(selectors.isFetching);

    return (
        <>
            {isFetching ? <Preloader /> : 
                <Container>
                    <H1>Статистика</H1>
                    <H1>{statisticStudent.student}</H1>
                    <div>
                        <Table>
                            <thead>
                                <HeadTable>
                                    <Th></Th>
                                    {statisticStudent && statisticStudent.all.map((a, index) => 
                                        <Th key={index}>{index + 1}</Th>
                                    )}
                                </HeadTable>
                            </thead>
                            <tbody>
                                <tr>
                                    <HeadRow>Всего решено</HeadRow>
                                    {statisticStudent && statisticStudent.all.map((s, index) =>
                                        <Td key={index}>{s}</Td>
                                    )}
                                </tr>
                                
                                <tr>
                                    <HeadRow>Решено верно</HeadRow>
                                    {statisticStudent && statisticStudent.right.map((r, index) =>
                                        <Td key={index}>{r}</Td>
                                    )}
                                </tr>
                                <tr>
                                    <HeadRow>Статистика</HeadRow>
                                    {statisticStudent && statisticStudent.statistic.map((s, index) =>
                                        <Td key={index}>{s}%</Td>
                                    )}
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <Chart>
                        <TBarChart />
                    </Chart>
                </Container>
            }
        </>
    )
}

export default TStatistic;

const Container = styled.div`
	padding-bottom: 10px;
`

const H1 = styled.div`
	margin-top: 20px;
	margin-bottom: 30px;
	text-align: center;
	font-family: 'Montserrat', sans-serif;
	font-size: 40px;
`

const Table = styled.table`
    margin: auto;
    border-collapse: collapse;
    overflow: hidden;
    margin-bottom: 0;
    font-size: 13px;
    background: #FFFFFF;
    border: 1px solid #000000;
    border-radius: 25px;
    text-align: center;
`

const Th = styled.th`
    padding: 8px;
`

const HeadTable = styled.tr`
    background: rgba(219, 205, 254, 0.6);
`

const Td = styled.td`
    padding: 8px;
`

const HeadRow = styled.th`
    padding: 5px;
    background: rgba(219, 205, 254, 0.6);
`

const Chart = styled.div`
    margin-top: 25px;
`