//react
import { useState, useEffect } from 'react'

//MUI
import { Box } from '@mui/material'

//maps
import { Map, Marker, useApiIsLoaded } from '@vis.gl/react-google-maps'

//local
import Menu from './components/Menu'
import { fetchAgencies } from './api/api'


function App() {
  const [agencies, setAgencies] = useState(null)
  const [isMenuloading, setIsMenuLoading] = useState(true)

  useEffect(() => {
    fetchAgencies().then((agencies) => {
      console.log("recieved agencies")
      setAgencies(agencies)
      setIsMenuLoading(false)
    })
  }, [])

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
          agencies ? agencies.map((agency, index) => {
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
          <></>
        }
      </Map>
      <Menu
        agencies={agencies}
        setAgencies={setAgencies}
        loading={isMenuloading}
        setLoading={setIsMenuLoading}
      />
    </Box>
  )
}

export default App
