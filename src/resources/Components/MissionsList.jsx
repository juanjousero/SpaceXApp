import rocketLogo from '../Logos/listRocket.svg';

export function MissionList ({data, onClick}) {
    return (
        <div className='mission-list-div'>
            <ul className='mission-list'>
                {data.map((mission) => (
                    <li key={mission.flight_number}
                        onClick={onClick}
                        className='mission-list-item'>
                        <img src={rocketLogo} alt="Rocket icon" className="mission-list-icon"/>
                        <h3 className='mission-list-name'>{mission.mission_name}</h3>
                        <p className='mission-list-site'>{mission.launch_site.site_name_long}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}