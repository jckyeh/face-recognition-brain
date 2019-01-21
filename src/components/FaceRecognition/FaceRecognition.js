import React from 'react';

const FaceRecognition = ({ imageURL }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img 
                    width="500px"
                    height='auto'
                    src={imageURL}
                    alt='test face' 
                />
            </div>
        </div>
    );
}

export default FaceRecognition;