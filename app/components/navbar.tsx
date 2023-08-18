import { Link } from "@remix-run/react";
import { UserIcon, BellAlertIcon } from '@heroicons/react/24/solid'

export default function Navbar() {
    return (
        <div className="navbar fixed shadow-md bg-blue-700">
            <div className="flex-1">
                <Link className="btn btn-ghost normal-case text-xl" to="/main">
                    <img className="object-cover h-10" src="\images\protofolio-high-resolution-logo-color-on-transparent-background.png" alt="protofolio" />
                </Link>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <BellAlertIcon className="w-6 h-6 rounded-full" />
                            <span className="badge badge-sm indicator-item">8</span>
                        </div>
                    </label>
                    <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                        <div className="card-body">
                            <span className="font-bold text-lg">8 Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <button className="btn btn-primary btn-block">View cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <UserIcon className="w-10 h-10 rounded-full" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li>
                            <form action="/logout" method="POST">
                                <button type="submit">Logout</button>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
        </div>        
    )
}

