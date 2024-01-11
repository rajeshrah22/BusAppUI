import { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import IconButton from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import DirectionsIcon from '@mui/icons-material/Directions';
import MapIcon from '@mui/icons-material/Map';
import Avatar from '@mui/material/Avatar'
import { useTheme } from '@emotion/react'

const MenuAccordion = ({ routes }) => {
  const theme = useTheme();
  
  return (
    <>
      {
        routes.map((result, index) => {
          return (
            <Accordion
              elevation={0}
              key={index}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <ListItem
                  sx={{
                    borderRadius: 1,
                    width: '100%',
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        backgroundColor: `#${result.route.color}`
                      }}
                    >
                      {<DirectionsTransitIcon />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={result.route.title} secondary={result.route.routeTag}></ListItemText>
                </ListItem>
              </AccordionSummary>
              <AccordionDetails>
                  {result.directionArray.map((direction, index) => {
                    return (
                      <ListItem
                        key={index}
                        sx={{
                          borderRadius: 1,
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              backgroundColor: `#${result.route.color}`
                            }}
                          >
                            {<DirectionsIcon />}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={direction.title} secondary={direction.tag}></ListItemText>
                        <IconButton>
                          <MapIcon />
                        </IconButton>
                      </ListItem>
                    )
                  })}
              </AccordionDetails>
            </Accordion>
          )
        })
      }
    </>
  ) 
}

export default MenuAccordion