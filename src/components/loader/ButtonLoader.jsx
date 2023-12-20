import { ClipLoader } from "react-spinners"

const ButtonLoader = () => {
  return (
    <div className="container gap-3">
        <ClipLoader size={20} color="white" />
        <p>Loading..</p>
    </div>
  )
}

export default ButtonLoader;