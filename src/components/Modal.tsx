import React, { useState, useEffect } from 'react';
import '../index.css';

function Modal({ isVisible }) {
    return (
        <>
            {isVisible && (
                <div className={`modal ${isVisible === '' ? 'fade-out' : 'fade-in'}`}>
                    {isVisible}
                </div>
            )}
        </>
    );
}

export default Modal;
