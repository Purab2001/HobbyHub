import React from 'react';
import { Link, useRouteError } from 'react-router';
import Lottie from 'lottie-react';
import errorAnimation from '../assets/error-404.json';
import Button from '../ui/Button';

const ErrorPage = () => {
    const error = useRouteError();
    
    return (
        <div className="min-h-[calc(100vh-65px)] flex flex-col items-center justify-center bg-base-100 px-4">
            <div className="w-72 h-72 mb-4">
                <Lottie 
                    animationData={errorAnimation} 
                    loop={true}
                    autoplay={true}
                />
            </div>
            
            <h1 className="text-4xl font-bold text-error mb-2">Oops!</h1>
            <p className="text-xl mb-4">Sorry, an unexpected error has occurred.</p>
            
            <p className="text-gray-500 mb-6">
                {error?.statusText || error?.message || "Something went wrong"}
            </p>
            
            <Link to="/">
                <Button variant="primary" size="md">
                    Go to Home
                </Button>
            </Link>
        </div>
    );
};

export default ErrorPage;