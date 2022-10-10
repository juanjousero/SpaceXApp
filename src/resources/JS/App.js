import React, { useState, useEffect} from 'react';
import { InitialPage } from '../Components/InitialPage.jsx';
import { Title } from '../Components/Title.jsx';
import { MissionList } from '../Components/MissionsList.jsx';
import { Rocket } from '../Components/Rocket.jsx';
import { RocketNumbers } from '../Components/RocketNumbers.jsx';
import * as launches from '../API/launches';

import '../CSS/reset.css';
import '../CSS/App.css';

export function App() {
  
  const [initialPage, setInitialPage] = useState(true);
  const [spaceXData, setSpaceXData] = useState([]);
  const [rocketName, setRocketName] = useState('(Select a Mission)');
  const [rocketType, setRocketType] = useState('(Select a Mission)');
  const [characteristics, setCharacteristics] = useState(
    {
      reused: 'Unknown',
      recovered: 'Unknown',
      successful: 'Unknown'
    }
  );
  const [clicked, setClicked] = useState(0);
  const [attributeValues, setAttributeValues] = useState({
      speed: 0,
      altitude: 0,
      apogee: 0,
      perigee: 0,
      inclination: 0,
      range: 0
  });

  // Obtenemos el array de objectos de la API
  useEffect(() => {
    launches.getLaunches().then((data) => setSpaceXData(data));
  }, []);

  // Lanzamos y manejamos la página de inicio
  useEffect(() => {
    setTimeout(() => {
      setInitialPage(false);
    }, 5000);
  }, []);

  const generateRandomValue = (maxValue) => {
    let value = Math.random() * maxValue;
    return value.toFixed(2);
  }

  const settingValues = () => {
    setAttributeValues({
      speed: generateRandomValue(10),
      altitude: generateRandomValue(1000),
      apogee: generateRandomValue(800),
      perigee: generateRandomValue(500),
      inclination: generateRandomValue(90),
      range: generateRandomValue(1)
    })
  }

  useEffect(() => {
    const progressBars = Array.from(document.querySelectorAll('.loading-bar-progress'));
    const attributes = Array.from(document.querySelectorAll('.attribute-units'));
    settingValues();

    attributes[0].innerHTML = `${attributeValues.speed} km/s`;
    progressBars[0].style.width = (attributeValues.speed * 20) + 'px';
    attributes[1].innerHTML = `${attributeValues.altitude} km`;
    progressBars[1].style.width = (attributeValues.altitude / 50) + 'px';
    attributes[2].innerHTML = `${attributeValues.apogee} km`;
    progressBars[2].style.width = (attributeValues.apogee / 4) + 'px';
    attributes[3].innerHTML = `${attributeValues.perigee} km`;
    progressBars[3].style.width = (attributeValues.perigee / 2.5) + 'px';
    attributes[4].innerHTML = `${attributeValues.inclination} º`;
    progressBars[4].style.width = (attributeValues.inclination * 200/90) + 'px';
    attributes[5].innerHTML = `${attributeValues.range} km`;
    progressBars[5].style.width = (attributeValues.range * 200) + 'px';
  }, [clicked])

  const selectMission = (event) => {
    const missionObject = event.target.parentNode;
    const missionName = missionObject.childNodes[1].innerHTML;
    let index = 0;

    spaceXData.map((data) => {
      if (data.mission_name == missionName) {
        index = data.flight_number - 1;
      }
    });

    const transformFalseToNo = (value) => {
      if (value === "false") {
        console.log(`Transform Value: ${value}`)
        return 'No';
      } else {
        return 'Yes';
      }
    }

    setRocketName(spaceXData[index].rocket.rocket_name);
    setRocketType(spaceXData[index].rocket.rocket_type);
    if (spaceXData[index].rocket.fairings) {
      if (spaceXData[index].rocket.fairings.reused !== null) {
        if (spaceXData[index].rocket.fairings.recovered !== null) {
          if (spaceXData[index].launch_success !== null) {
            setCharacteristics( { 
              reused: transformFalseToNo(spaceXData[index].rocket.fairings.reused.toString()),
              recovered: transformFalseToNo(spaceXData[index].rocket.fairings.recovered.toString()),
              successful: transformFalseToNo(spaceXData[index].launch_success.toString())
            } )
          } else {
            setCharacteristics( { 
              reused: transformFalseToNo(spaceXData[index].rocket.fairings.reused.toString()),
              recovered: transformFalseToNo(spaceXData[index].rocket.fairings.recovered.toString()),
              successful: 'Unknown'
            })
          }
        } else {
          if (spaceXData[index].launch_success !== null) {
            setCharacteristics( { 
              reused: transformFalseToNo(spaceXData[index].rocket.fairings.reused.toString()),
              recovered: 'Unknown',
              successful: transformFalseToNo(spaceXData[index].launch_success.toString())
            } )
          } else {
            setCharacteristics( { 
              reused: transformFalseToNo(spaceXData[index].rocket.fairings.reused.toString()),
              recovered: 'Unknown',
              successful: 'Unknown'
            })
          }
        }
      } else {
        if (spaceXData[index].rocket.fairings.recovered !== null) {
          if (spaceXData[index].launch_success !== null) {
            setCharacteristics( { 
              reused: 'Unknown',
              recovered: transformFalseToNo(spaceXData[index].rocket.fairings.recovered.toString()),
              successful: transformFalseToNo(spaceXData[index].launch_success.toString())
            } )
          } else {
            setCharacteristics( { 
              reused: 'Unknown',
              recovered: transformFalseToNo(spaceXData[index].rocket.fairings.recovered.toString()),
              successful: 'Unknown'
            })
          }
        } else {
          if (spaceXData[index].launch_success !== null) {
            setCharacteristics( { 
              reused: 'Unknown',
              recovered: 'Unknown',
              successful: transformFalseToNo(spaceXData[index].launch_success.toString())
            } )
          } else {
            setCharacteristics( { 
              reused: 'Unknown',
              recovered: 'Unknown',
              successful: 'Unknown'
            })
          }
        }
      }  
    } else {
      setCharacteristics(
        {
          reused: 'Unknown',
          recovered: 'Unknown',
          successful: 'Unknown'
        }
      );
    }

    setClicked(() => clicked + 1);
  }

  useEffect(() => {
    if (clicked > 0) {
      document.querySelector('.rocket-image').classList.add('rocket-animation');
      document.querySelector('.rocket-image-shadow').classList.add('rocket-shadow-animation');
      setTimeout(() => {
        document.querySelector('.rocket-image').classList.remove('rocket-animation');
        document.querySelector('.rocket-image-shadow').classList.remove('rocket-shadow-animation');
      }, 1200);
    }
  }, [clicked]);


  if (initialPage) {
    return (
      <>
        <div className="App">
          <Title rocketName={rocketName}
                rocketType={rocketType}/>
          <MissionList data={spaceXData} 
                      onClick={selectMission}/>
          <Rocket characteristic={characteristics}
                  click={clicked}/>
          <RocketNumbers click={clicked}/>              
        </div>
        <InitialPage />
      </>
    )
  } else {
    return (
      <div className="App">
        <Title rocketName={rocketName}
               rocketType={rocketType}/>
        <MissionList data={spaceXData} 
                     onClick={selectMission}/>
        <Rocket characteristic={characteristics}
                click={clicked}/>
        <RocketNumbers click={clicked}/>              
      </div>
    ); 
  }
}