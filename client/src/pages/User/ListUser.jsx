import { useEffect, useState } from "react"
import Header from "../../components/Header"
import UserCard from "../../components/UserCard"
import { deleteUser, getUsers } from "../../services/userApi";
import { toast } from 'react-toastify';

function ListUser() {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        getUsers()
            .then((response) => {
                setUserList(response.data.user)
            })
            .catch((err) => {
                toast.error(err.error.message, {
                    position: "top-right",
                });
            })
    }, [])

    //handle delete user
    function handleDeleteUser(id) {
        deleteUser(id)
            .then((response) => {
                console.log(response);
                //updating the state
                if (response.data.status) {
                    let updatedUserList = userList.filter((user) => {
                        if (user._id === id) {
                            return false;
                        } else {
                            return true
                        }
                    })
                    setUserList(updatedUserList)

                    toast.success('User deleted successfully', {
                        position: "top-right",
                    });
                }
            })
            .catch((err) => {
                toast.error(err.error.message, {
                    position: "top-right",
                });
            })

    }

    return (
        <>
            <Header />
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">User List</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">Users can edit their details, and new users can be added using the 'Add User' button.</p>
                    </div>
                    <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                        {
                            userList.map((user, index) => {
                                return (
                                    <UserCard key={index} user={user} deleteUser={handleDeleteUser} />
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ListUser