import axios from 'axios'

/*------------simulation data start ------- */
const agencies = [
  {
    "tag": "yessir",
    "regionTitle": "Westborough",
    "location": {
      "lat": 42.269,
      "lng": -71.616,
    }
  },
  {
    "tag": "yeah",
    "regionTitle": "New York",
    "location": {
      "lat": 40.714,
      "lng": -74.005,
    }
  },
  {
    "tag": "Malborough",
    "regionTitle": "Manchester",
    "location": {
      "lat": 53.480,
      "lng": -2.242,
    }
  },
  {
    "tag": "yessir",
    "regionTitle": "Westborough",
    "location": {
      "lat": 42.269,
      "lng": -71.616,
    }
  },
  {
    "tag": "yeah",
    "regionTitle": "New York",
    "location": {
      "lat": 40.714,
      "lng": -74.005,
    }
  },
  {
    "tag": "Malborough",
    "regionTitle": "Manchester",
    "location": {
      "lat": 53.480,
      "lng": -2.242,
    }
  },
  {
    "tag": "yessir",
    "regionTitle": "Westborough",
    "location": {
      "lat": 42.269,
      "lng": -71.616,
    }
  },
  {
    "tag": "yeah",
    "regionTitle": "New York",
    "location": {
      "lat": 40.714,
      "lng": -74.005,
    }
  },
  {
    "tag": "Malborough",
    "regionTitle": "Manchester",
    "location": {
      "lat": 53.480,
      "lng": -2.242,
    }
  },
]

const routes = [
  {
    "title": "Purple Line",
    "tag": "fullservice",
    "color": "#800080",
    "directions": [
      {
        "title": "Inbound",
        "tag": "inbound",
      },
      {
        "title": "Outbound",
        "tag": "outbound",
      }
    ]
  },
  {
    "title": "Red Line",
    "tag": "express",
    "color": "#ff0000",
    "directions": [
      {
        "title": "Inbound",
        "tag": "inbound",
      },
      {
        "title": "Outbound",
        "tag": "outbound",
      }
    ]
  }
]

const agencyRoutes = {
  "*": routes,
}

/*------------simulation data end ------- */

const API_URL = '/BusApp'

export const fetchAgencies = async () => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(agencies)
  //   }, 1000)
  // })
  
  return axios
    .get(encodeURI(`${API_URL}/GetAgencies`))
    .then(response => response.data.results)
    .catch(error => {
      console.error('Error fetching agencies:', error)
      throw error
    })
}

export const fetchRoutes = async (agencyTag) => {
  return axios
    .get(encodeURI(`${API_URL}/GetRoutes?agencyTag=${agencyTag}`))
    .then(response => response.data.results)
    .catch(error => {
      console.error('Error fetching routes:', error)
      throw error
    })
}