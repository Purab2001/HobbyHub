import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Button = ({ children, onClick, type = 'button', variant = 'primary', size = 'md', className = '', disabled = false, ...props }) => {
    const { theme } = useContext(ThemeContext);
    const baseStyle = 'btn rounded-md font-medium shadow-none';
    let variantStyle = '';
    let sizeStyle = '';

    switch (variant) {
        case 'primary':
            variantStyle = theme === 'dark' 
                ? 'text-slate-800 bg-white hover:bg-gray-200 border-none' 
                : 'btn-primary text-white bg-slate-800 hover:bg-slate-700 border-none';
            break;
        case 'outline':
            variantStyle = theme === 'dark'
                ? 'btn-outline text-neutral-content bg-transparent hover:bg-base-300 border border-neutral-content/30'
                : 'btn-outline text-slate-800 bg-transparent hover:bg-slate-100 border border-slate-300';
            break;
        case 'ghost':
            variantStyle = 'btn-ghost';
            break;
        case 'link':
            variantStyle = 'btn-link';
            break;
        default:
            variantStyle = 'btn-primary';
    }

    switch (size) {
        case 'xs':
            sizeStyle = 'btn-xs';
            break;
        case 'sm':
            sizeStyle = 'btn-sm';
            break;
        case 'lg':
            sizeStyle = 'btn-lg';
            break;
        case 'md':
        default:
            sizeStyle = 'py-2 px-6';
            break;
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;