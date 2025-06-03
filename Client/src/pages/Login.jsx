import React, { useState, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import Button from '../ui/Button';
import logo from '/logo.svg';
import { AuthContext } from '../context/AuthContext';
import showAlert from '../ui/Alert';
import { toast } from 'react-toastify';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const { signIn, signInWithGoogle } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await signIn(formData.email, formData.password);
            setIsSubmitting(false);

            showAlert({
                title: 'Login Successful!',
                text: 'You have successfully logged in to your account.',
                icon: 'success',
                onConfirm: () => {
                    navigate('/');
                }
            });
        } catch (error) {
            setIsSubmitting(false);
            console.error('Login error:', error);
            toast.error(error.message || 'Failed to login. Please check your credentials.');
        }
    };

    const handleGoogleSignIn = async () => {
        setIsSubmitting(true);
        try {
            await signInWithGoogle();
            setIsSubmitting(false);
            showAlert({
                title: 'Sign-in Successful!',
                text: 'You have successfully signed in with Google.',
                icon: 'success',
                onConfirm: () => {
                    navigate('/');
                }
            });
        } catch (error) {
            setIsSubmitting(false);
            console.error("Google sign-in error:", error);
            toast.error(error.message || "Failed to sign in with Google");
        }
    };

    return (
        <motion.div
            className="flex items-center justify-center min-h-screen bg-base-200 px-4 py-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div
                className="bg-base-100 rounded-lg shadow-md p-8 w-full max-w-md"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="text-center mb-6">
                    <div className="flex justify-center mb-4">
                        <img src={logo} alt="logo" className='w-10 h-10' />
                    </div>
                    <h2 className="text-2xl font-bold">HobbyHub</h2>
                    <h3 className="text-xl font-semibold mt-4">Welcome back</h3>
                    <p className="text-base-content/70">Sign in to your account</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="email">
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="input input-bordered w-full pr-10"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center z-10 bg-transparent focus:outline-none"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="text-base-content/50" />
                                    ) : (
                                        <FaEye className="text-base-content/50" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    Processing...
                                    <span className="loading loading-spinner loading-sm"></span>
                                </span>
                            ) : (
                                "Login"
                            )}
                        </Button>

                        <div className="my-6 relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-base-300"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-base-100 px-2 text-base-content/70">OR</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="btn btn-outline w-full flex items-center justify-center gap-2"
                            onClick={handleGoogleSignIn}
                            disabled={isSubmitting}
                        >
                            <FcGoogle size={24} />
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    Processing...
                                    <span className="loading loading-spinner loading-sm"></span>
                                </span>
                            ) : (
                                "Continue with Google"
                            )}
                        </button>

                        <p className="text-center mt-6">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-primary hover:underline">
                                Create an account
                            </Link>
                        </p>
                    </form>

                    <div className="text-center mt-8 text-xs text-base-content/70">
                        By signing in, you agree to our{' '}
                        <span className="text-primary cursor-pointer hover:underline">
                            Terms of Service
                        </span>{' '}
                        and{' '}
                        <span className="text-primary cursor-pointer hover:underline">
                            Privacy Policy
                        </span>
                        .
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Login;