import styled from "styled-components";
import { BsPlusCircle, BsDashCircle } from "react-icons/bs";
import * as selectors from "../../redux/selectors";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { topics, randomTasks } from '../../redux/task-reducer';
import { useNavigate } from 'react-router-dom';

const NumTask = () => {
    const topic = useSelector(selectors.topics);
    const tasks = useSelector(selectors.tasks);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    useEffect(() => {
        dispatch(topics());
    }, [])

    const { 
        register, 
        handleSubmit } = useForm();

    const [value, setValue] = useState([0, 0, 0, 0, 0]);
    
    const plus = (number) => {
        if (value[number - 1] < 5) {
            let newValue = [...value];
            newValue[number - 1] = parseInt(newValue[number - 1]) + 1;
            setValue(newValue);
            console.log(newValue)
        }
    } 

    const minus = (number) => {
        if (value[number - 1] > 0) {
            let newValue = [...value];
            newValue[number - 1] = parseInt(newValue[number - 1]) - 1;
            setValue(newValue);
            console.log(newValue)
        }
    } 

    const onChange = (event, num) => {
        let newState = [...value]
        console.log(newState)
        newState[num - 1] = event.target.value;
        console.log(newState)
        setValue(newState)
    }

    const constructorTask = () => {
		let allTasks = [];
        console.log(tasks);
		for (let num = 1; num < tasks.length; num++) {
			let newTasks = tasks.filter(t => t.number === num);
			for (let i = 1; i <= value[num - 1]; i++) {
				let randTasks = Math.floor(Math.random() * newTasks.length);
				allTasks.push(newTasks[randTasks]);
			}
		}
        console.log(allTasks);
		dispatch(randomTasks(allTasks));

		return allTasks;
	}

    const onSubmit = () => {
        console.log(value)
        constructorTask();
        navigate('/practice/test');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {topic && topic.map(t =>
                <Choice key={t._id}>
                    <Span onClick={() => minus(t.number)}><BsDashCircle style={{color: 'black', fontSize: '20px', verticalAlign: 'middle'}}/></Span>
                    <Number 
                        {...register(`num${t.number}`, {
                            pattern: {
                                /*value: /^\d+$/,*/
                            },
                        })}
                        type="text" 
                        size="2" 
                        value={value[t.number - 1]}
                        onChange={event => onChange(event, t.number)}/>
                    <Span onClick={() => plus(t.number)}><BsPlusCircle style={{color: 'black', fontSize: '20px', verticalAlign: 'middle'}}/></Span>
                    <Test>{t.number}. {t.topic}</Test>
                </Choice>
            )}
            <Button type="submit">Составить вариант</Button>
        </form>
    )
}

export default NumTask;

const Choice = styled.div`
	margin: 10px;
`
const Span = styled.span`
    margin: 0 5px;
	cursor: pointer;

    &:hover{
        opacity: 0.8;
    }
`
const Number = styled.input`
    padding: 5px;
	background-color: rgba(219, 205, 254, 0.6);
	border: none;
	text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
`
const Test = styled.span`
	margin-left: 50px;
	font-size: 15px;
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