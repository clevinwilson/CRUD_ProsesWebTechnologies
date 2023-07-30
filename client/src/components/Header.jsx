import { Link } from "react-router-dom"

function Header() {
    return (
        <header className="absolute w-full">
            <nav className="bg-white shadow-lg border-gray-200 px-4 lg:px-6 py-6 ">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <a className="flex items-center">
                        <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-80">Crud App</span>
                    </a>
                    <div className="flex items-center lg:order-2">
                        <Link to={'/add-user'}>
                            <a className="text-white  hover:bg-gray-50  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 bg-blue-600 dark:hover:bg-blue-800 focus:outline-none dark:focus:ring-gray-800">Add User</a>
                        </Link>
                        {/* <a href="#" className="text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 bg-blue-600 dark:hover:bg-primary-800 ">Get started</a> */}
                    </div>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <Link to={'/'}>
                                    <a className="block py-2 pr-4 pl-3 text-gray-700 rounded bg-primary-700  hover:text-blue-800  lg:p-0 " aria-current="page">Home</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>

    )
}

export default Header