import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export function InitialPage () {
    const [progressValue, setProgressValue] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgressValue((oldValue) => {
                let newValue = oldValue + 1;

                if (newValue > 98) {
                    clearInterval(interval);
                }

                return newValue;
            })
        }, 70)
    }, []);
    
    return (
        <>
            <div className='initial-page'>
                <CircularProgressbar className="initial-progress"
                                     value={progressValue}
                                     text={`${progressValue} %`}
                                     maxValue={60}/>
            </div>
        </>
    )
}