import { For, createResource } from "solid-js";
import List from "../components/List";
import Cupcake from "../components/Cupcake";
import { fetchCupcakeList } from "../resouces/cupcake";

const Home = () => {
  const [cupcakeList] = createResource(fetchCupcakeList, {initialValue: []})

  return <>
  
    <List>
        <>
        <For each={cupcakeList()}>{(cupcake) => 
          (<Cupcake cupcake={cupcake}/>)
        }</For>
        </>
      </List>
  </>
}

export default Home;