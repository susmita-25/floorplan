import { Box, Paper } from "@mui/material";
import { Grid, styled } from "@mui/system";
import React from "react";


// function LivingRoom(props) {
//   console.log(props)
//   return(
//    <div id="livingroom"> 
//   <Grid  size={props.livingData.walls[0].length} >
//   <Box
//         sx={{
//           width: '100%',
//           height: '500px',
//           borderRadius: 1,
//           bgcolor: 'primary.main',
//           '&:hover': {
//             bgcolor: 'primary.dark',
//           },
//         }}
//       >
//         {props.livingData.name}-({props.livingData.dimenssion})
//         </Box>
  
//   </Grid>
//   {/* <Grid size={4}>
//     size=4
//   </Grid> */}
//   </div>
//   )
//   {/* return <div id="livingroom">{props.livingData.name}-({props.livingData.dimenssion})</div>; */}
// }

// export default LivingRoom;



function LivingRoom({ livingData }) {
  if (!livingData || !livingData.dimension) {
    return <div>Error: Missing room data</div>;
  }

  const [width, height] = livingData.dimension.split("X").map(Number);

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
        {livingData.name} - ({livingData.dimension})
      </Box>
    </Grid>
  );
}

export default LivingRoom;
