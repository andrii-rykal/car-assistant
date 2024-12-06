import styles from "./App.module.scss";
import { Counter } from "./components/Counter";

function App() {
  return (
    <>
      <h1 className={styles.title}>Hello world!</h1>
      <Counter />
    </>
  )
}

export default App;
