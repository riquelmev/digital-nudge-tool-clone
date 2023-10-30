import App from './App';

import { Route, Routes, useParams} from "react-router-dom"



function Main() {
    // console.log(useParams())

    return (
        <Routes>
        <Route path="/1/:id" element={<App chatgpt={false} popup={false}/>} />
        <Route path="/2/:id" element={<App chatgpt={true} popup={false} />} />  
        <Route path="/3/:id" element={<App chatgpt={false} popup={true} />} />
        <Route path="/4/:id" element={<App chatgpt={true} popup={true} />}/>
      </Routes>
      );
  }

  export default Main;