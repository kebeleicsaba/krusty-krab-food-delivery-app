import { useContext } from "react"
import { LocationContext } from "../utils/LocationContext"

const useLocation = () => {
    return useContext(LocationContext)
}

export default useLocation