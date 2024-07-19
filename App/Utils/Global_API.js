import axios from 'axios';

const API_KEY = 'YOUR_GOOGLE_PLACES_API'; 
const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': [
            'places.displayName',
            'places.formattedAddress',
            'places.location',
            'places.evChargeOptions',
            'places.shortFormattedAddress',
            'places.photos',
            'places.id',
        ]
    }
}

const NewNearByPlace=(data)=>axios.post('https://places.googleapis.com/v1/places:searchNearby',data,config);

export default {
    NewNearByPlace,
    API_KEY
}




