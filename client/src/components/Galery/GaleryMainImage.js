import React, { PureComponent } from 'react';

import next from '../../img/cartNext.png';
import prev from '../../img/cartPrev.png';
class GaleryMainImage extends PureComponent { 
    prevHandler = ()=>{
        const {activeImageIndex, setActiveImageIndex} =this.props;
        setActiveImageIndex(activeImageIndex-1)
    }
    nextHandler = ()=>{
        const {activeImageIndex, setActiveImageIndex} =this.props;
        setActiveImageIndex(activeImageIndex+1)
    }
    render() {
        const {activeImageIndex, srcArr} = this.props;
        const {prevHandler, nextHandler} = this;
        const src = srcArr.filter((src, i) => activeImageIndex === i)[0]
        return (
            <div className='main-image-container'>
                {srcArr.length > 1 ?
                <>
                <img alt='prev' className='cart-arrow prev' onClick={prevHandler} src={prev}/>
                <img alt='next' className='cart-arrow next' onClick={nextHandler} src={next}/>
                </> : null
                }
                <img 
                alt=''
                className='galery-main-image' 
                key={`main photo ${src}`} 
                src={src}  />
            </div>
        );
    }
}

export default GaleryMainImage;