import React, { useState, useEffect, useRef } from 'react';
import spaceXimg from '../Logos/spaceXLogo.svg';

export function RocketNumbers ({click}) {
    const [values, setValues] = useState({
        speed: 7.68,
        altitude: 390,
        apogee: 404.4,
        perigee: 389.4,
        inclination: 51.69,
        range: 0.02
    });

    const generateRandomValue = (maxValue) => {
        let value = Math.random() * maxValue;
        return value.toFixed(2);
    }

    useEffect(() => {
        setValues({
            speed: generateRandomValue(10),
            altitude: generateRandomValue(1000),
            apogee: generateRandomValue(800),
            perigee: generateRandomValue(500),
            inclination: generateRandomValue(90),
            range: generateRandomValue(1)
        })
    }, [click]);

    return (
        <div className="rocket-numbers-div">
            <div className="rocket-numbers">
                <div className="rocket-numbers-upper">
                    <div className="rocket-number-item">
                        <p className="attribute">Inertial Velocity</p>
                        <div className="loading-bar-background"></div>
                        <div className="loading-bar-progress"></div>
                        <p className="attribute-units">{values.speed} km/s</p>
                    </div>
                    <div className="rocket-number-item">
                        <p className="attribute">Altitude</p>
                        <div className="loading-bar-background"></div>
                        <div className="loading-bar-progress"></div>
                        <p className="attribute-units">{values.altitude} km</p>
                    </div>
                    <div className="rocket-number-item">
                        <p className="attribute">Apogee</p>
                        <div className="loading-bar-background"></div>
                        <div className="loading-bar-progress"></div>
                        <p className="attribute-units">{values.apogee} km</p>
                    </div>
                    <div className="rocket-number-item">
                        <p className="attribute">Perigee</p>
                        <div className="loading-bar-background"></div>
                        <div className="loading-bar-progress"></div>
                        <p className="attribute-units">{values.perigee} km</p>
                    </div>
                </div>
                <div className="rocket-numbers-lower">
                    <div className="rocket-number-item">
                            <p className="attribute">Inclination</p>
                            <div className="loading-bar-background"></div>
                            <div className="loading-bar-progress"></div>
                            <p className="attribute-units">{values.inclination}º</p>
                        </div>
                        <div className="rocket-number-item">
                            <p className="attribute">Range to ISS</p>
                            <div className="loading-bar-background"></div>
                            <div className="loading-bar-progress"></div>
                            <p className="attribute-units">{values.range} km</p>
                        </div>
                    </div>
            </div>
            <img src={spaceXimg} alt="Space X logo" className="spaceX-logo"/>
        </div>
    )
}