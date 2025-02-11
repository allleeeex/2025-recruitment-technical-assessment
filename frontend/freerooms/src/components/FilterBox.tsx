import styles from '../styles/FilterBox.module.css';
import FilterAltIcon from "@mui/icons-material/FilterAlt";

function FilterBox() {
  return (
    <div className = {styles.filterBox}>
      <FilterAltIcon/>
      <h3>Filters</h3>
    </div>
  )
}

export default FilterBox
