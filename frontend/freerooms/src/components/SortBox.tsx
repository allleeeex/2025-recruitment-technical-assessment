import styles from '../styles/FilterBox.module.css';
import FilterListIcon from "@mui/icons-material/FilterList";

function SortBox() {
  return (
    <div className = {styles.filterBox}>
      <FilterListIcon/>
      <h3>Sort</h3>
    </div>
  )
}

export default SortBox
