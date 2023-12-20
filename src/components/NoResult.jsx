
const NoResult = ({mainText , subText}) => {
    return (
        <div className="w-[80vw] bg-gray-200 py-[50px] rounded-md mx-auto text-center mt-[100px]">
            <p className="font-bold logo text-3xl pb-5">{mainText}</p>
            <p>{subText}</p>
        </div>
    )
}

export default NoResult;