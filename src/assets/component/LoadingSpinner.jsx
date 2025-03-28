import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

function LoadingSpinner() {
    return (
        <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', height: '100vh', marginLeft: "auto", marginRight: "auto" }}>
            <div className='text-[24px] font-semibold'>Loading...</div>
            <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#0000FF"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass="three-container"
                visible={true}
            />
        </div>
    );
}

export default LoadingSpinner;