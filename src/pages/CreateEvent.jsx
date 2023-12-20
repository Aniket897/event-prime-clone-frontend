import CreateEventForm from "../components/CreateEventForm";
import Divider from "../components/Divider";

const CreateEvent = () => {
    return (
        <div className="pb-[100px] mx-auto">
            <Divider text='Create Event' />
            <CreateEventForm />
        </div>
    )
}

export default CreateEvent;