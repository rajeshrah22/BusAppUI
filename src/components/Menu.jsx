//React
import React from 'react'

//react-visgl-maps
import { useMap } from '@vis.gl/react-google-maps'
import { CENTER, ZOOM } from '../constants'

//MUI
import Box from '@mui/material/Box'
import Drawer from '@mui/material/SwipeableDrawer'
import Skeleton from '@mui/material/Skeleton'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import { useTheme } from '@emotion/react'
import { GlobalStyles } from '@mui/material'
import { SearchBox } from './SearchBox'
import MenuList from './MenuList'
import MenuAccordion from './menuAccordion'
import BottomNavigation from './BottomNavigation'
import { HeadingCard } from './HeadingCard'

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

//style constants
const DRAWER_BLEEDING = 31
const ICON_WIDTH = '16px'
const DRAWER_HEIGHT = '100%'

const inputGlobalStyles = (
<GlobalStyles
  styles={{
    '.MuiDrawer-root > .MuiPaper-root': {
      height: `calc(${DRAWER_HEIGHT} - ${DRAWER_BLEEDING}px)`,
      overflow: 'visible',
    }
  }}
/>
)

const Menu = ({ open, handleAgencyClick, showAgencies, setShowAgencies, toggleDrawer, agencies, routes, loading, handleMapClick, setDirectionState, directionState, eraseLines }) => {
  const map = useMap()

  const handleBackNavigation = () => {
    if (showAgencies.showAgencies) {
      return
    }

    setShowAgencies({...showAgencies, showAgencies: true})
    setDirectionState({...directionState, showDirection: false})

    map.setCenter(CENTER)
    map.setZoom(ZOOM)
    
    eraseLines();
  }

  //prop constants
  const ANCHOR = 'bottom'

  const theme = useTheme()

  return (
    <>
      {inputGlobalStyles}
      <Drawer
        swipeAreaWidth={DRAWER_BLEEDING}
        anchor={ANCHOR}
        open={open}
        onClose={() => {toggleDrawer(false)}}
        onOpen={() => {toggleDrawer(true)}}
      >
        <Box
          sx={{
            border: 'none',
            backgroundColor: 'white',
            position: 'absolute',
            top: -DRAWER_BLEEDING,
            visibility: 'visible',
            borderRadius: `${theme.spacing(1)} ${theme.spacing(1)} 0 0`,
            right: 0,
            left: 0,
            elevation: 0,
          }}
        >
          <DragHandleIcon
            sx={{
            position: 'relative', left: `calc(50% - ${ICON_WIDTH} / 2)`,
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            px: 2,
            py: 2,
          }}
        >
          <HeadingCard inputState={showAgencies} />
          <SearchBox inputState={showAgencies} />
          <Box
            sx={{
              flex: 1,
              borderRadius: 1,
              overflow: 'auto',
            }}
          >
            {
              loading 
              ? 
              (
                <>
                  {[...Array(8)].map((item, index) => {
                    return (
                      <Skeleton
                        key={index}
                        variant="rectangular"
                        width="100%"
                        height={70}
                        sx={{
                          borderRadius: 1,
                          my: 1,
                        }}
                      />
                    );
                  })}
                </>
              )
              : 
              (
                <>
                  {showAgencies.showAgencies ? (
                    <>
                      <MenuList list={agencies} handleClick={handleAgencyClick} />
                    </>
                  ) : (
                    <>
                      <MenuAccordion
                        routes={routes}
                        handleMapClick={handleMapClick}
                        toggleDrawer={toggleDrawer}
                      />
                    </>
                  )}
                </>
              )
            }
          </Box>
          <BottomNavigation handleBackNavigation={handleBackNavigation}/>
        </Box>
      </Drawer>
    </>
  )
}

export default Menu


