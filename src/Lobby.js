import { Box} from "@mui/material";
import React from "react";
import { Grid, styled } from "@mui/system";

function Lobby({ lobbyData }) {
    if (!lobbyData || !lobbyData.dimension) {
        return <div>Error: Missing room data</div>;
      }
    
      const [width, height] = lobbyData.dimension.split("X").map(Number);
    
      return (
        <Grid>
          <Box
            sx={{
              width: `${width * 20}px`,
              height: `${height * 20}px`,
              borderRadius: 1,
              bgcolor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "1.2rem",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            {lobbyData.name} - ({lobbyData.dimension})
          </Box>
        </Grid>
      );
}

export default Lobby;

