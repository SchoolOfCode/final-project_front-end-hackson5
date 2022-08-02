import React from 'react'
import { Button } from "@mui/material";

function Stats() {
  return (
    <div>   
    <div>Stats</div>
    <div>You've read two books this month</div>
    <Button
          color="secondary"
          variant="contained"
          size="large"
          style={{textTransform: 'none'}}
          sx={{ m: 1, borderRadius: 3, fontSize: 14, fontFamily: "Arial", fontWeight:100 }}
        >
          
          More Stats
        </Button>
    </div>
  )
}

export default Stats    