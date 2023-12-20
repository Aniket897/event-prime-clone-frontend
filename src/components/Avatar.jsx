
const Avatar = ({ imgUrl }) => {
    return (
        <div className="w-[40px] cursor-pointer rounded-full overflow-hidden h-[40px]">
            <img
                className="w-full h-full object-cover"
                src={imgUrl} alt="" />
        </div>
    )
}

export default Avatar;