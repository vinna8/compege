import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from "../../../redux/selectors";
import { deleteSpecificTask, getSpecificTasks } from '../../../redux/task-reducer';
import { useEffect } from 'react';

const AllTasks = () => {
    const dispatch = useDispatch();
    const specificTasks = useSelector(selectors.specificTasks);
    const messageErrorDelTask = useSelector(selectors.messageErrorDelTask); //модальное окно
    const numberTasks = Array.from({ length: 27 }, (v, i) =>  i + 1); 

    const { 
        register, 
        handleSubmit,
    } = useForm({
            mode: 'onBlur',
        });

    const onSubmit = (task) => {
        dispatch(getSpecificTasks(task.number));
    }

    const deleteTask = (task) => {
        dispatch(deleteSpecificTask(task._id));
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Title>Номер задания</Title>
                <Select
                    {...register('number', {
                            required: 'Это обязательное поле.',
                        })
                    } 
                >
                    <option style={{display: 'none'}}>Выберите номер задания</option>
                    {numberTasks.map((num, index) =>
                        <Option key={index}>{num}</Option>
                    )}
                </Select>
                <div><Button type="submit">Посмотреть задания</Button></div>
            </form>
            
            {specificTasks && specificTasks.map((task) =>
            <Block>
                <Div>
                    <Header>
                        <H4>№ {task.number}</H4>
                        <Span>
                            <AiOutlineDelete onClick={() => {deleteTask(task)}} style={{color: 'black', fontSize: '22px', verticalAlign: 'middle', marginLeft: '5px'}}/>
                        </Span>
                    </Header>
                    <Content>{task.questions}</Content>
                    {task.photo ? <div style={{textAlign: 'center'}}><img src={task.photo} alt='picture'/></div> : null}
                    <div>Ответ: {task.answer}</div>
                </Div>
            </Block>
            )}
        </div>
    )
}

export default AllTasks;

const Title = styled.div`
	margin-top: 20px;
	margin-bottom: 10px;
	font-family: 'Montserrat', sans-serif;
	font-size: 17px;
`

const Select = styled.select`
    padding: 8px;
    border-radius: 25px;
    font-size: 16px;
`

const Option = styled.option`
    font-family: 'Montserrat', sans-serif;
    padding: 8px;
    border-radius: 25px;
    font-size: 16px;
`

const Button = styled.button`
	margin-top: 20px;
	padding: 0px 15px;
    width: auto;
    height: 40px;
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

const Block = styled.div`
	margin-top: 25px;
    margin-bottom: 25px;
	padding: 40px;
	border: 1px solid #000000;
	border-radius: 25px;
	background: #FFFFFF;
	box-sizing: border-box;
`

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Div = styled.div`
	margin-bottom: 35px;
`

const H4 = styled.div`
    font-size: 20px;
    font-family: 'Montserrat', sans-serif;
	margin-bottom: 15px;
`

const Span = styled.span`
    cursor: pointer;

    &:hover{
        opacity: 0.8;
    }
`

const Content = styled.div `
    line-height: 1.5;
	margin-bottom: 15px;
`