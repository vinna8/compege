import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../redux/auth-reducer";
import styled from 'styled-components';
import img from '../image/img.png'
import * as selectors from "../redux/selectors";
import Preloader from "../utils/preloader/preloader";

const Login = () => {
    const [click, setClick] = useState(false); 
    const isAuth = useSelector(selectors.isAuth);
    const user = useSelector(selectors.user);
    const messageErrorAuth = useSelector(selectors.messageErrorAuth); 
    const isFetching = useSelector(selectors.isFetching);
    const isDisabled = useSelector(selectors.isDisabled);

    const dispatch = useDispatch();

    const { 
        register, 
        formState: {errors, isValid}, 
        handleSubmit } = useForm({
            mode: 'onBlur'
        });

    const onSubmit = (data) => {
        dispatch(login(data.email, data.password));
    }

    if (isAuth && user && user.roles[0] == 'user') {
        return <Navigate to="/practice"/>
    } else {
        if (isAuth && user && user.roles[0] == 'teacher') {
            return <Navigate to="/main"/>
        }
    }

    return (
        <Container>	
            {isFetching ? <Preloader /> :
                <>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Title>Авторизация</Title>
                        <Inputs>
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
                                        })} 
                                        type="password" 
                                        placeholder="Пароль"/>
                                </div>
                            </Password>

                            <div>
                                {errors?.password && <Error>{errors?.password?.message}</Error>}
                            </div>

                            <div>
                                {messageErrorAuth && <Error>{messageErrorAuth}</Error>}
                            </div>

                        </Inputs>
                        <ContainerBtn><Button type="submit" disabled={!isValid || isDisabled}>Войти</Button></ContainerBtn>
                        <Sign>У вас еще нет аккаунта? <B onClick={() => { setClick(true) }}>Зарегистрироваться</B></Sign>
                        {click ? <Navigate to="/registration"/> : null} 
                    </Form>

                    <div>
                        <Img src={img} alt=""/>
                    </div>
                </>
            }
        </Container>
    )
}

export default Login;

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

const Email = styled.div`
    border-bottom: 1px solid #000000;
`
const Password = styled.div`
    margin-top: 30px;
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
    padding: 0px 45px;
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
    margin-top: 95px;
`

const Error = styled.div`
    margin-top: 10px;
    font-size: 14px;
    text-align: center;
    color: red;
    font-weight: bold;
`;