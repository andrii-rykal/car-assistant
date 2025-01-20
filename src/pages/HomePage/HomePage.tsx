import { MainSlider } from "../../components/MainSlider"

export const HomePage = () => {
  return (
    <div>
      <h1>Home page</h1>
      <MainSlider />
      <div style={{
        width: '100%',
        height: '100vh',
        backgroundColor: "#ccc"
      }}></div>
    </div>
  )
}