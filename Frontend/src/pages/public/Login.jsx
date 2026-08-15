import { useState } from 'react';
import Input from '../../components/Ui/Input';
import Button from '../../components/Ui/Button';

function Login() { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("Form Submitted: ", email);
        console.log("Form Submitted: ", password);

        setEmail("");
        setPassword("");
    } 

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950">
            <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-xl border border-red-500/40">
                <h2 className="text-2xl font-bold text-center text-white mb-6">
                    Login
                </h2>

                {/* Form */}
                <form className="space-y-5" onSubmit={(e) => submitHandler(e)}>
                    <Input 
                        label="Email" 
                        required="required"
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input 
                        label="Password" 
                        required="required"
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button type="submit">Login</Button>
                </form>

                {/* Footer */}
                {/* <p className="text-sm text-center text-gray-400 mt-4">
                    Don’t have an account?{" "}
                    <span className="text-red-500 cursor-pointer hover:underline">
                        Signup
                    </span>
                </p> */}
            </div>
        </div>
    )
}

export default Login;