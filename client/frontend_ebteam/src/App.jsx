import { RouterProvider } from "react-router-dom";
import router from "./route/index.jsx";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen border-t-4 border-secondary">
      <Header></Header>
      <Main>
        <RouterProvider router={router}></RouterProvider>
      </Main>
      <Footer className="mt-auto"></Footer>
    </div>
  );
}

export default App;
