import React, { PureComponent } from 'react';

class GaleryMainImage extends PureComponent { 
    render() {
        const {activeImageIndex, srcArr} =this.props;
        return (
            <div>
                {
                    srcArr.map((src,i)=>{
                        if(activeImageIndex === i){
                            return(<img 
                                className='galery-main-image' 
                                key={`main photo ${src}`} 
                                src={src} 
                                alt='main img' />)
                        }
                    })
                }
            </div>
        );
    }
}

export default GaleryMainImage;