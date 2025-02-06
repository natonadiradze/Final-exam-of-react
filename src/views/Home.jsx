import React, {useEffect} from 'react';
import SpringCollectionBanner from "../components/SpringCollectionBanner.jsx";
import WeekHighlights from "../components/WeekHighlights.jsx";
import CarouselComp from "../components/CarouselComp.jsx";
import DiscoverCollection from "../components/DiscoverCollection.jsx";

const Home = () => {
    return (
        <div className='w-full min-h-screen'>
            <DiscoverCollection/>
            <div className='container mx-auto'>
                <CarouselComp/>
                <SpringCollectionBanner/>
                <WeekHighlights/>
            </div>

        </div>
    );
};

export default Home;