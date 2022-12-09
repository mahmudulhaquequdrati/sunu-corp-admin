import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./components/Details";
import Home from "./components/Home";
import Notification from "./components/Notification";
import SingleDetails from "./components/SingleDetails";
import NotiProvider from "./context/notificationC";

function App() {
  return (
    <NotiProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-lists/:category" element={<Details />} />
          <Route path="/all-lists/category/:id" element={<SingleDetails />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </NotiProvider>
  );
}

export default App;
