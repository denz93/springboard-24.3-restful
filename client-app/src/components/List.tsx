import {ParentComponent } from 'solid-js'
import styles from './List.module.css'
const List: ParentComponent = ({children}) => {
  return <div class={styles.list}>
    {children}
  </div>
}
export default List