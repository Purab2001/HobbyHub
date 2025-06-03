import React from 'react';
import Header from '../components/Header';
import HowItWorks from '../components/HowItWorks';
import PopularHobbies from '../components/PopularHobbies';
import Comments from '../components/Comments';
import JoinNow from '../components/JoinNow';
import FeaturedGroups from '../components/FeaturedGroups';

const Home = () => {
    return (
        <div>
            <Header />
            <FeaturedGroups />
            <HowItWorks />
            <PopularHobbies />
            <Comments />
            <JoinNow />
        </div>
    );
};

export default Home;