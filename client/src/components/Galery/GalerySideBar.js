import React, { PureComponent } from 'react';

class GalerySideBar extends PureComponent {
    changeActiveImage = (e) => {
        const clickedImageSrc = e.target.getAttribute('src');
        const {srcArr, setActiveImageIndex} = this.props;
        srcArr.forEach((src, i) => {
            if(src === clickedImageSrc){
                setActiveImageIndex(i);
            }
        });
    }
    render() {
        const {srcArr, activeImageIndex} = this.props;
        return (
            <div className='galery-side-bar'>
                {
                    srcArr.map((src, i)=>{
                        try{
                            return (
                                <img 
                                key={`${src} ${i}`}
                                className={activeImageIndex === i ? 'side-bar-img active' : 'side-bar-img'} 
                                src={src}
                                alt='side-bar-img'
                                onClick={this.changeActiveImage}/>
                            )
                        }catch{
                            return null
                        }
                        
                    })
                }
            </div>
        );
    }
}


export default GalerySideBar;