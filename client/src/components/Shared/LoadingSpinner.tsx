import React from 'react';
interface LoadingProps {
    size: string
}
const LoadingSpinner: React.FC<LoadingProps> = ({size}) => {
    return (
        <div className="my-4 flex gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="margin: auto; background: rgb(241, 242, 243); display: block;"
                width={size}
                height={size}
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"              
            >
                <circle cx="50" cy="50" fill="none" stroke="#93dbe9" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                </circle>
            </svg>
            <div className='font-medium text-slate-300'>Loading ...</div>
        </div>
    );
};

export default LoadingSpinner;
