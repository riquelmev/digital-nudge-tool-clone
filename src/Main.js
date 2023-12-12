import App from './App';

import { Route, Routes, useParams} from "react-router-dom"



function Main() {
    // console.log(useParams())

    return (
        <Routes>
        <Route path="/1/:id" element={<App chatgpt={false} popup={false} rag={false} />} />
        <Route path="/2/:id" element={<App chatgpt={true} popup={false} rag={false} />} />  
        <Route path="/3/:id" element={<App chatgpt={false} popup={true} rag={false} />} />
        <Route path="/4/:id" element={<App chatgpt={false} popup={false} rag={true} />}/>
      </Routes>
      );
  }

  export default Main;