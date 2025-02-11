import styles from '../styles/SearchBar.module.css';
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

function SearchBar({ setSearchTerm }: { setSearchTerm: (searchTerm: string) => void }) {
  return (
    <div className={styles.searchBar}>
      <TextField 
        placeholder="Search for a building..." 
        variant="outlined"
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>
          }
        }}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
      />
    </div>
  )
}

export default SearchBar
