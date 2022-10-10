import React, { useState, useEffect } from 'react';
import rocketImage from '../Images/spaceXRocket2.png';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export function Rocket ({characteristic, click}) {
    const [dimensions, setDimensions] = useState({
        ppo2: 0,
        temp: 0,
        pressure: 0,
        co2: 0,
        loopA: 0,
        loopB: 0,
        pwr1: 0,
        pwr2: 0
    });
    const [progressValues, setProgressValues] = useState({
        ppo2: (dimensions.ppo2) * 100 / 75.5,
        temp: (dimensions.temp) * 100 / 75.5,
        pressure: (dimensions.pressure) * 100 / 75.5,
        co2: (dimensions.co2) * 100 / 75.5,
        loopA: (dimensions.loopA) * 100 / 75.5,
        loopB: (dimensions.loopB) * 100 / 75.5,
        pwr1: (dimensions.pwr1) * 100 / 75.5,
        pwr2: (dimensions.pwr2) * 100 / 75.5
    });

    const generateRandomValue = (maxValue) => {
        let value = (Math.random() * maxValue);

        return value.toFixed(2);
    }

    useEffect(() => {
        if (click < 1) {
            setDimensions({
                ppo2: 0,
                temp: 0,
                pressure: 0,
                co2: 0,
                loopA: 0,
                loopB: 0,
                pwr1: 0,
                pwr2: 0
            })
        } else {
            setDimensions({
                ppo2: generateRandomValue(10),
                temp: generateRandomValue(20),
                pressure: generateRandomValue(50),
                co2: generateRandomValue(1),
                loopA: generateRandomValue(40),
                loopB: generateRandomValue(40),
                pwr1: generateRandomValue(100),
                pwr2: generateRandomValue(100)
            })
        }
    }, [click]);

    useEffect(() => {
        setProgressValues({
            ppo2: (dimensions.ppo2) * 7.55,
            temp: (dimensions.temp) * 5 * 0.755,
            pressure: (dimensions.pressure) * 2 * 0.755,
            co2: (dimensions.co2) * 75.5,
            loopA: (dimensions.loopA) * 2.5 * 0.755,
            loopB: (dimensions.loopB) * 2.5 * 0.755,
            pwr1: (dimensions.pwr1) * 0.755,
            pwr2: (dimensions.pwr2) * 0.755
        })
    }, [dimensions]);
    
    return (
        <div className="rocket-div">
            <div className='upperClocksDiv'>
                <div className="upperClock">
                    <p>PPO2</p>
                    <h3>{dimensions.ppo2}</h3>
                    <h4>psia</h4>
                    <CircularProgressbar value={progressValues.ppo2} 
                                            className="speedometer pp02"/>
                </div>
                <div className="upperClock">
                    <p>CABIN TEMP</p>
                    <h3>{dimensions.temp}</h3>
                    <h4>ºC</h4>
                    <CircularProgressbar value={progressValues.temp} 
                                            className="speedometer temp"/>
                </div>
                <div className="upperClock">
                    <p>CABIN PRESSURE</p>
                    <h3>{dimensions.pressure}</h3>
                    <h4>psia</h4>
                    <CircularProgressbar value={progressValues.pressure} 
                                            className="speedometer press"/>
                </div>
                <div className="upperClock">
                    <p>CO2</p>
                    <h3>{dimensions.co2}</h3>
                    <h4>mmHg</h4>
                    <CircularProgressbar value={progressValues.co2} 
                                            className="speedometer co2"/>
                </div>
            </div>
            <div className='lowerClocksDiv01'>
                <div className="lowerClock01">
                    <p>LOOP A</p>
                    <h3>{dimensions.loopA}</h3>
                    <h4>ºC</h4>
                    <CircularProgressbar value={progressValues.loopA} 
                                            className="speedometer loopA"/>
                </div>
                <div className="lowerClock01 lowerClockMiddle">
                    <p>LOOP B</p>
                    <h3>{dimensions.loopB}</h3>
                    <h4>ºC</h4>
                    <CircularProgressbar value={progressValues.loopB} 
                                            className="speedometer loopB"/>
                </div>
            </div>
            <div className='lowerClocksDiv02'>
                <div className="lowerClock02">
                    <p>NET PWR 1</p>
                    <h3>{dimensions.pwr1}</h3>
                    <h4>W</h4>
                    <CircularProgressbar value={progressValues.pwr1} 
                                            className="speedometer pwr1"/>
                </div>
                <div className="lowerClock02 lowerClockMiddle">
                    <p>NET PWR 2</p>
                    <h3>{dimensions.pwr2}</h3>
                    <h4>W</h4>
                    <CircularProgressbar value={progressValues.pwr2} 
                                            className="speedometer pwr2"/>
                </div>
            </div>
            <div className="rocket-image-div">
                <img src={rocketImage} alt="Space X rocket renderer in 3D" className='rocket-image'/>
                <div className="rocket-image-shadow"></div>
            </div>
            <ul className='rocket-characteristics'>
                <h2>CHARACTERISTICS</h2>
                <div className="rocket-characteristic-list-div">
                    <div className="rocket-characteristic-list">
                        <li className='rocket-characteristic-item'>Reused</li>
                        <li className='rocket-characteristic-item'>Recovered</li>
                        <li className='rocket-characteristic-item'>Successful launch</li>
                    </div>
                    <div className="rocket-characteristic-values">
                        <li className='rocket-characteristic-value'><p>{characteristic.reused}</p></li>
                        <li className='rocket-characteristic-value'><p>{characteristic.recovered}</p></li>
                        <li className='rocket-characteristic-value'><p>{characteristic.successful}</p></li>
                    </div>
                </div>
            </ul>
        </div>
    )
}