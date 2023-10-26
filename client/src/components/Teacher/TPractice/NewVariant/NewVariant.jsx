import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from "../../../../redux/selectors";
import { AiOutlineDelete } from "react-icons/ai";
import { addNewVariant } from '../../../../redux/task-reducer';

const NewVariant = ({tasks, setTasks}) => {
    const dispatch = useDispatch();
    const user = useSelector(selectors.user);

    const { 
        register, 
        handleSubmit,
        reset
    } = useForm({
            mode: 'onBlur',
        });

    const onSubmitAddVariant = (variant) => {
        variant.tasks = tasks;
        variant.teacher = user.userId;
        dispatch(addNewVariant(variant));
        setTasks([]);
        reset();
    }

    const deleteTask = (task) => {
        let numDeleteTask = tasks.indexOf(task);
        tasks.splice(numDeleteTask, 1);
        setTasks([...tasks]);
    }

    return (
        <div>
            {tasks.length != 0 && 
                <div>
                    <Line></Line>
                    <form onSubmit={handleSubmit(onSubmitAddVariant)}>
                        <TitleText>Название варианта</TitleText>
                        <Name 
                            {...register('title', {
                                required: 'Это обязательное поле.',
                                })
                            } 
                            type='text' 
                            placeholder='Название варианта'>
                        </Name>
                        {tasks.map(task => 
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
                        <ContainerBtn><Button type="submit">Добавить вариант</Button></ContainerBtn>
                    </form>
                </div>
            }
        </div>
    )
}

export default NewVariant;

const TitleText = styled.div`
	margin-top: 20px;
	margin-bottom: 10px;
	font-family: 'Montserrat', sans-serif;
	font-size: 17px;
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

const ContainerBtn = styled.div`
    display: flex;
    justify-content: center;
`

const Line = styled.div`
    margin-top: 20px;
    border-bottom: 1px solid #000000;
`

const Name = styled.input`
    width: 315px;
    font-family: 'Montserrat', sans-serif;
    padding: 8px;
    border-radius: 25px;
    font-size: 16px;
    border: 1px solid #000000;
`