import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import * as selectors from "../../redux/selectors";
import { getResults } from '../../redux/task-reducer';
import Preloader from '../../utils/preloader/preloader';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { updateStatistics } from '../../redux/auth-reducer';

const Task = () => {
	const isFetching = useSelector(selectors.isFetching);
	const randomTasks = useSelector(selectors.randomTasks);
	const {login} = useSelector(selectors.user);
	const statistic = useSelector(selectors.statistic);
    const dispatch = useDispatch();
	const navigate = useNavigate(); 
	const isAuth = useSelector(selectors.isAuth);

	const { 
        register, 
        handleSubmit } = useForm();

	const result = (answer) => {
		let enterAnswer = Object.values(answer);
		let results = [];
		let scoreMass = [0, 7, 14, 17, 20, 27];
		let score = 0;
		let prescore;
		console.log(statistic)
		let allCopy = statistic.all.slice();
		let rightCopy = statistic.right.slice();
		let statisticCopy = statistic.statistic.slice();

        randomTasks.map((t, index) => {
			const resultsObj = {};
			resultsObj.num = t.number;
			resultsObj.answers = enterAnswer[index];
			resultsObj.rightAnswers = t.answer;

			if (resultsObj.answers == resultsObj.rightAnswers) {
				prescore = score;
				score = prescore + t.score;

				allCopy[t.number - 1] = allCopy[t.number - 1] + 1;
				rightCopy[t.number - 1] = rightCopy[t.number - 1] + 1;
				statisticCopy[t.number - 1] = Math.round(rightCopy[t.number - 1] / allCopy[t.number - 1] * 100);
				/*console.log(allCopy, rightCopy, statisticCopy)*/
			} else {
				allCopy[t.number - 1] = allCopy[t.number - 1] + 1;
				/*console.log(allCopy, rightCopy, statisticCopy)*/
				if (allCopy[t.number - 1] > 0) 
						statisticCopy[t.number - 1] = Math.round(rightCopy[t.number - 1] / allCopy[t.number - 1] * 100);
			}
			results.push(resultsObj);
		})
		const statisticObj = {};
		statisticObj.all = allCopy;
		statisticObj.right = rightCopy;
		statisticObj.statistic = statisticCopy;

		dispatch(getResults(results, scoreMass[score])); 
		dispatch(updateStatistics(login, statisticObj)); 
		console.log(login, statistic)
    }

	const onSubmit = (answer) => {
		console.log(answer)
		result(answer);
		navigate('/practice/test/check');
    }



    return (
		<div>
			{isFetching ? <Preloader /> :
				<form onSubmit={handleSubmit(onSubmit)}>
					<Block>
						{randomTasks.map((t,index) => 
							<Div key={t._id}>
								<H4>№ {t.number}</H4>
								<Content>{t.questions}</Content>
								{t.photo ? <div style={{textAlign: 'center'}}><img src={t.photo} alt=''/></div>: null}
								<Answer
									{...register(`answer${index + 1}`)}
									type="text" 
									placeholder="Ответ"/>
							</Div>
						)}
					</Block>
					<ContainerBtn><Button type="submit">Закончить попытку</Button></ContainerBtn>
				</form>	
			}
		</div>
    )
}

export default Task;

const Block = styled.div`
	margin-top: 25px;
    margin-bottom: 25px;
	padding: 40px;
	border: 1px solid #000000;
	border-radius: 25px;
	background: #FFFFFF;
	box-sizing: border-box;
`

const Div = styled.div`
	margin-bottom: 35px;
`

const H4 = styled.div`
    font-size: 25px;
    font-family: 'Montserrat', sans-serif;
	margin-bottom: 15px;
`

const Content = styled.div `
    line-height: 1.5;
	margin-bottom: 15px;
`

const Answer = styled.input`
	margin-top: 15px;
	padding: 5px;
	padding-left: 10px;
	border: 1px solid #BCBCBC;
	border-radius: 25px;
    font-size: 15px;
    font-family: 'Montserrat', sans-serif;
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