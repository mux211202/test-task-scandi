import React, { PureComponent } from 'react';
import GalerySideBar from './GalerySideBar';
import GaleryMainImage from './GaleryMainImage';
import './Galery.css';
class Galery extends PureComponent {
    constructor(){
        super();
        this.state={
            activeImageIndex:0
        }
    }
    setActiveImageIndex = (index)=>{
        const {galeryData} = this.props;
        console.log(index);
        if(index > galeryData.length-1){
            index = 0;
        }
        if(index < 0){
            index = galeryData.length - 1;
        }
        this.setState({activeImageIndex: index})
    }
    render() {
        const {galeryData, cartGalery} = this.props;
        const {setActiveImageIndex} = this;
        const {activeImageIndex} = this.state;
        return (
            <div className="galery">
                {cartGalery ? null
                :<GalerySideBar 
                srcArr={galeryData} 
                activeImageIndex={activeImageIndex} 
                setActiveImageIndex={setActiveImageIndex}/>
                }
                <GaleryMainImage setActiveImageIndex={setActiveImageIndex} 
                srcArr={galeryData} cartGalery={cartGalery} activeImageIndex={activeImageIndex}/>
            </div>
        );
    }
}

export default Galery;