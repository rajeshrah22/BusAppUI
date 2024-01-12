//react
import { useState, useEffect, useRef } from 'react'

//MUI
import { Box } from '@mui/material'

//react-visgl-maps
import { Map, Marker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps'

//local
import Menu from './components/Menu'
import { fetchAgencies } from './api/api'


function App() {
  const [agencies, setAgencies] = useState([])
  const [isMenuloading, setIsMenuLoading] = useState(true)
  const [directionState, setDirectionState] = useState({ direction: null, stopList: [], pathArray: [], showDirection: false, color: undefined })

  const mapsLibrary = useMapsLibrary('maps')
  const map = useMap()

  useEffect(() => {
    console.log("fetching agencies")
    fetchAgencies().then((agencies) => {
      console.log("recieved agencies")
      setAgencies(agencies)
      setIsMenuLoading(false)
    })
  }, [])

  const plotDirection = (directionState, map) => {
    const Polyline = new mapsLibrary.Polyline({
      path: directionState.pathArray,
      geodesic: true,
      strokeColor: directionState.color,
      strokeOpacity: 1.0,
      strokeWeight: 2,
    })
  
    Polyline.setMap(map)
  }
  

  //stopList contains the list of objects with stop tags,titles, and locations
  //direction contains direction tag, title and stopList
  //pathArray contains objects that contain the pathID, pointArray with list of coordinates(lat, lng)
  const handleMapClick = ({routeTag, direction, stopList, pathArray, color }) => {
    setDirectionState({
      ...directionState,
      direction: direction,
      stopList: stopList,
      pathArray: pathArray,
      showDirection: true, //only non parametric value
      color: color,
    })

    plotDirection(directionState, map);
  }

  return (
    <Box sx={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
    }}>
      <Map
        zoom={3}
        center={{lat: 22.54992, lng: 0}}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        {
          agencies && !directionState.showDirection
          ?
          agencies.map((agency, index) => {
            return (
              <Marker
                key={index}
                position={{lat: agency.location.lat, lng: agency.location.lng}}
                clickable={true}
                onClick={() => {
                  console.log(agency)
                }}
                title={agency.title}
              />
            )
          })
          :
          directionState.stopList.map((stop, index) => {
            return (
              <Marker
                key={index}
                position={{lat: stop.lat, lng: stop.lng}}
                clickable={true}
                onClick={() => {
                  console.log(stop)
                }}
                title={`${stop.title} ${stop.tag}`}
              />
            )
          })
        }
      </Map>
      <Menu
        agencies={agencies}
        setAgencies={setAgencies}
        loading={isMenuloading}
        setLoading={setIsMenuLoading}
        handleMapClick={handleMapClick}
        setDirectionState={setDirectionState}
        directionState={directionState}
      />
    </Box>
  )
}

export default App
