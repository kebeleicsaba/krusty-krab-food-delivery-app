import { useContext } from "react"
import { UserContext } from "../utils/UserContext"

const useUser = () => {
    return useContext(UserContext)
}

export default useUser