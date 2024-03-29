//react
import { useState, useEffect, useRef } from 'react'

//MUI
import { Box } from '@mui/material'

//react-visgl-maps
import { Map, Marker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps'

//local
import Menu from './components/Menu'
import { fetchAgencies, fetchRoutes } from './api/api'
import { CENTER, ZOOM } from './constants'


function App() {
  const [agencies, setAgencies] = useState([])
  const [isMenuloading, setIsMenuLoading] = useState(true)
  const [directionState, setDirectionState] = useState({ direction: null, stopList: [], pathArray: [], showDirection: false, color: undefined })
  const [open, setOpen] = useState(true)
  const [showAgencies, setShowAgencies] = useState({showAgencies: true, agencyTag: null})
  const [routes, setRoutes] = useState(null)

  const toggleDrawer = (open) => {
    setOpen(open)
  }

  const handleAgencyClick = (agencyTag) => {
    setIsMenuLoading(true)
    toggleDrawer(true)
    fetchRoutes(agencyTag).then((routes) => {
      setRoutes(routes)
      setIsMenuLoading(false)
    })
    setShowAgencies({...showAgencies,showAgencies: false, agencyTag: agencyTag})
  }

  const mapsLibrary = useMapsLibrary('maps')
  const map = useMap()

  const polylinesRef = useRef([])

  useEffect(() => {
    fetchAgencies().then((agencies) => {
      setAgencies(agencies)
      setIsMenuLoading(false)
    })
  }, [])

  const drawLines = (directionState) => {
    directionState.pathArray.forEach((path) => {
      const Polyline = new mapsLibrary.Polyline({
        path: path.pointArray,
        geodesic: true,
        strokeColor: directionState.color,
        strokeOpacity: 0.5,
        strokeWeight: 5,
      })

      Polyline.setMap(map)

      polylinesRef.current.push(Polyline)
    })
  }

  const eraseLines = () => {
    polylinesRef.current.forEach((polyline) => {
      polyline.setMap(null)
    })

    polylinesRef.current = []
  }

  const findBounds = (stopList) => {
    let bounds = {
      north: -90,  //initial max of lattitude
      south: 90,  //initial min of lattitude
      east: -180,   //initial max of longitude
      west: 180,   //initial min of longitude
    }
    
    for (let stop of stopList) {
      if (stop.lat > bounds.north) {
        bounds.north = stop.lat
      }
      if (stop.lat < bounds.south) {
        bounds.south = stop.lat
      }
      if (stop.lng > bounds.east) {
        bounds.east = stop.lng
      }
      if (stop.lng < bounds.west) {
        bounds.west = stop.lng
      }
    }
    
    return bounds;	
  }
  

  //when map clicked, plot stops(direction state change renders new stops), draw line, change camera
  const handleMapClick = ({ direction, stopList, pathArray, color }) => {
    const newDirectionState = {
      ...directionState,
      direction: direction,
      stopList: stopList,
      pathArray: pathArray,
      showDirection: true, //only non parametric value
      color: color,
    }
    
    toggleDrawer(false)

    setDirectionState(newDirectionState)

    drawLines(newDirectionState, map)

    //changes camer to zoom in on the route
    map.fitBounds(findBounds(stopList), 5)
  }
  

  return (
    <Box sx={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
    }}>
      <Map
        zoom={ZOOM}
        center={CENTER}
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
                  handleAgencyClick(agency.tag)
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
        setShowAgencies={setShowAgencies}
        showAgencies={showAgencies}
        handleAgencyClick={handleAgencyClick}
        toggleDrawer={toggleDrawer}
        agencies={agencies}
        setAgencies={setAgencies}
        loading={isMenuloading}
        setLoading={setIsMenuLoading}
        handleMapClick={handleMapClick}
        setDirectionState={setDirectionState}
        directionState={directionState}
        eraseLines={eraseLines}
        routes={routes}
        open={open}
      />
    </Box>
  )
}

export default App