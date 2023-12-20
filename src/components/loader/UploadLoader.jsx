import { ClipLoader } from "react-spinners";

const UploadLoader = () => {
    return (
        <div className="w-screen  fixed top-0 left-0 h-screen bg-[#80808072] flex items-center justify-center">
            <div className="w-[200px] p-4 rounded-sm bg-white flex items-center justify-center flex-col">
                <ClipLoader size={20} color="red" />
                <p>Uploading....</p>
            </div>
        </div>
    )
}

export default UploadLoader;