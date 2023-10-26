import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from "../../../../redux/selectors";
import { getSpecificTasks } from '../../../../redux/task-reducer';
import BPopUp from '../../../UtilsComponents/BModal';
import { AiOutlineDelete } from "react-icons/ai";
import NewVariant from './NewVariant';

const SelectionTask = () => {
    const dispatch = useDispatch();

    const specificTasks = useSelector(selectors.specificTasks);

    const [modalSelectionTask, setmodalSelectionTask] = useState(false);
    const [selectedTasks, setSelectedTasks] = useState([]);

    const numberTasks = Array.from({ length: 27 }, (v, i) =>  i + 1); 

    const { 
        register, 
        handleSubmit,
    } = useForm({
            mode: 'onBlur',
        });

    const onSubmitSpecificTask = (task) => {
        dispatch(getSpecificTasks(task.number));
        setmodalSelectionTask(true);
    }

    const addTaskInVariant = (event, task) => { //в диспатч очищать task
        if (event.target.checked) {
            if (!selectedTasks.some(selectedTask => selectedTask._id === task._id)) {
                selectedTasks.push(task);
                console.log(selectedTasks)
            }
        } else{
            let numDeleteTask = selectedTasks.findIndex(selectedTask => selectedTask._id === task._id);
            selectedTasks.splice(numDeleteTask, 1);
            console.log(selectedTasks)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitSpecificTask)}>
                <TitleText>Номер задания</TitleText>
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
                <div><Button type="submit">Выбрать задание</Button></div>
            </form>

            {modalSelectionTask &&
                <BPopUp active={modalSelectionTask} setActive={setmodalSelectionTask}>
                    <Title>Выберите задания</Title>
                    {specificTasks && specificTasks.map((task, index) =>
                        <CheckBoxContainer key={task._id}>
                            <CheckBox type="checkbox" id={`checkbox${index}`} onChange={(event) => {addTaskInVariant(event, task)}}/>
                                <Label htmlFor={`checkbox${index}`}></Label>
                                    <Block>
                                        <Div>
                                            <Header>
                                                <H4>№ {task.number}</H4>
                                            </Header>
                                            <Content>{task.questions}</Content>
                                            {task.photo ? <div style={{textAlign: 'center'}}><img src={task.photo} alt='picture'/></div> : null}
                                            <div>Ответ: {task.answer}</div>
                                        </Div>
                                    </Block>
                                
                        </CheckBoxContainer>
                    )}
                    <ContainerBtn><Button onClick={() => {setmodalSelectionTask(false)}}>Добавить задание</Button></ContainerBtn>
                </BPopUp>
            }

            <NewVariant tasks={selectedTasks} setTasks={setSelectedTasks}/>
        </div>
    )
}

export default SelectionTask;

const TitleText = styled.div`
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

const Title = styled.div`
	text-align: center;
	font-size: 18px;
`

const CheckBoxContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
`

const Label = styled.label`
    display: flex;

    &::before{
        content: '';
        margin-right: 5px;
        border: 1px solid #000000;
        border-radius: 5px;
        height: 14px;
        width: 14px;
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

const Content = styled.div `
    line-height: 1.5;
	margin-bottom: 15px;
`

const CheckBox = styled.input`
    cursor: pointer;
    opacity: 0;
    position: absolute;

    &:checked + ${Label}::before {
        content: "✔";
        font-size: 11px;
        text-align: center;
    }
`

const ContainerBtn = styled.div`
    display: flex;
    justify-content: center;
`