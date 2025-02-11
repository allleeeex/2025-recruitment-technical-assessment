import styles from '../styles/UtilityBar.module.css';
import FilterBox from './FilterBox';
import SearchBar from './Searchbar';
import SortBox from './SortBox';

function UtilityBar({ setSearchTerm }: { setSearchTerm: (searchTerm: string) => void }) {
  return (
    <div className = {styles.utilityBar}>
        <FilterBox/>
        <SearchBar setSearchTerm={setSearchTerm}/>
        <SortBox/>
    </div>
  )
}

export default UtilityBar
