import Navbar from "~/components/navbar";

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen w-full bg-white font-['Fira Sans'] justify-center items-center">
            <Navbar />
            {children}
        </div>
    )
}