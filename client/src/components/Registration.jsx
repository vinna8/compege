import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import img from '../image/img.png';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { registration } from "../redux/auth-reducer";
import * as selectors from "../redux/selectors";
import success from '../utils/success/success.json';
import Lottie from "lottie-react";

const Registration = () => {
    const [click, setClick] = useState(false); 
    const messageErrorReg = useSelector(selectors.messageErrorReg); 
    const isDisabled = useSelector(selectors.isDisabled);
    
    const dispatch = useDispatch();

    const { 
        register, 
        formState: {errors, isValid}, 
        handleSubmit,
        reset } = useForm({
            mode: 'onBlur'
        });

    const onSubmit = (data) => {
        console.log(data)
        dispatch(registration(data.login, data.email, data.password, data.lastName, data.firstName, data.patronymic));
        reset();
    }

    return (
        <Container>	
			<Form onSubmit={handleSubmit(onSubmit)}>
                <Title>Регистрация</Title>
                <Inputs>
                    <LastName>
                    <div>Фамилия</div>
                        <div>
                            <Input 
                                {...register('lastName', {
                                    required: 'Это обязательное поле.',
                                    pattern: {
                                        value: /^[а-яА-ЯёЁ]+$/,
                                        message: 'Фамилия может содержать в себе только русские буквы.'
                                    },
                                })} 
                                type="text" 
                                placeholder="Фамилия"/>
                        </div>
                    </LastName>

                    <div>
                        {errors?.lastName && <Error>{errors?.lastName?.message}</Error>}
                    </div>

                    <FirstName>
                        <div>Имя</div>
                        <div>
                            <Input 
                                {...register('firstName', {
                                    required: 'Это обязательное поле.',
                                    pattern: {
                                        value: /^[а-яА-ЯёЁ]+$/,
                                        message: 'Имя может содержать в себе только русские буквы.'
                                    },
                                })} 
                                type="text" 
                                placeholder="Имя"/>
                        </div>
                    </FirstName>

                    <div>
                        {errors?.firstName && <Error>{errors?.firstName?.message}</Error>}
                    </div>

                    <Patronymic>
                        <div>Отчество</div>
                        <div>
                            <Input 
                                {...register('patronymic', {
                                    pattern: {
                                        value: /^[а-яА-ЯёЁ]+$/,
                                        message: 'Отчество может содержать в себе только русские буквы.'
                                    },
                                })} 
                                type="text" 
                                placeholder="Отчество"/>
                        </div>
                    </Patronymic>

                    <div>
                        {errors?.patronymic && <Error>{errors?.patronymic?.message}</Error>}
                    </div>

                    <Login>
                        <div>Логин</div>
                        <div>
                            <Input 
                                {...register('login', {
                                    required: 'Это обязательное поле.',
                                    pattern: {
                                        value: /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/,
                                        message: 'Логин может содержать в себе только буквы и цифры.'
                                    },
                                    minLength: {
                                        value: 2,
                                        message: 'Минимальная длина логина 2 символа.'
                                    }
                                })} 
                                type="text" 
                                placeholder="Логин"/>
                        </div>
                    </Login>

                    <div>
                        {errors?.login && <Error>{errors?.login?.message}</Error>}
                    </div>

                    <Email>
                        <div>Электронная почта</div>
                        <div>
                            <Input 
                                {...register('email', {
                                    required: 'Это обязательное поле.',
                                    pattern: {
                                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                        message: 'Некорректная электронная почта.'
                                    },
                                })}
                                type="text" 
                                placeholder="Email"/>
                        </div>
                    </Email>

                    <div>
                        {errors?.email && <Error>{errors?.email?.message}</Error>}
                    </div>

                    <Password>
                        <div>Пароль</div>
                        <div>
                            <Input 
                                {...register('password', {
                                    required: 'Это обязательное поле.',
                                    minLength: {
                                        value: 6,
                                        message: 'Минимальная длина пароля 6 символов.'
                                    }
                                })} 
                                type="password" 
                                placeholder="Пароль"/>
                        </div>
                    </Password>

                    <div>
                        {errors?.password && <Error>{errors?.password?.message}</Error>}
                    </div>

                    <div>
                        {messageErrorReg && <Error>{messageErrorReg}</Error>}
                    </div>

                </Inputs> 
                <ContainerBtn><Button type="submit" disabled={!isValid || isDisabled}>Зарегистрироваться</Button></ContainerBtn>
                <Sign>У вас уже есть аккаунт? <B onClick={() => { setClick(true) }}>Войти</B></Sign>
                {click ? <Navigate to="/login"/> : null} 
            </Form>

			<div>
				<Img src={img} alt=""/>
			</div>

            {/*<Success>
                <SuccessForm>
                <Wrap><Lottie animationData={success} /></Wrap>

                </SuccessForm>
            </Success>*/}
        </Container>
    )
}

export default Registration;

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(2,1fr);
`

const Form = styled.form`
    margin-top: 78px;
    background: #FFFFFF;
    border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 25px;
    width: 450px;
    max-height: 100%;
`

const Title = styled.div`
    padding-top: 25px;
    text-align: center;
    font-size: 35px;
    font-family: 'Montserrat', sans-serif;
`

const Inputs = styled.div`
    padding: 35px 77px 35px 76px;
`

const LastName = styled.div`
	border-bottom: 1px solid #000000;
`

const FirstName = styled.div`
    margin-top: 20px;
	border-bottom: 1px solid #000000;
`

const Patronymic = styled.div`
    margin-top: 20px;
	border-bottom: 1px solid #000000;
`

const Login = styled.div`
    margin-top: 20px;
	border-bottom: 1px solid #000000;
`

const Email = styled.div`
    margin-top: 20px;
    border-bottom: 1px solid #000000;
`
const Password = styled.div`
    margin-top: 20px;
    border-bottom: 1px solid #000000;
`

const Input = styled.input`
    margin-top: 5px;
    padding: 8px;
    width: 280px;
    font-size: 17px;
    font-family: 'Montserrat', sans-serif;
    border: none;
`

const Button = styled.button`
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

const Sign = styled.div`
    margin-bottom: 10px;
    padding-top: 15px; 
    padding-bottom: 15px; 
    top: 365px;
    text-align: center;
    font-size: 15px;
    color: #000000;
`

const B = styled.b`
    color: #9B87FF;
    cursor: pointer;

    &:hover{
        opacity: 0.8;
    }
`

const Img = styled.img`
    margin-top: 205px;
`

const Error = styled.div`
    margin-top: 10px;
    font-size: 14px;
    text-align: center;
    color: red;
    font-weight: bold;
`;

{/*const Success = styled.div`
    z-index: 1;
    position: absolute;

    margin: 0;
    transform: translate(-50%, -50%);
    top: 50%; 
    left: 50%;
`;

const SuccessForm = styled.div`
    background: #FFFFFF;
    border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 25px;
    height: 200px;
    width: 400px;
`

const Wrap = styled.div`
    margin-left: 140px;
    width: 350px;
    height: 550px;
    text-align: center;
`*/}