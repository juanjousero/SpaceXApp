export function Title ({rocketName, rocketType}) {

    return (
        <div className="title">
            <h1 className='rocket-name'>Rocket {rocketName}</h1>
            <h2 className='rocket-type'>Type {rocketType}</h2>
        </div>
    )
}