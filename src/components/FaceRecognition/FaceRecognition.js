import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ box, imageURL }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img 
                    id = 'inputImage'
                    width="500px"
                    height='auto'
                    src={imageURL}
                    alt='test face' 
                />
                <div 
                    style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}
                    className='bounding-box'></div>
            </div>
        </div>
    );
}

export default FaceRecognition;