import { createResource, type Component, For } from 'solid-js';

import Header from './common/Header';
import { Route, Router, Routes } from '@solidjs/router';
import Home from './pages/Home';
import NewCupcake from './pages/NewCupcake';
import Toast from './common/Toast';
import UpdateCupcake from './pages/UpdateCupcake';
import styles from './App.module.css'
const App: Component = () => {
  return (
    
      <Router>
        <div class={styles.app}>
          <Header></Header>
          <Toast></Toast>
          <Routes>

            <Route path={"/"} component={Home}></Route>
            <Route path={"/new-cupcake"} component={NewCupcake}></Route>
            <Route path={"/cupcakes/:id"} component={UpdateCupcake}></Route>

          </Routes>
        </div>
      </Router>
      
    
  );
};
const attr = '<a target="_blank" href="https://icons8.com/icon/19295/star">Star</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>'
export default App;
