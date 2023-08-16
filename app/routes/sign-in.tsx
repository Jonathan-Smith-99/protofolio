import { useState } from 'react'
import { Layout } from "~/components/layout"
import { FormField } from '~/components/form-field'

export default function SignIn() {
    const [action, setAction] = useState('login')
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        })

    // Updates the form data when an input changes
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setFormData(form => ({ ...form, [field]: event.target.value }))
    }

    return (
        <Layout>
            <div className="h-screen justify-center items-center flex flex-col gap-y-4">
                <h2 className="text-5xl font-extrabold text-yellow-300">Welcome to Kudos!</h2>
                <p className="font-semibold text-slate-300">
                    {action === 'login' ? 'Log In To Give Some Praise!' : 'Sign Up To Get Started!'}
                </p>
                        
                <form method="POST" className="rounded-2xl bg-gray-200 p-6 w-96">
                    <FormField
                        htmlFor="email"
                        label="Email"
                        value={formData.email}
                        onChange={e => handleInputChange(e, 'email')}
                    />
                    <FormField
                        htmlFor="password"
                        type="password"
                        label="Password"
                        value={formData.password}
                        onChange={e => handleInputChange(e, 'password')}
                    />
                    {action === 'register' && (
                        <>
                            <FormField
                                htmlFor="firstName"
                                label="First Name"
                                onChange={e => handleInputChange(e, 'firstName')}
                                value={formData.firstName}
                            />
                            <FormField
                                htmlFor="lastName"
                                label="Last Name"
                                onChange={e => handleInputChange(e, 'lastName')}
                                value={formData.lastName}
                            />
                        </> 
                    )}                   
                    <div className="w-full text-center">
                        <button type="submit" name="_action" value={action} className="rounded-xl mt-2 bg-yellow-300 px-3 py-2 text-blue-600 font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1">
                            {
                                action === 'login' ? "Sign In" : "Sign Up"
                            }
                        </button>
                    </div>
                </form>
                <div>
                    <p className="text-slate-300">{action === 'login' ? 'New to Protofolio?' : 'Already have an account?'}</p>                 
                    <button
                    onClick={() => setAction(action == 'login' ? 'register' : 'login')}
                    className="rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
                    >
                        {action === 'login' ? 'Sign Up' : 'Sign In'}
                    </button>
                </div>
            </div>
        </Layout>
    )
}


<div className="hero-content flex-col justify-center items-center lg:flex-row-reverse">
<div className="text-center lg:text-left">
    <h1 className="text-5xl font-bold">Login now!</h1>
    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
</div>
<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
    <div className="card-body">
        <div className="form-control">
            <label className="label">
                <span className="label-text">Email</span>
            </label>
            <input type="text" placeholder="email" className="input input-bordered" />
        </div>
        <div className="form-control">
            <label className="label">
                <span className="label-text">Password</span>
            </label>
            <input type="text" placeholder="password" className="input input-bordered" />
            <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
        </div>
        <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
        </div>
    </div>
</div>
</div>