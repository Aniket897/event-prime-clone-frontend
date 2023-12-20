import { PropagateLoader } from "react-spinners";

const MainLoader = () => {
    return (
        <div className="w-screen h-[70vh] flex items-center justify-center">
            <PropagateLoader color="#f35858" />
        </div>
    )
}

export default MainLoader;