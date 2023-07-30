import { Routes, Route } from 'react-router-dom';
import Register from '../pages/User/Register';
import ListUser from '../pages/User/ListUser';
import EditUser from '../pages/User/EditUser';

function UserRouter() {
    return (
        <Routes>
            <Route path='/' element={<ListUser/>} />
            <Route path='/add-user' element={<Register />} />
            <Route path='/edit-user/:id' element={<EditUser />} />


        </Routes>
    )
}

export default UserRouter