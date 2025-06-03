import React, { useState, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import Button from '../ui/Button';
import logo from '/logo.svg';
import { AuthContext } from '../context/AuthContext';
import showAlert from '../ui/Alert';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        photoUrl: ''
    });
    const navigate = useNavigate();
    const { createUser, signInWithGoogle, updateUserProfile } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.target;
        const formDataValues = new FormData(form);
        const { name, email, password, photoUrl } = Object.fromEntries(formDataValues.entries());

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasMinLength = password.length >= 6;

        if (!hasUpperCase || !hasLowerCase || !hasMinLength) {
            setIsSubmitting(false);

            if (!hasUpperCase) {
                toast.error("Password must contain at least one uppercase letter");
            }

            if (!hasLowerCase) {
                toast.error("Password must contain at least one lowercase letter");
            }

            if (!hasMinLength) {
                toast.error("Password must be at least 6 characters long");
            }

            return;
        }

        try {
            const result = await createUser(email, password);

            try {
                await updateUserProfile(name, photoUrl || '');
                await result.user.reload();
            } catch (profileError) {
                console.error('Error updating profile:', profileError);
            }

            setIsSubmitting(false);
            showAlert({
                title: 'Registration Successful!',
                text: 'You have successfully created an account.',
                icon: 'success',
                onConfirm: () => {
                    navigate('/');
                    form.reset();
                }
            });
        } catch (error) {
            setIsSubmitting(false);
            console.error("Registration error:", error);
            toast.error(error.message || 'Failed to register. Please try again.');
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
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                <motion.div
                    className="text-center mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <motion.div
                        className="flex justify-center mb-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                    >
                        <img src={logo} alt="logo" className='w-10 h-10' />
                    </motion.div>
                    <h2 className="text-2xl font-bold">HobbyHub</h2>
                    <h3 className="text-xl font-semibold mt-4">Create an account</h3>
                    <p className="text-base-content/70">Join our community of hobby enthusiasts</p>
                </motion.div>

                <motion.form
                    onSubmit={handleSignUp}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <motion.div
                        className="mb-4"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <label className="block text-sm font-medium mb-2" htmlFor="name">
                            User Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="John Doe"
                            required
                        />
                    </motion.div>

                    <motion.div
                        className="mb-4"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
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
                    </motion.div>

                    <motion.div
                        className="mb-4"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    >
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
                            <motion.button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center z-10 bg-transparent focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {showPassword ? (
                                    <FaEyeSlash className="text-base-content/50" />
                                ) : (
                                    <FaEye className="text-base-content/50" />
                                )}
                            </motion.button>
                        </div>
                    </motion.div>

                    <motion.div
                        className="mb-6"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        <label className="block text-sm font-medium mb-2" htmlFor="photoUrl">
                            Photo URL <span className="text-xs opacity-70">(optional)</span>
                        </label>
                        <input
                            type="url"
                            id="photoUrl"
                            name="photoUrl"
                            value={formData.photoUrl}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="https://example.com/your-photo.jpg"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                    >
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
                                "Register"
                            )}
                        </Button>
                    </motion.div>

                    <motion.div
                        className="my-6 relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1.0 }}
                    >
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-base-300"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-base-100 px-2 text-base-content/70">OR</span>
                        </div>
                    </motion.div>

                    <motion.button
                        type="button"
                        className="btn btn-outline w-full flex items-center justify-center gap-2"
                        onClick={handleGoogleSignIn}
                        disabled={isSubmitting}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
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
                    </motion.button>

                    <motion.p
                        className="text-center mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                    >
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:underline">
                            Sign in
                        </Link>
                    </motion.p>
                </motion.form>

                <motion.div
                    className="text-center mt-8 text-xs text-base-content/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                >
                    By registering, you agree to our{' '}
                    <span className="text-primary cursor-pointer hover:underline">
                        Terms of Service
                    </span>{' '}
                    and{' '}
                    <span className="text-primary cursor-pointer hover:underline">
                        Privacy Policy
                    </span>
                    .
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Register;