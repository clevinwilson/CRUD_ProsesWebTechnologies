import { Routes, Route } from 'react-router-dom';
import Register from '../pages/User/Register';
import ListUser from '../pages/User/ListUser';

function UserRouter() {
    return (
        <Routes>
            <Route path='/' element={<ListUser/>} />
            <Route  path='/add-user' element={<Register/>} />

        </Routes>
    )
}

export default UserRouter