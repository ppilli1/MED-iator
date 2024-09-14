import Dashboard from "../sections/Dashboard"
import MD from "../sections/MD"
import OR from "../sections/OR"
import {Routes, Route} from "react-router-dom"

const Routers = () => {
  return <Routes>
    <Route path = "/" element = {<Dashboard/>}/>
    <Route path = "/MD" element = {<MD/>}/>
    <Route path = "/OR" element = {<OR/>}/>
  </Routes>
}

export default Routers