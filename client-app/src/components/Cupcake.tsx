import { A } from "@solidjs/router";
import { type CupcakeType } from "../types/Cupcake"
import styles from './Cupcake.module.css';
import defaultImage from '../assets/image.svg'
const Cupcake = ({cupcake}: {cupcake: CupcakeType}) => {
  if (cupcake === null)  {
    return <div>No cupcake found.</div>
  }
  return <A href={`/cupcakes/${cupcake.id}`}>
    <div class={styles.cupcake}>
      <img src={cupcake.image} onError={(e) => {(e.target as HTMLImageElement).src = defaultImage}}></img>
      <div>{cupcake.flavor}</div>
      <div>{cupcake.size}</div>
      <div>{cupcake.rating.toFixed(1)}</div>
    </div>
  </A>
}

export default Cupcake