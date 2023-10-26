import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../image/logo.png';
import * as selectors from "../redux/selectors";
import { useDispatch, useSelector } from 'react-redux';
import { BsPerson } from "react-icons/bs";
import { logout } from '../redux/auth-reducer';

const Header = () => {
    const isAuth = useSelector(selectors.isAuth);
    const user = useSelector(selectors.user);

    const dispatch = useDispatch();  
    
    return (
        <header>
            <nav>
                <Img src={logo} alt=''/>
                {isAuth &&
                    <Ul>
                        {(user && user.roles[0] == 'user') 
                            ?
                                <>
                                    <Li><NavLinkElem to='/practice'>Практика</NavLinkElem></Li>
                                    <Li><NavLinkElem to='/theory'>Теория</NavLinkElem></Li>
                                    <Li><NavLinkElem to='/statistics'>Статистика</NavLinkElem></Li>
                                </>
                            : ''
                        }
                        {(user && user.roles[0] == 'teacher') 
                        ?
                            <>
                                <Li><NavLinkElem to='/main'>Главная</NavLinkElem></Li>
                                <Li><NavLinkElem to='/editPractice'>Практика</NavLinkElem></Li>
                                <Li><NavLinkElem to='/theory'>Теория</NavLinkElem></Li>
                                {/*<Li><NavLinkElem to='/statisticsStudent'>Статистика учеников</NavLinkElem></Li>*/}
                            </>
                        : ''
                        }
                        <Li>
                            <BsPerson style={{color: 'black', fontSize: '25px', verticalAlign: 'middle', marginRight: '8px'}}/>
                            {user.login}
                        </Li>
                        <span style={{cursor: 'pointer'}} onClick={() => { dispatch(logout()) }}>Выйти</span>
                    </Ul>
                }
            </nav>
            <Line></Line>
        </header>
    )
}

export default Header;

const Img = styled.img`
    margin-top: 10px;
    width: 55px;
    height: 55px;
`

const Ul = styled.ul`
    margin: 0;
    padding: 0;
    float: right;
    line-height: 80px;
`

const NavLinkElem = styled(NavLink)`
    color: black;
    text-decoration: none;
    cursor: pointer;

    &.active {
        font-weight: bold;
    }

	&:hover{
		opacity: 0.8;
	}
`

const Li = styled.li`
    color: black;
    display: inline-block;
    margin-right: 70px;
`

const Line = styled.div`
    border-bottom: 1px solid #000000;
`