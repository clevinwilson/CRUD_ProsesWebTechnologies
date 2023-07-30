import { BsPencilFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";


function UserCard({ user, deleteUser,editUser }) {
    return (
        <li>
            <div className="flex justify-evenly  items-center gap-x-6 bg-gray-100 px-5 py-3 rounded-lg">
                <img className="h-16 w-16 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt />
                <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{user.name}</h3>
                    <p className="text-sm font-semibold leading-6 text-indigo-600">{user.phone}</p>

                </div>
                <div>
                    <div className="flex justify-between">
                        <button type="button" onClick={()=>{editUser(user._id)}} className="rounded-full  focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 h-11 w-11 font-medium  text-sm px-4 py-2.5 mr-2  dark:focus:ring-yellow-900"><BsPencilFill/></button>
                        <button type="button" onClick={() => { deleteUser(user._id)}} className="rounded-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium  text-lg h-11 w-11 px-3 py-2.5 mr-2  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><AiFillDelete/></button>
                    </div>

                </div>
            </div>
        </li>
    )
}

export default UserCard