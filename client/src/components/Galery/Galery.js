import React, { PureComponent } from 'react';
import GalerySideBar from './GalerySideBar';
import GaleryMainImage from './GaleryMainImage';
import './Galery.css'
class Galery extends PureComponent {
    constructor(){
        super();
        this.state={
            activeImageIndex:0
        }
    }
    setActiveImageIndex = (index)=>{
        this.setState({activeImageIndex: index})
    }
    render() {
        const {galeryData} = this.props;
        const {setActiveImageIndex} = this;
        const {activeImageIndex} = this.state;
        return (
            <div className="galery">
                <GalerySideBar 
                srcArr={galeryData} 
                activeImageIndex={activeImageIndex} 
                setActiveImageIndex={setActiveImageIndex}/>
                <GaleryMainImage srcArr={galeryData} activeImageIndex={activeImageIndex}/>
            </div>
        );
    }
}

export default Galery;