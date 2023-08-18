import { LoaderFunction } from "@remix-run/node";
import { requireUserId } from "~/utils/auth.server";
import SideBar from "~/components/sidebar"; 
import Navbar from "~/components/navbar";

export const loader: LoaderFunction = async ({ request }) => {
    await requireUserId(request);
    return null
}

export default function Main() {
    return (
        <div className="flex flex-col font-['Fira_Sans']">
            <Navbar />
            <div className="flex flex-row">
                <SideBar />
                <div className="flex-auto w-3/4 pt-20 px-3">
                    <h2 className="w-full text-5xl font-medium">This is the Main Page.  PROTOFOLIO</h2>
                    <div className="card w-96 bg-blue-200 text-neutral-800 shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title">Net Worth</h2>
                            <p>This is a chart of net worth.</p>
                            <div className="card-actions justify-end">
                                <button className="btn">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-auto w-96 pt-20 px-3">
                    <h3>This the the side column.</h3>
                </div>

            </div>
            
            
        </div>


    ) 
}