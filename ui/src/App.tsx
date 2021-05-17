import React, {useState, useEffect} from 'react'
import ListView from './components/listView'
import CardView from './components/cardView'

import styles from './App.scss';

import { useDispatch, useSelector } from "react-redux";
import { sagaActions } from './redux/sagaActions'
import { selectFetch } from './components/listSlice'

type DeptProfile = {
  id: number
  deptId: number
  name: string
  description: string
  email: string
  first_name: string
  last_name: string
  title: string
  imageUrl: string
}
 
const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const [radio, setRadio] = useState('name')
  const [view, setView] = useState(false)

  const data: DeptProfile[] = useSelector(selectFetch);
  const dispatch = useDispatch();

  useEffect (() => {
      dispatch({ type: sagaActions.FETCH_DATA_SAGA })
  }, [])

  let sorted: DeptProfile[] = data.slice().sort((a,b) => {
      if (radio === 'name') {
        var nameA = a.last_name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.last_name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      } 

      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
  })

  let filter = sorted.filter((d: DeptProfile) => 
                    d.first_name.toLowerCase().includes(searchValue.toLowerCase()) || 
                    d.last_name.toLowerCase().includes(searchValue.toLowerCase()) || 
                    d.email.toLowerCase().includes(searchValue.toLowerCase()) || 
                    d.title.toLowerCase().includes(searchValue.toLowerCase()) || 
                    d.name.toLowerCase().includes(searchValue.toLowerCase()) || 
                    d.description.toLowerCase().includes(searchValue.toLowerCase()))

  return (
    <div>
      <div className={styles.body}>
        <div className={styles.search}>
          <input type='search' placeholder='Search' onChange={(e) => {
            setSearchValue(e.target.value)
          }}/>
        </div>
        <hr />
        <form className={styles.radials}>
          <input type="radio" value="name" name="name" checked={radio === 'name'} onChange={() => setRadio('name')} />
          <label htmlFor="name">Sort by Name</label>
          <input type="radio" value="dept" name="dept" checked={radio === 'dept'} onChange={() => setRadio('dept')} />
          <label htmlFor="dept">Sort by Department</label>
          <div className={styles.view}>
            <input type="radio" value="view" name="view" checked={view} onClick={() => setView(!view)} />
            <label htmlFor="dept">Card View</label>
          </div>
        </form>

        {view ? <CardView data={filter} /> : <ListView data={filter} /> }
      </div>
      <div className={styles.footer}></div>
    </div>
  )
}
 
export default App;