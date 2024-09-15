import Dashboard from "../sections/Dashboard"
import MD from "../sections/MD"
import OR from "../sections/OR"
import PG from "../sections/PG"
import {Routes, Route} from "react-router-dom"

const Routers = () => {
  return <Routes>
    <Route path = "/" element = {<Dashboard/>}/>
    <Route path = "/MD" element = {<MD/>}/>
    <Route path = "/OR" element = {<OR/>}/>
    <Route path = "/PG" element = {<PG/>}/>
  </Routes>
}

export default Routers