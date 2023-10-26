import styled from 'styled-components';
import { BsCalendarEvent, BsListCheck, BsCalendar, BsPersonPlus, BsZoomIn,
    BsPeople, BsPerson, BsX } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect, useRef, useState } from 'react';
import PopUp from '../UtilsComponents/Modal';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from "../../redux/selectors";
import { getAllUsers } from '../../redux/auth-reducer';
import { useForm } from "react-hook-form";
import { addOneStudent, deleteOneStudent, getGroups, newGroup, studentStatistic } from '../../redux/group-reducer';
import { useNavigate } from 'react-router-dom';
import { addNewNote, deleteOneNote, getNotes } from '../../redux/note-reducer';

const Main = () => {
    const [modalAddGroupActive, setModalAddGroupActive] = useState(false);
    const [modalUnWrapActive, setModalUnWrapActive] = useState(false);
    const [modalAddStudentInNewGroup, setModalAddStudentInNewGroup] = useState(false);
    const [modalAddStudent, setModalAddStudent] = useState(false);
    const [modalNewNote, setModalNewNote] = useState(false);

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedUsersObj, setSelectedUsersObj] = useState([]); //убрать объект
    const [groupState, setGroupState] = useState();
    
    const allUsers = useSelector(selectors.allUsers);
    const user = useSelector(selectors.user);
    const groups = useSelector(selectors.groups);

    const notes = useSelector(selectors.notes);

    const dispatch = useDispatch();
    const navigate = useNavigate();  

    useEffect(() => {
        dispatch(getGroups(user.userId));
    }, [groups])

    useEffect(() => {
        dispatch(getNotes(user.userId));
    }, [notes])


    const { 
        register, 
        handleSubmit,
        reset } = useForm({
            mode: 'onBlur',
        });

    const viewUser = () => {
        dispatch(getAllUsers());
    }
    
    /*const addStudent = (event, student, id) => { 
        if (event.target.checked) {
            if (!(selectedUsers.map(v => v.student).length > new Set(selectedUsers.map(v => v.student)).size)) {
                selectedUsers.push({id: id, student: student});
                console.log(selectedUsers) 
            } 
        } else {
            let numDeleteUser = selectedUsers.map(el => el.student).indexOf(student)
            selectedUsers.splice(numDeleteUser, 1)
        }
    }*/

    const addStudent = (event, student, id) => {
        if (event.target.checked) {
            if (!selectedUsers.includes(student)) {
                selectedUsers.push(student);
                if (!(selectedUsersObj.map(el => el.student).length > new Set(selectedUsersObj.map(el => el.student)).size) 
                    && (!(selectedUsersObj.map(el => el.id).length > new Set(selectedUsersObj.map(el => el.id)).size))) {  //если id тоже одинаковый
                        selectedUsersObj.push({id: id, student: student});
                        /*console.log(selectedUsersObj)*/
                }
            }
        } else {
            let numDeleteUser = selectedUsers.indexOf(student);
            selectedUsers.splice(numDeleteUser, 1);
            let num = selectedUsersObj.map(el => el.student).indexOf(student);
            selectedUsersObj.splice(num, 1);
            /*console.log(selectedUsersObj)*/
        }
    }

    //rabotaet
    /*const addStudent = (event, user, id) => {
        if (event.target.checked) {
            if (!selectedUsers.includes(user)) {
                selectedUsers.push(user) //удалять из списка
            }
        } else {
            let numDeleteUser = selectedUsers.indexOf(user)
            selectedUsers.splice(numDeleteUser, 1)
        }
    }*/

    const onSubmit = (group) => {
        let selectedUsersID = selectedUsersObj.map(item => item.id);
        group.student = selectedUsersID;
        group.teacher = user.userId;
        
        if (group.student.length !== 0) {
            dispatch(newGroup(group));
            setModalAddGroupActive(false); 
            reset();
            setSelectedUsers([]);
            setSelectedUsersObj([]);
        }
    }

    const deleteStudent = (student) => {
        let numDeleteUser = selectedUsers.indexOf(student);
        selectedUsers.splice(numDeleteUser, 1);
        
        let num = selectedUsersObj.map(el => el.student).indexOf(student);
        selectedUsersObj.splice(num, 1);
        
        setSelectedUsers([...selectedUsers]);
        setSelectedUsersObj([...selectedUsersObj]);
        
        /*console.log(selectedUsers)
        console.log(selectedUsersObj)*/
        
        if (selectedUsers.length == 0) {
            setSelectedUsers([]);
        }
    }

    const deleteStudentInGroup = (group, student) => {
        dispatch(deleteOneStudent(group, student));
        let numDeleteUser = groupState.student.map(el => el._id).indexOf(student); //если нет ошибки
        groupState.student.splice(numDeleteUser, 1);
    }

    const addStudentInGroup = () => {
        console.log(selectedUsersObj)
        let selectedUsersID = selectedUsersObj.map(item => item.id);
        console.log(selectedUsersID)
        dispatch(addOneStudent(groupState.number, selectedUsersID));
        
        selectedUsersObj.map(el => {
            let student = el.student.split(' ');
            groupState.student.push({_id: el.id, lastName: student[0], firstName: student[1], patronymic: student[2], group: groupState.number})
        }) //если нет ошибки
        setSelectedUsers([]);
        setSelectedUsersObj([]);
    }

    const statisticStudent = (studentId, student) => {
        dispatch(studentStatistic(studentId, student));
        navigate("/statisticsStudent"); 
    }

    //rabotaet
    /*const deleteStudent = (student) => {
        let numDeleteUser = selectedUsers.indexOf(student)
        selectedUsers.splice(numDeleteUser, 1)
        setSelectedUsers([...selectedUsers])
        if (selectedUsers.length == 0) {
            setSelectedUsers([]);
        }
    }*/

    const addNote = (note) => {
        note.teacher = user.userId;
        dispatch(addNewNote(note));
        setModalNewNote(false);
        reset();
    }

    const deleteNote = (note) => {
        dispatch(deleteOneNote(note._id))
    }

    return (
        <Container> 
            <H1>Главная</H1>
            <Wrap>
                <div>
                    <Button onClick={() => {setModalAddGroupActive(true); viewUser()}}>Создать группу</Button> 
                    <div></div>
                    
                    {modalAddGroupActive &&
                        <PopUp active={modalAddGroupActive} setActive={setModalAddGroupActive}>
                            <Title>Создать группу</Title>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <CreateGroup>
                                    <div>Номер группы</div>
                                    <GroupNumber 
                                        {...register('groupNumber', {
                                                required: 'Это обязательное поле.',
                                            })
                                        } 
                                        type="text" 
                                    />
                                    {selectedUsers && selectedUsers.map((user, index) =>
                                        <Student key={index}>
                                            {user}
                                            <BsX onClick={() => {deleteStudent(user)}} style={{color: 'black', fontSize: '25px', verticalAlign: 'middle', marginRight: '5px', cursor: 'pointer'}}/>
                                        </Student>
                                    )}
                                    <AddStudent onClick={() => {setModalAddStudentInNewGroup(true)}}>
                                        <Cursor>
                                            <BsPersonPlus style={{color: 'black', fontSize: '20px', verticalAlign: 'middle', marginRight: '5px'}}/>
                                            Добавить ученика
                                        </Cursor>
                                    </AddStudent>
                                    <ContainerBtn><Button type="submit">Создать группу</Button></ContainerBtn>
                                </CreateGroup>
                            </form>
                        </PopUp>
                    }

                    {modalAddStudentInNewGroup &&
                        <PopUp active={modalAddStudentInNewGroup} setActive={setModalAddStudentInNewGroup}>
                            <Title>Выберите учеников</Title>
                            {allUsers && allUsers.map((u, index) =>
                                <CheckBoxContainer key={u._id}>
                                    <CheckBox type="checkbox" id={`checkbox${index}`} onChange={(event) => {addStudent(event, u.lastName + ' ' + u.firstName + ' ' + u.patronymic, u._id)}}/>
                                        <Label htmlFor={`checkbox${index}`}>{u.lastName + ' ' + u.firstName + ' ' + u.patronymic}</Label>
                                </CheckBoxContainer>
                            )}
                            <ContainerBtn><Button onClick={() => {setModalAddStudentInNewGroup(false)}}>Добавить</Button></ContainerBtn>
                        </PopUp>
                    }
                    
                    {groups && groups.map((group) =>
                        <Group key={group._id}>
                            <TitleGroup>
                                <BsPeople style={{color: 'black', fontSize: '18px', verticalAlign: 'middle', marginRight: '5px'}}/>
                                Группа: {group.number}
                            </TitleGroup>
                            <TitleGroup>
                                <BsPerson style={{color: 'black', fontSize: '18px', verticalAlign: 'middle', marginRight: '5px'}}/>
                                Количество учеников: {group.student.length}
                            </TitleGroup>
                            <TitleGroup onClick={() => {setModalUnWrapActive(true); setGroupState(group); viewUser()}}>
                                <Cursor>
                                    <BsZoomIn style={{color: 'black', fontSize: '18px', verticalAlign: 'middle', marginRight: '5px'}}/>
                                    Развернуть
                                </Cursor>
                            </TitleGroup>
                        </Group>
                    )}

                    {modalUnWrapActive &&
                        <PopUp active={modalUnWrapActive} setActive={setModalUnWrapActive}>
                            <TitleGroup>
                                <BsPeople style={{color: 'black', fontSize: '18px', verticalAlign: 'middle', marginRight: '5px'}}/>
                                    Группа: {groupState.number}
                            </TitleGroup>
                            <TitleGroup>
                                <BsPerson style={{color: 'black', fontSize: '18px', verticalAlign: 'middle', marginRight: '5px'}}/>
                                    Количество учеников: {groupState.student.length}
                            </TitleGroup>
                            {groupState.student.map((g, index) => 
                                <div key={g._id} style={{position: 'relative'}}>
                                    <Link onClick={() => statisticStudent(g._id, g.lastName + ' ' + g.firstName + ' ' + g.patronymic)}>{index + 1}. {g.lastName + ' ' + g.firstName + ' ' + g.patronymic}</Link>
                                    <BsX onClick={() => {deleteStudentInGroup(groupState.number, g._id)}} style={{color: 'black', fontSize: '25px', verticalAlign: 'middle', position: 'absolute', right: '50px', cursor: 'pointer'}}/>
                                </div>
                            )}
                            <TitleGroup onClick={() => {setModalAddStudent(true)}}>
                                <Cursor>
                                    <BsPersonPlus style={{color: 'black', fontSize: '20px', verticalAlign: 'middle', marginRight: '5px'}}/>
                                        Добавить ученика
                                </Cursor>
                            </TitleGroup>
                            <ContainerBtn><Button onClick={() => setModalUnWrapActive(false)}>Сохранить изменения</Button></ContainerBtn>
                        </PopUp>
                    }

                    {modalAddStudent &&
                        <PopUp active={modalAddStudent} setActive={setModalAddStudent}>
                            <Title>Выберите учеников</Title>
                            {allUsers && allUsers.map((u, index) =>
                                <CheckBoxContainer key={u._id}>
                                    <CheckBox type="checkbox" id={`checkbox${index}`} onChange={(event) => {addStudent(event, u.lastName + ' ' + u.firstName + ' ' + u.patronymic, u._id)}}/>
                                        <Label htmlFor={`checkbox${index}`}>{u.lastName + ' ' + u.firstName + ' ' + u.patronymic}</Label>
                                </CheckBoxContainer>
                            )}
                            <ContainerBtn><Button onClick={() => {addStudentInGroup(); setModalAddStudent(false)}}>Добавить</Button></ContainerBtn>
                        </PopUp>
                    }
                </div>

                <Tools>
                    {/*<Title>
                        <BsCalendar style={{color: 'black', fontSize: '20px', verticalAlign: 'middle', marginRight: '5px'}}/>
                        Календарь
                    </Title>
                    <Calendar></Calendar>

                    <Title>
                        <BsCalendarEvent style={{color: 'black', fontSize: '20px', verticalAlign: 'middle', marginRight: '5px'}}/>
                        Расписание занятий
                    </Title>
                    <Calendar></Calendar>*/}
                    
                    <Title>
                        <BsListCheck style={{color: 'black', fontSize: '20px', verticalAlign: 'middle', marginRight: '5px'}}/>
                        Заметки
                    </Title>
                    <Calendar>
                        {notes.map((note, index) =>
                            <div key={note._id}>{index + 1}. {note.note}
                                <Span onClick={() => {deleteNote(note)}}><AiOutlineDelete style={{color: 'black', fontSize: '18px', marginLeft: '5px'}}/></Span>
                            </div>
                        )}
                        <NewNotes onClick={() => {setModalNewNote(true)}}><i>Добавить новую запись</i></NewNotes>
                    </Calendar>
                    
                    {modalNewNote &&
                        <PopUp active={modalNewNote} setActive={setModalNewNote}>
                            <form onSubmit={handleSubmit(addNote)}>
                                <Title>Новая запись</Title>
                                <WrapNote>
                                    <Note
                                        {...register('note', {
                                            required: 'Это обязательное поле.',
                                            })
                                        } 
                                        type='text' 
                                        placeholder='Заметка'>
                                    </Note>
                                </WrapNote>
                                <ContainerBtn><Button type="submit">Сохранить</Button></ContainerBtn>
                            </form>
                        </PopUp>
                    }
                </Tools>
            </Wrap>
        </Container>
    )
}

