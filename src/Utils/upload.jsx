import axios from 'axios';


export default async function UploadFile(image) {
    let url = "";
    const form = new FormData();
    form.append("file", image);
    form.append("upload_preset", 'fiverr-clone');
    form.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);
    await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, form).then((res) => {
        url = res.data.secure_url
        console.log(url)
    }).catch((e) => {
        console.log(e)
    });

    return url;
}