import { useContext } from "react"
import { CartContext } from "../utils/CartContext"

const useCart = () => {
    return useContext(CartContext)
}

export default useCart