import React from 'react';
import i1 from '../../assets/imgaes/john-2FPjlAyMQTA-unsplash.jpg'
import i2 from '../../assets/imgaes/kenny-eliason-1-aA2Fadydc-unsplash.jpg'
import i3 from '../../assets/imgaes/marvin-meyer-SYTO3xs06fU-unsplash.jpg'
import i4 from '../../assets/imgaes/vitaly-gariev-KOTQ96r2m6E-unsplash.jpg'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 


const Banner = () => {
    return (
        <div className='w-[800px] mx-auto mt-6'>
             <Carousel
             autoPlay={true}
             infiniteLoop={true} 
             >
                <div>
                    <img src={i1} alt='porimoni'/>
                    
                </div>
                <div>
                    <img src={i2} />
                   
                </div>
                <div>
                    <img src={i3} />
                    
                </div>
                 <div>
                    <img src={i4} />
                    
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;