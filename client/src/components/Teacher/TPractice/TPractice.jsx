import styled from 'styled-components';
import NewTask from './NewTask';
import Accordion from './Accordion';
import AllTasks from './AllTasks';
import SelectionTask from './NewVariant/SelectionTask';
import AllVariants from './AllVariants';
/*import * as selectors from '../../redux/selectors';*/

const TPtactice = () => {
    /*const isDisabled = useSelector(selectors.isDisabled);*/

    const accordionData = [
        {
            title: 'Добавить новое задание',
            content: <NewTask/>
        },
        {
            title: 'Составить вариант',
            content: <SelectionTask/>
        },
        {
            title: 'Посмотреть составленные варианты',
            content: <AllVariants/>
        },
        {
            title: 'Посмотреть добавленные задания',
            content: <AllTasks/>
        },
    ]

    return (
        <Container>
			<H1>Практика</H1>
            <div>
                {accordionData.map(({title, content}) => 
                    <Accordion title={title} content={content}/>
                )}
            </div>
		</Container>
    )
}

export default TPtactice;

const Container = styled.div`
	padding-bottom: 10px;
`

const H1 = styled.div`
	margin-top: 20px;
	margin-bottom: 30px;
	text-align: center;
	font-family: 'Montserrat', sans-serif;
	font-size: 40px;
`