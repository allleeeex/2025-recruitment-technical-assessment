import styles from '../styles/Navbar.module.css';
import openLogo from '../../public/freeRoomsLogo.png';
import closedLogo from '../../public/freeroomsDoorClosed.png';
import { useState } from "react";
import classNames from 'classnames';
import GridIcon from "@mui/icons-material/GridViewRounded";
import MapIcon from "@mui/icons-material/Map";
import SearchIcon from "@mui/icons-material/Search";
import { DarkMode } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

function Navbar() {
	const [logo, setLogo] = useState(openLogo);

	const toggleLogo = () => {
		setLogo((prevLogo) => prevLogo === openLogo ? closedLogo : openLogo);
	}

  return (
    <div className={styles.navBar}>
      <div className={styles.logoBox}>
        <div className={styles.navItem}>
            <img src={logo} alt="logo" height="45vh" onClick={toggleLogo} />
        </div>
				<div className={classNames(styles.navItem, styles.websiteName)}>
            Freerooms
        </div>
      </div>
			<div style={{ marginLeft: '60vw' }} />
      <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton sx={{ border: "1px solid #ef6c00", padding: "5px", borderRadius: "5px", color: "#ef6c00" }}>
            <SearchIcon />
          </IconButton>
          <IconButton sx={{ border: "1px solid #ef6c00", padding: "5px", borderRadius: "5px", color: "#ef6c00" }}>
            <GridIcon />
          </IconButton>
          <IconButton sx={{ border: "1px solid #ef6c00", padding: "5px", borderRadius: "5px", color: "#ef6c00" }}>
            <MapIcon />
          </IconButton>
          <IconButton sx={{ border: "1px solid #ef6c00", padding: "5px", borderRadius: "5px", color: "#ef6c00" }}>
            <DarkMode />
          </IconButton>
        </Box>
    </div>  
  )
}

export default Navbar;
