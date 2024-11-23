import { AppBar, Box, Dialog, IconButton, Slide, Toolbar, Typography } from '@mui/material';
import React, { useMemo } from 'react'
import CloseIcon from "@mui/icons-material/Close";
import { VOTE_ON_POLL } from './actions/VOTE_ON_POLL';
import { CREATE_POLL } from './actions/CREATE_POLL';
import { PUBLISH_QDN_RESOURCE } from './actions/PUBLISH_QDN_RESOURCE';
import { PUBLISH_MULTIPLE_QDN_RESOURCES } from './actions/PUBLISH_MULTIPLE_QDN_RESOURCES';

const Transition = React.forwardRef(function Transition(
    props,
    ref
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



export const ShowAction = ({selectedAction, handleClose, myAddress}) => {

    const ActionComponent = useMemo(()=> {
        switch(selectedAction?.action) {
            case 'VOTE_ON_POLL':
              return VOTE_ON_POLL
              case 'CREATE_POLL':
                return CREATE_POLL
                case 'PUBLISH_QDN_RESOURCE':
                  return PUBLISH_QDN_RESOURCE
              case 'PUBLISH_MULTIPLE_QDN_RESOURCES':
                return PUBLISH_MULTIPLE_QDN_RESOURCES
            default:
              return EmptyActionComponent
          }
    }, [selectedAction?.action])
 
    if(!selectedAction) return null
  return (
    <div>
         <Dialog
        fullScreen
        open={!!selectedAction}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", bgcolor: "white", color: 'black' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {selectedAction?.action}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"

            >
              <CloseIcon  />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
          }}
        >
            <ActionComponent myAddress={myAddress} />
            

      

        
        </Box>
        {/* <LoadingSnackbar
          open={false}
          info={{
            message: "Loading member list with names... please wait.",
          }}
        /> */}
      </Dialog>
    </div>
  )
}


const EmptyActionComponent = ()=> {
    return null
}
