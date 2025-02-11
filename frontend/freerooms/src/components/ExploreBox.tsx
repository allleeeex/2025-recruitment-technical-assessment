import buildings from '../data.json';
import styles from '../styles/ExploreBox.module.css';
import DisplayBox from './DisplayBox';

function ExploreBox() {

  return (
    <div className={styles.exploreBox}>
        {buildings.map((building, index) => (
            <DisplayBox building = {building}/>
        ))}
    </div>
  )
}

export default ExploreBox