import styles from './Header.module.css'
import { A } from '@solidjs/router'
const Header = () => {
  return <nav class={styles.nav}>
    <A href='/' end={true}>Home</A>
    <A href='/new-cupcake' end={true}>Add new Cupcake</A>
  </nav>
}

export default Header