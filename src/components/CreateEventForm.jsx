import { Globe, MapPin, Money } from "@phosphor-icons/react";
import { useState } from "react";
import { enqueueSnackbar } from 'notistack';
import UploadFile from "../Utils/upload";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import axios from "../Utils/axios";
import "react-datepicker/dist/react-datepicker.css";
import UploadLoader from "./loader/UploadLoader";



const categories = [
    "Entertainment",
    "Networking",
    "Education",
    "Social",
    "Sports",
    "Music",
    "Technology",
]

const CreateEventForm = () => {

    const navigate = useNavigate();
    const user = useSelector(state => state.auth);
    const [uploadLoading, setUploadLoading] = useState(false)

    const [image, setImage] = useState(null);
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())


    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        category: "",
        image: "",
        startDate: null,
        endDate: null,
        price: "",
        location: "",
        url: ""
    });


    const setData = (stateName, value) => {
        const data = eventData;
        data[stateName] = value
        setEventData(data);
    };





    const HandlSubmit = () => {
        // setting dates
        setData("startDate", startDate);
        setData("endDate", endDate);

        for (let keys in eventData) {
            if (!eventData[keys]) {
                return enqueueSnackbar("all fields are required", { variant: 'error' });
            }
        }

        if (eventData.startDate > eventData.endDate) {
            return enqueueSnackbar("end date should be greater than start data", { variant: 'error' });
        }

        axios.post('/event/create', eventData, {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }).then((response) => {
            enqueueSnackbar(response.data.message, { variant: 'success' });
            navigate('/my-events')
        }).catch((error) => {
            enqueueSnackbar(error.message, { variant: 'error' })
        })
    }


    const HandleImage = async (e) => {
        const file = e.target.files[0];
        setUploadLoading(true)
        setImage(file)
        const fileUrl = await UploadFile(file);
        setData('image', fileUrl);
        setUploadLoading(false)
    }


    return (
        <div className="w-full bg-gray-100 p-4 mt-[50px]">
            <div className="w-[90vw] md:w-[80vw] mx-auto py-6">
                <div className="w-full gap-4 flex items-center max-md:flex-col">
                    <div className="w-[100%] md:w-[50%]">
                        <p>Title :</p>
                        <input
                            onChange={(e) => {
                                setData("title", e.target.value)
                            }}
                            placeholder="Enter events title.."
                            className="p-4 w-full mt-3 outline-red-300 rounded-md border border-gray-300" type="text" />
                    </div>
                    <div className="w-[100%] md:w-[50%]">
                        <p>Category :</p>
                        <select
                            onChange={(e) => {
                                setData("category", e.target.value)
                            }}
                            className="p-4 w-full mt-3 outline-red-300 rounded-md border border-gray-300"
                            id="">
                            <option value="">Select a category</option>
                            {
                                categories.map((item, index) => {
                                    return (
                                        <option
                                            className="p-4"
                                            value={item}
                                            key={index}>
                                            {item}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="w-full mt-7 gap-4 flex items-center max-md:flex-col">
                    <div className="w-[100%] md:w-[50%] overflow-hidden h-[350px]">
                        <p>Description :</p>
                        <textarea
                            onChange={(e) => {
                                setData("description", e.target.value)
                            }}
                            placeholder="Tell us somthing about your event.."
                            className="p-4 resize-none w-full mt-3 outline-red-300  h-[300px] rounded-md border border-gray-300" type="text" />
                    </div>
                    <div className="w-[100%] md:w-[50%] h-[350px]">
                        <p>Image :</p>
                        <div className="h-[300px] mt-3 bg-white rounded-md border border-gray-300">
                            <label
                                className="w-full h-full cursor-pointer container"
                                htmlFor="fileUploader">
                                {
                                    image ? (
                                        <img
                                            className="w-full h-full object-cover"
                                            src={URL.createObjectURL(image)} alt="" />
                                    )
                                        :
                                        <p>select from computer</p>
                                }
                            </label>
                            <input
                                hidden
                                onChange={HandleImage}
                                id="fileUploader"
                                type="file"
                                accept=".jpg,.png,.svg"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full gap-4 mt-7 flex items-center max-md:flex-col">
                    <div className="w-[100%] md:w-[50%]">
                        <p>Start Date :</p>
                        <DatePicker
                            className="p-4 w-fit mt-3 outline-red-300 rounded-md border border-gray-300"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            showTimeSelect
                            timeIntervals={15}
                            timeCaption="Start Time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            on
                        />
                    </div>
                    <div className="w-[100%] md:w-[50%]">
                        <p>End Date :</p>
                        <DatePicker
                            className="p-4 w-full mt-3 outline-red-300 rounded-md border border-gray-300"
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            showTimeSelect
                            timeIntervals={15}
                            timeCaption="End Time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                        />
                    </div>
                </div>
                <div className="w-full gap-4 mt-7 flex items-center max-md:flex-col">
                    <div className="w-[100%] md:w-[50%]">
                        <p className="flex items-center gap-2">
                            <Money size={20} weight="fill" />
                            Price :
                        </p>
                        <input
                            onChange={(e) => {
                                setData("price", e.target.value)
                            }}
                            placeholder="Enter events price.."
                            className="p-4 w-full mt-3 outline-red-300 rounded-md border border-gray-300"
                            type="number" />
                    </div>
                    <div className="w-[100%] md:w-[50%]">
                        <p className="flex items-center gap-2">
                            <MapPin size={20} weight="fill" />
                            Location :
                        </p>
                        <input
                            onChange={(e) => {
                                setData("location", e.target.value)
                            }}
                            placeholder="Enter events location.."
                            className="p-4 w-full mt-3 outline-red-300 rounded-md border border-gray-300"
                            type="address" />
                    </div>
                </div>
                <div className="w-full gap-4 mt-7 flex items-center max-md:flex-col">
                    <div className="w-[100%] md:w-[50%]">
                        <p className="flex items-center gap-2">
                            <Globe size={20} weight="fill" />
                            Url :
                        </p>
                        <input
                            onChange={(e) => {
                                setData("url", e.target.value)
                            }}
                            placeholder="Enter events price.."
                            className="p-4 w-full mt-3 outline-red-300 rounded-md border border-gray-300"
                            type="text" />
                    </div>
                </div>
                <button
                    onClick={HandlSubmit}
                    className="mt-8 p-4 rounded-md container font-bold text-white bg-red-500">Create</button>
            </div>
            {uploadLoading && <UploadLoader />}
        </div>
    )
}

export default CreateEventForm;