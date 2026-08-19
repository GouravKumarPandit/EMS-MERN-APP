import { useEffect, useState } from 'react';
import Input from '../../components/Ui/Input';
import Button from '../../components/Ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const inputHandler = (event) => {
        setLoginForm({
            ...loginForm,
            [event.target.name]: event.target.value
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await login(loginForm);
            console.log(data)
            toast.success(data?.message);
            navigate("/dashboard");
        } catch (error) {
            if (error.response?.data?.message === "Username not found!") setUsernameError(error.response?.data?.message);
            else if (error.response?.data?.message === "Invalid username or password!") setPasswordError(error.response?.data?.message);
            else toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setUsernameError("");
            setPasswordError("");
        }, 5000);

        return () => clearInterval(timer);
    }, [usernameError, passwordError]);

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-950">
                <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-xl border border-red-500/40">
                    <h2 className="text-2xl font-bold text-center text-white mb-6">
                        CMS Login
                    </h2>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={(e) => submitHandler(e)}>
                        <Input
                            label="Username"
                            required="required"
                            type="text"
                            placeholder="Enter your username"
                            name="username"
                            value={loginForm.username}
                            onChange={(event) => inputHandler(event)}
                            errorMessage={usernameError}
                        />

                        <Input
                            label="Password"
                            required="required"
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            value={loginForm.password}
                            onChange={(event) => inputHandler(event)}
                            errorMessage={passwordError}
                        />
                        <div className='flex justify-center align-content-center'>
                            <Button type="submit" disabled={loading}>
                                {
                                    loading ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-t-transparent"></span>
                                            Login...
                                        </>
                                    ) : "Login"
                                }
                            </Button>
                        </div>
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
        </>
    )
}

export default Login;