import styled from 'styled-components';
import { BsFileEarmarkWord } from "react-icons/bs";
import { AiOutlineDelete, AiOutlineFileAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import * as selectors from "../../redux/selectors";
import { useEffect } from 'react';
import { deleteFile, topics, download, upload } from '../../redux/task-reducer';

const File = () => {
    const tasks = useSelector(selectors.topics);
    const user = useSelector(selectors.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(topics());
    }, [])

    const downloadHandler = (e, file) => {
        e.stopPropagation();
        dispatch(download(file));
    }

    const fileUpload = (e, idTopic) => {
		const files = [...e.target.files];
		files.forEach(file => dispatch(upload(file, idTopic)));
	}

    const fileDelete = (e, file, idTopic) => {
        dispatch(deleteFile(file, idTopic))
	}

    return (
        <>
            {tasks && tasks.map(t => 
                <Content key={t._id}>
                    <Wrap> 
                        <span>
                            {t.number}. 
                        </span>
                        <span style={{paddingLeft: '8px'}}>
                            {t.topic}
                        </span>
                        {(t.file) 
                            ?
                                <>
                                    <Span onClick={(e) => {downloadHandler(e, t)}}>
                                        <BsFileEarmarkWord style={{color: 'black', fontSize: '18px', verticalAlign: 'middle', marginLeft: '5px'}}/>
                                    </Span>
                                    {(user && user.roles[0] == 'teacher') 
                                        ?
                                            <Span onClick={(e) => {fileDelete(e, t.file, t._id)}}>
                                                <AiOutlineDelete style={{color: 'black', fontSize: '18px', verticalAlign: 'middle', marginLeft: '5px'}}/>
                                            </Span>
                                        : ''
                                    }
                                </>
                            :
                                <>
                                    {(user && user.roles[0] == 'teacher') 
                                        ?
                                            <Span>
                                                <label htmlFor={t._id}>
                                                    <AiOutlineFileAdd style={{color: 'black', fontSize: '18px', verticalAlign: 'middle', marginLeft: '5px'}}/> 
                                                </label>
                                                <input multiple={true} onChange={(e) => {fileUpload(e, t._id)}} type='file' id={t._id} style={{display: 'none'}}/>
                                            </Span>
                                        : ''
                                    }
                                </>
                        }
                    </Wrap>        
                </Content>
            )}
        </>
    )
}

export default File;

const Content = styled.div`
	margin-bottom: 10px;
`

const Span = styled.span`
    cursor: pointer;

    &:hover{
        opacity: 0.8;
    }
`

const Wrap = styled.div`
	margin-bottom: 8px;
`