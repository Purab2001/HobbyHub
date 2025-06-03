import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const TypewriterEffect = ({ text }) => {
    const [typewriterText] = useTypewriter({
        words: [text],
        loop: 2,
        typeSpeed: 30,
        deleteSpeed: 70,
        delaySpeed: 500,
    });
    
    return (
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white min-h-[3rem]">
            {typewriterText}
            <Cursor cursorColor="white" />
        </h1>
    );
};

export default TypewriterEffect;