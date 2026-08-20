import { useEffect, useState } from 'react';
import { Check, LayoutDashboard } from 'lucide-react';
import Input from '../../components/Ui/Input';
import Button from '../../components/Ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const features = [
    "Manage employee tasks",
    "Track progress and deadlines",
    "Access staff and reports",
    "Direct control of your workspace",
];

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
        <div className="flex min-h-screen">
            <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-violet-600 p-12 text-white lg:flex">
                <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/10" />
                <div className="pointer-events-none absolute -bottom-28 -right-20 h-96 w-96 rounded-full bg-white/10" />
                <div className="pointer-events-none absolute bottom-32 left-20 h-40 w-40 rounded-full bg-white/5" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
                            <LayoutDashboard size={22} />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">EMS</span>
                    </div>

                    <span className="mt-8 inline-flex rounded-full bg-white/15 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]">
                        Staff Portal
                    </span>
                </div>

                <div className="relative z-10 max-w-md">
                    <h1 className="text-4xl font-bold leading-tight">
                        Welcome Back
                    </h1>
                    <p className="mt-4 text-base leading-7 text-white/80">
                        Sign in to manage your staff, track tasks, and grow your operations.
                    </p>

                    <ul className="mt-10 space-y-4">
                        {features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3 text-sm text-white/90">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
                                    <Check size={14} strokeWidth={3} />
                                </span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="relative z-10 text-sm text-white/60">
                    EMS Dashboard
                </p>
            </div>

            <div className="flex w-full items-center justify-center bg-white px-6 py-12 text-gray-900 lg:w-1/2">
                <div className="w-full max-w-md">
                    <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white">
                            <LayoutDashboard size={20} />
                        </div>
                        <span className="text-2xl font-bold text-gray-900">EMS</span>
                    </div>

                    <div className="mb-8 text-center">
                        <div className="mb-5 hidden items-center justify-center gap-2 lg:flex">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white">
                                <LayoutDashboard size={20} />
                            </div>
                            <span className="text-xl font-bold text-gray-900">EMS</span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            Staff Login
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Enter your credentials to continue
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={(e) => submitHandler(e)}>
                        <Input
                            label="Username"
                            labelClass="mb-2 block text-sm font-medium text-gray-500"
                            inputClass="!border-gray-200 !bg-gray-100 !text-gray-900 placeholder:!text-gray-400 focus:!border-violet-500"
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
                            labelClass="mb-2 block text-sm font-medium text-gray-500"
                            inputClass="!border-gray-200 !bg-gray-100 !text-gray-900 placeholder:!text-gray-400 focus:!border-violet-500"
                            required="required"
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            value={loginForm.password}
                            onChange={(event) => inputHandler(event)}
                            errorMessage={passwordError}
                        />

                        <Button
                            type="submit"
                            disabled={loading}
                            buttonClass="flex w-full items-center justify-center gap-2 rounded-xl py-3"
                        >
                            {
                                loading ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                        Login...
                                    </>
                                ) : "Login"
                            }
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
