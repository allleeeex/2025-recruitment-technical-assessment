import React from "react";
import styles from "../styles/DisplayBox.module.css";

interface BuildingProps {
  name: string;
  rooms_available: number;
  building_picture: string;
}

interface DisplayBoxProps {
    building: BuildingProps;
  }

const DisplayBox: React.FC<DisplayBoxProps> = ({ building }) => {
    return (
      <div
        className={styles.displayBox}
        style={{
          backgroundImage: `url(${building.building_picture})`,
        }}
      >
        <div className={styles.topBar}>
            <div className={styles.roomBadge}>
            🟢 {building.rooms_available} rooms available
            </div>
        </div>
        <div className={styles.bottomBar}>
            <div className={styles.buildingName}>{building.name}</div>
        </div>
      </div>
    );
  };

export default DisplayBox