export default Main;

const Container = styled.div`
    padding-bottom: 10px;
`

const Wrap = styled.div`
    display: grid;
    grid-template-columns: auto 350px;
`

const H1 = styled.div`
	margin-top: 20px;
	margin-bottom: 30px;
	text-align: center;
	font-family: 'Montserrat', sans-serif;
	font-size: 40px;
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

const Group = styled.div`
    display: inline-block;
    margin: 25px 35px 20px 5px;
    
    width: 250px;
    max-height: 100%;
    padding: 15px 40px 10px 30px;
    border: 1px solid #000000;
    border-radius: 25px;
	background: #FFFFFF;
`

const CreateGroup = styled.div`
    padding: 15px 0px 15px 15px;
`

const GroupNumber = styled.input`
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 25px;
    font-size: 16px;
    border: 1px solid #000000;
`

const AddStudent = styled.div`
    margin-top: 10px;
    padding-bottom: 10px;
`

const Student = styled.div`
    padding-bottom: 3px;
`

const TitleGroup = styled.div`
    padding-top: 5px;
    padding-bottom: 12px;
`

const Cursor = styled.div`
    cursor: pointer;

    &:hover{
        opacity: 0.8;
    }
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

const Link = styled.span`
    cursor: pointer;
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

const Title = styled.div`
	text-align: center;
	font-size: 18px;
`

const Tools  = styled.div`
    justify-self: center;
`

const Calendar = styled.div`
    margin: 15px 0px 35px 0px;
    width: 250px;
    max-height: 100%;
    padding: 20px 40px 40px 40px;
    border: 1px solid #000000;
    border-radius: 25px;
	background: #FFFFFF;
`

const Span = styled.span`
    cursor: pointer;

    &:hover{
        opacity: 0.8;
    }
`

const NewNotes = styled.div`
    color: #9B87FF;
    cursor: pointer;

    &:hover{
        opacity: 0.8;
    }
`

const WrapNote = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Note = styled.input`
    margin-top: 20px;
    margin-bottom: 25px;
    width: 380px;
    font-family: 'Montserrat', sans-serif;
    padding: 8px;
    border-radius: 25px;
    font-size: 16px;
    border: 1px solid #000000;
`