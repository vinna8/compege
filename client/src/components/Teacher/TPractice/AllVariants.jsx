import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assignmentVariant, assignmentVariantForGroup, deleteSpecificVariant, getVariants } from '../../../redux/task-reducer';
import * as selectors from "../../../redux/selectors";
import { AiOutlineDelete } from "react-icons/ai";
import PopUp from '../../UtilsComponents/Modal';
import { BsPeople, BsPerson, BsX } from "react-icons/bs";
import { getAllUsers } from '../../../redux/auth-reducer';

const AllVariants = () => {
    const [modalSubmitForSolution, setModalSubmitForSolution] = useState(false);
    const [modalAddStudent, setmodalAddStudent] = useState(false);
    const [modalAddGroup, setmodalAddGroup] = useState(false);
    const [variantState, setVariantState] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);

    const user = useSelector(selectors.user);
    const variants = useSelector(selectors.variants);
    const allUsers = useSelector(selectors.allUsers);
    const groups = useSelector(selectors.groups);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVariants(user.userId));
    }, [])

    const deleteVariant = (variant) => {
        dispatch(deleteSpecificVariant(variant))
    }

    const viewUser = () => {
        dispatch(getAllUsers());
    }

    const addStudent = (event, student) => {
        if (event.target.checked) {
            if (!selectedUsers.includes(student)) {
                selectedUsers.push(student);
            }
        } else {
            let numDeleteUser = selectedUsers.indexOf(student);
            selectedUsers.splice(numDeleteUser, 1);
        }
    }

    const deleteStudent = (student) => {
        let numDeleteUser = selectedUsers.indexOf(student);
        selectedUsers.splice(numDeleteUser, 1);

        setSelectedUsers([...selectedUsers]);

        if (selectedUsers.length == 0) {
            setSelectedUsers([]);
        }
    }

    const addGroup = (event, group) => {
        if (event.target.checked) {
            if (!selectedGroups.includes(group)) {
                selectedGroups.push(group);
            }
        } else {
            let numDeleteGroup = selectedGroups.indexOf(group);
            selectedGroups.splice(numDeleteGroup, 1);
        }
    }

    const deleteGroup = (group) => {
        let numDeleteGroup = selectedGroups.indexOf(group);
        selectedGroups.splice(numDeleteGroup, 1);

        setSelectedGroups([...selectedGroups]);

        if (selectedGroups.length == 0) {
            setSelectedGroups([]);
        }
    }

    const submitVariant = () => {
        if (selectedGroups.length !== 0) {
            console.log(variantState._id, variantState.teacher, selectedGroups.map(g => g.number));
            dispatch(assignmentVariantForGroup(variantState._id, variantState.teacher, selectedGroups.map(g => g.number)))
        }
        if (selectedUsers.length !== 0) {
            console.log(variantState, selectedUsers);
            dispatch(assignmentVariant(variantState._id, variantState.teacher, selectedUsers.map(u=> u._id)));
        }
    }

    return (
        <div>
            {variants.length > 0 
                ? variants.map((variant) =>
                    <Wrap key={variant._id}>
                        <Header>
                            <TitleVariant>Вариант: {variant.title}</TitleVariant>
                            <Span>
                                <AiOutlineDelete onClick={() => {deleteVariant(variant._id)}} style={{color: 'black', fontSize: '22px', verticalAlign: 'middle', marginLeft: '5px'}}/>
                            </Span>
                        </Header>
                        {variant.tasks.map(task =>
                            <Block key={task._id}>
                                <Div>
                                    <Header>
                                        <H4>№ {task.number}</H4>
                                    </Header>
                                    <Content>{task.questions}</Content>
                                    {task.photo ? <div style={{textAlign: 'center'}}><img src={task.photo} alt='picture'/></div> : null}
                                    <div>Ответ: {task.answer}</div>
                                </Div>
                            </Block>
                        )}
                        <ContainerBtn><Button onClick={() => {setModalSubmitForSolution(true); setVariantState(variant)}}>Отправить на решение</Button></ContainerBtn>
                    </Wrap>
                )
                : <div>Вариантов нет</div>
            }

            {modalSubmitForSolution &&
                <PopUp active={modalSubmitForSolution} setActive={setModalSubmitForSolution}>
                    <Title>Вариант: {variantState.title}</Title>
                    <WrapCoice>
                        <ItemChoice onClick={() => {setmodalAddGroup(true)}}><BsPeople style={{color: 'black', fontSize: '18px', verticalAlign: 'middle', marginRight: '5px'}}/>Выбрать группу</ItemChoice>
                        {selectedGroups && selectedGroups.map((group, index) =>
                            <Student key={index}>
                                {group.number}
                                <BsX onClick={() => {deleteGroup(group)}} style={{color: 'black', fontSize: '25px', verticalAlign: 'middle', marginRight: '5px', cursor: 'pointer'}}/>
                            </Student>
                        )}
                        <ItemChoice onClick={() => {viewUser(); setmodalAddStudent(true)}}><BsPerson style={{color: 'black', fontSize: '18px', verticalAlign: 'middle', marginRight: '5px'}}/>Выбрать ученика</ItemChoice>
                        {selectedUsers && selectedUsers.map((user, index) =>
                            <Student key={index}>
                                {user.lastName + ' ' + user.firstName + ' ' + user.patronymic}
                                <BsX onClick={() => {deleteStudent(user)}} style={{color: 'black', fontSize: '25px', verticalAlign: 'middle', marginRight: '5px', cursor: 'pointer'}}/>
                            </Student>
                        )}
                    </WrapCoice>
                    <ContainerBtn><Button onClick={() => {setModalSubmitForSolution(false); submitVariant()}}>Отправить вариант</Button></ContainerBtn>
                </PopUp>
            }

            {modalAddStudent &&
                <PopUp active={modalAddStudent} setActive={setmodalAddStudent}>
                    <Title>Выберите учеников</Title>
                    {allUsers && allUsers.map((u, index) =>
                        <CheckBoxContainer key={u._id}>
                            <CheckBox type="checkbox" id={`checkbox${index}`} onChange={(event) => {addStudent(event, u)}}/>
                            <Label htmlFor={`checkbox${index}`}>{u.lastName + ' ' + u.firstName + ' ' + u.patronymic}</Label>
                        </CheckBoxContainer>
                    )}
                    <ContainerBtn><Button onClick={() => {setmodalAddStudent(false)}}>Добавить</Button></ContainerBtn>
                </PopUp>
            }

            {modalAddGroup &&
                <PopUp active={modalAddGroup} setActive={setmodalAddGroup}>
                    <Title>Выберите группу</Title>
                    {groups && groups.map((g, index) =>
                        <CheckBoxContainer key={g._id}>
                            <CheckBox type="checkbox" id={`checkbox${index}`}  onChange={(event) => {addGroup(event, g)}}/>
                            <Label htmlFor={`checkbox${index}`}>{g.number}</Label>
                    </CheckBoxContainer>
                    )}
                    <ContainerBtn><Button onClick={() => {setmodalAddGroup(false)}}>Добавить</Button></ContainerBtn>
                </PopUp>
            }
        </div>
    )
}

export default AllVariants;

const Wrap = styled.div`
	margin-top: 25px;
    margin-bottom: 25px;
	padding: 40px;
	border: 1px solid #000000;
	border-radius: 25px;
	border: 1px solid;
	box-sizing: border-box;
`

const TitleVariant = styled.div`
    font-size: 18px;
    font-weight: 600;
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

const Button = styled.button`
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

const WrapCoice = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
`

const ItemChoice = styled.div`
    margin-bottom: 8px;
    cursor: pointer;

    &:hover{
        opacity: 0.8;
    }
`

const Student = styled.div`
    padding-bottom: 3px;
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