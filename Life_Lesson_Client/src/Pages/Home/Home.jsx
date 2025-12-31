import React from 'react';
import Banner from './Banner';
import Benefits from './Benefits';
import Top from '../Components/Top';
import MostSavedLesson from '../Components/MostSavedLesson';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Benefits></Benefits>
            <Top></Top>
            <MostSavedLesson></MostSavedLesson>
          
        </div>
    );
};

export default Home;