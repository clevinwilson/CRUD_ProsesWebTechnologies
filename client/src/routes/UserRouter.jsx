import { Routes, Route } from 'react-router-dom';
import Register from '../pages/User/Register';
import ListUser from '../pages/User/ListUser';

function UserRouter() {
    return (
        <Routes>
            <Route  path='/add-user' element={<Register/>} />
            <Route path='/list-user' element={<ListUser/>} />

        </Routes>
    )
}

export default UserRouter