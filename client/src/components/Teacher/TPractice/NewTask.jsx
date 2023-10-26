import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../../redux/task-reducer';

const NewTask = () => {
    const dispatch = useDispatch();

    const numberTasks = Array.from({ length: 27 }, (v, i) =>  i + 1); 

    const { 
        register, 
        handleSubmit,
        reset 
    } = useForm({
            mode: 'onBlur',
        });
        //добавить картинку к заданию
    const onSubmit = (task) => {
        if ((task.number == 26) || (task.number == 27)) {
            task.score = 2
        } else task.score = 1
        dispatch(addTask(task));
        reset();
    }

    return (
        <div>
        {/*<AddNewTask>*/}
                {/*<H2>Добавить новое задание</H2>*/}
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
                    <Title>Формулировка задания</Title>
                    <Question 
                        {...register('question', {
                                required: 'Это обязательное поле.',
                            })
                        } 
                        placeholder='Задание'>
                    </Question>
                    <Title><Btn>Прикрепить изображение к заданию</Btn></Title>
                    <Title><Btn>Прикрепить файл к заданию</Btn></Title>
                    <Title>Ответ на задание</Title>
                    <Answer 
                        {...register('answer', {
                            required: 'Это обязательное поле.',
                            })
                        } 
                        type='text' 
                        placeholder='Ответ'>
                    </Answer>
                    <div><Button type="submit">Добавить задание в базу</Button></div>
                </form>
        {/*</AddNewTask>*/}
        </div>
    )
}

export default NewTask;

const AddNewTask = styled.div`
    margin-top: 25px;
    margin-bottom: 50px;
    padding: 15px 40px 40px 40px;
    border: 1px solid #000000;
    border-radius: 25px;
`

const H2 = styled.div`
	margin-top: 20px;
	margin-bottom: 15px;
	font-family: 'Montserrat', sans-serif;
	font-size: 20px;
`

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

const Question = styled.textarea`
    font-family: 'Montserrat', sans-serif;
    width: 600px;
    height: 200px;
    padding: 20px;
    border-radius: 25px;
    font-size: 16px;
`

const Answer = styled.input`
    font-family: 'Montserrat', sans-serif;
    padding: 8px;
    border-radius: 25px;
    font-size: 16px;
    border: 1px solid #000000;
`

const Btn = styled.div`
    cursor: pointer;

    &:hover{
        opacity: 0.8;
    }
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