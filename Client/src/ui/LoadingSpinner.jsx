import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/loading-animation.json';

const LoadingSpinner = () => {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className="w-52 h-52">
                <Lottie 
                    animationData={loadingAnimation} 
                    loop={true}
                    autoplay={true}
                />
            </div>
        </div>
    );
};

export default LoadingSpinner;