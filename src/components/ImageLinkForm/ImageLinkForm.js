import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
    return (
        <div>
            <p className="f3">{'This Magic Brain will detect faces in images. Give it a try!'}</p>
            <div className="center">
                <div className="pa4 br3 shadow-5 center form">
                    <input type="text" className="f4 pa2 w-70 center" onChange={ onInputChange } />
                    <button 
                        onClick={ onPictureSubmit } 
                        className="w-30 f4 grow ph3 pv2 white bg-light-purple link dib"
                    >Enter</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;