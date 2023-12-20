import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../Utils/axios";
import { enqueueSnackbar } from "notistack";
import { setUser } from "../redux/auth/authSlice";
import UploadFile from "../Utils/upload";
import UploadLoader from "./loader/UploadLoader";

const EditProfile = ({ close }) => {
    const user = useSelector(state => state.auth);
    const [name, setName] = useState(user.user.name);
    const [description, setDescription] = useState(user.user.description);
    const [picture, setPicture] = useState(user.user.picture);
    const dispatch = useDispatch();
    const [uploadLoading, setUploadLoading] = useState(false)


    const handleUpdate = async () => {
        if (!name || !picture || !description) {
            return enqueueSnackbar("All fields are requried", { variant: 'error' })
        }
        axios.post('/user/update-profile', {
            name,
            description,
            picture
        }, {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }).then((response) => {
            dispatch(setUser(response.data.user))
            close(false)
            enqueueSnackbar("profile updated successfully", { variant: 'success' });
        }).catch((error) => {
            console.log(error)
            enqueueSnackbar(error.message, { variant: 'error' })
        });
    }

    const ref = useRef();

    const HandleClickOutSide = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            close(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', HandleClickOutSide, true);
        document.body.style.overflowY = 'hidden'
        return () => {
            document.removeEventListener('click', HandleClickOutSide, true);
            document.body.style.overflowY = 'scroll'
        }
    }, []);



    const HandleImage = async (e) => {
        const file = e.target.files[0];
        setUploadLoading(true)
        const fileUrl = await UploadFile(file);
        setPicture(fileUrl)
        setUploadLoading(false)
    }







    return (
        <div className="h-screen w-screen absolute top-0 left-0 flex items-center justify-center bg-[#80808085]">
            <div ref={ref} className="md:w-[400px] gap-y-3 h-fit bg-white flex flex-col items-center p-4">
                <div className="w-[100px] rounded-full overflow-hidden h-[100px]">
                    <label className="w-full h-full cursor-pointer" htmlFor="fileUploader">
                        <img className="w-full h-full object-cover" src={picture} alt="" />
                    </label>
                    <input
                        hidden
                        onChange={HandleImage}
                        id="fileUploader"
                        type="file"
                        accept=".jpg,.png,.svg"
                    />
                </div>
                <div className="w-[100%] mt-5">
                    <p>name :</p>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 w-full  outline-red-300 rounded-md border border-gray-300" type="text" />
                </div>
                <div className="w-[100%] mt-5">
                    <p>description :</p>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="p-2 w-full  outline-red-300 rounded-md resize-none border border-gray-300" type="text" />
                </div>
                <button
                    onClick={handleUpdate}
                    className="button">Save Info</button>
            </div>
            {uploadLoading && <UploadLoader />}
        </div>
    )
}

export default EditProfile;