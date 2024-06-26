import axios from 'axios';

const API_KEY = 'AIzaSyBsR-LGYrOR-u6vUlX7CuHUQz2-qZ9ceyE'; 
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
            'places.photos'
        ]
    }
}

const NewNearByPlace=(data)=>axios.post('https://places.googleapis.com/v1/places:searchNearby',data,config);

export default {
    NewNearByPlace,
    API_KEY
}




// const API_KEY = 'AIzaSyBsR-LGYrOR-u6vUlX7CuHUQz2-qZ9ceyE';

// const NewNearByPlace = async (data) => {
//     try {
//         const response = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-Goog-Api-Key': API_KEY,
//                 'X-Goog-FieldMask': [
//                     'places.displayName',
//                     'places.formattedAddress',
//                     'places.location',
//                     'places.evChargeOptions',
//                     'places.shortFormattedAddress',
//                     // 'places.photos'
//                 ]
//             },
//             body: JSON.stringify(data),
//         });


//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const responseData = await response.json();
//         // console.log('response', JSON.stringify(responseData, null, 4));
//         return responseData;
//     } catch (error) {
//         console.error('error', error);
//         throw new Error(error);
//     }
// };


// export default {
//     NewNearByPlace
// }
