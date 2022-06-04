// const audio = require('express').Router();
// const axios = require('axios');
// const bookMap = require('express').Router();

// const getBookMap = () => {
//   const options = {
//     method: 'get',
//     url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=29.951439,-90.081970&radius=24140.2&type=book_store&key=${GOOGLE_MAPS_API_KEY}`,
//     headers: {
//       'Map-Agent': 'request',
//     },
//   };
//   return axios(options);
// };

// bookMap.get('/', (req, res) => {
//   map().then(({data}) => {
//     console.log('DATAAAA', data)
//     res.status(200).send(data);
//   }).catch(err => console.error(err));

// });

// module.exports = bookMap;
