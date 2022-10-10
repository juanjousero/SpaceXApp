
const API_URL = 'https://api.spacexdata.com/v3/';
const endpoint = 'launches';

const URL = API_URL + endpoint;

export async function getLaunches () {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error); 
    }
}