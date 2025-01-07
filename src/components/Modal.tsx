import React, { useState, useEffect } from 'react';
import '../index.css';

function Modal({ isVisible, text }) {
    const [show, setShow] = useState(isVisible);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setShow(true);
            setFade(true);
        } else {
            setFade(false);
            const timer = setTimeout(() => setShow(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    return (
        show && (
            <div className={`modal ${fade ? 'fade-in' : 'fade-out'}`}>
                {text}
            </div>
        )
    );
}

export default Modal;
