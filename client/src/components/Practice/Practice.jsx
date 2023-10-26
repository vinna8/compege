import styled from 'styled-components';
import NumTask from './NumTask';
import * as selectors from "../../redux/selectors";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { randomTasks, getAllTasks } from '../../redux/task-reducer';
import { useEffect } from 'react';

const Practice = () => {
	const isAuth = useSelector(selectors.isAuth);
	const tasks = useSelector(selectors.tasks);
	const statistic = useSelector(selectors.statistic);
	const user = useSelector(selectors.user);
	const dispatch = useDispatch();

	useEffect(() => {
        dispatch(getAllTasks());
    }, [])

	if (!isAuth) {
        return <Navigate to="/login"/> 
    }

	const randomTasksMass = () => {
		let allTasks = [];
		/*console.log(tasks);*/
		for (let num = 1; num < tasks.length; num++) {
			let newTasks = tasks.filter(t => t.number === num);
			let randTasks = Math.floor(Math.random() * newTasks.length);
			allTasks.push(newTasks[randTasks]);
		}
		console.log(allTasks);
		dispatch(randomTasks(allTasks));

		return allTasks;
	}

	const statisticTasksMass = () => {
		let allTasks = [];
		/*console.log(tasks);*/
		for (let num = 1; num < tasks.length; num++) {
			if (statistic.statistic[num - 1] <= 50) {
				let newTasks = tasks.filter(t => t.number === num);
				let randTasks = Math.floor(Math.random() * newTasks.length);
				allTasks.push(newTasks[randTasks]);
			}
			if (statistic.statistic[num - 1] <= 30) {
				let newTasks = tasks.filter(t => t.number === num);
				let randTasks = Math.floor(Math.random() * newTasks.length);
				allTasks.push(newTasks[randTasks]);
			} /*может быть понадобится сделать функцию, чтоб не выводились одинаковые задания*/
		}
		console.log(allTasks);
		dispatch(randomTasks(allTasks));

		return allTasks;
	}

	const homeWorkTasksMass = (tasksInVariant) => {
		/*console.log(tasks);*/
		dispatch(randomTasks(tasksInVariant));
	}

    return (
        <Container>
			<H1>Практика</H1>
			<Block>
				<H4>Сгенерировать полный вариант</H4>
				<div>Система составит полный вариант из случайных заданий и по окончании работы проверит ваши ответы.</div>
				<Link to='/practice/test'><Button onClick={() => {randomTasksMass()}}>Составить вариант</Button></Link>
			</Block>
				
			<Block>
				<H4>Конструктор заданий по типам и темам</H4>
				<div>Вы можете сами составить вариант из необходимого количества заданий по конкретным разделам, чтобы тренироваться по определённым темам.</div>
				<NumTask />
			</Block>
				
			<Block>
				<H4>Ваш персональный вариант</H4>
				<div>Система сформирует вам индивидуальный вариант в зависимости от накопленной статистики, ранее решённых, нерешённых и вызвавших затруднение заданий.</div>
				<Link to='/practice/test'><Button onClick={() => {statisticTasksMass()}}>Составить вариант</Button></Link>
			</Block>
			<Block>
				<H4>Домашнее задание</H4>
				<div>Преподаватель составит вариант и отправит на решение вам.</div>
				{user.assignments.length > 0
					? 
					user.assignments.map(v => 
						<Variant key={v._id}>
							<div>Название варианта: {v.variant.title}</div>
							<div>Количество заданий: {v.variant.tasks.length}</div>
							<ContainerBtn><Link to='/practice/test'><Button onClick={() => {homeWorkTasksMass(v.variant.tasks)}}>Начать</Button></Link></ContainerBtn>
						</Variant>
					)
					: <NoVariants>Варианты для решения отсутствуют.</NoVariants>
				}
			</Block>
		</Container>
    )
}

export default Practice;

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

const H4 = styled.div`
	margin-bottom: 10px;
	font-family: 'Montserrat', sans-serif;
	font-size: 25px;
	letter-spacing: 0.005em;
`

const Block = styled.div`
	margin-bottom: 25px;
	background: #FFFFFF;
	border: 1px solid #000000;
	box-sizing: border-box;
	border-radius: 25px;
	padding: 25px;
`

const ContainerBtn = styled.div`
    display: flex;
    justify-content: center;
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

const Variant = styled.div`
	display: inline-block;
    margin: 25px 35px 20px 5px;
	width: 315px;
	background: #FFFFFF;
	border: 1px solid #000000;
	box-sizing: border-box;
	border-radius: 25px;
	padding: 25px;
`

const NoVariants = styled.div`
	margin-top: 15px;
`