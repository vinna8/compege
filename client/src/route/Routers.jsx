import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Login from "../components/Login";
import Practice from "../components/Practice/Practice";
import Registration from '../components/Registration';
import Theory from "../components/Theory/Theory";
import Test from "../components/Test/Test";
import ComputerEge from '../components/Test/ComputerEge/ComputerEge';
import Answers from '../components/Test/Answers';
import Statistics from '../components/Statistics/Statistics';
import Main from '../components/Teacher/Main'
import TPtactice from '../components/Teacher/TPractice/TPractice';
import TStatistic from '../components/Teacher/TStatistic/TStatistic';

const Routers = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />}/>
            <Route path='/registration' element={<Registration />}/>
            <Route path='/' element={<Login />}/>
            <Route path='/practice' element={<Practice />}/>
            <Route path='/theory' element={<Theory />}/>
            <Route path='/practice/test' element={<Test />}/>
            <Route path='/practice/test/compege' element={<ComputerEge />}/>
            <Route path='/practice/test/check' element={<Answers />}/>
            <Route path='/statistics' element={<Statistics />}/>
            <Route path='/main' element={<Main />}/> 
            <Route path='/editPractice' element={<TPtactice />}/>
            <Route path='/statisticsStudent' element={<TStatistic />}/>
        </Routes>
    );
}

export default Routers;