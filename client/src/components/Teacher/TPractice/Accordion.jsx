import styled from 'styled-components';
import { useState } from 'react';
import { BsChevronRight, BsChevronDown } from "react-icons/bs";

const Accordion = ({ title, content }) => {
    const [open, setOpen] = useState(false); 

    return (
        <AccordionItem>
            <AccordionTitle onClick={() => {setOpen(!open)}}>
                <div>{title}</div>
                <div>
                    {open 
                        ? <BsChevronDown style={{color: 'black',  verticalAlign: 'middle'}}/> 
                        : <BsChevronRight style={{color: 'black',  verticalAlign: 'middle'}}/>
                    }
                </div>
            </AccordionTitle>
            {open && 
                <AccordionContent>{content}</AccordionContent>
            }
        </AccordionItem>
    );
};

export default Accordion;

const AccordionItem = styled.div`
    margin-bottom: 20px;
`

const AccordionTitle = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;
    background-color: #FFFFFF; /*rgba(219, 205, 254, 0.6);*/
    border: 1px solid #000000;

    &:hover{
        background-color: rgba(219, 205, 254, 0.6); /*#9B87FF*/;
    }
`

const AccordionContent = styled.div`
    padding: 1.5rem;
    border: 1px solid #000000;
`