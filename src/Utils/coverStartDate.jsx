const  convertStartDate = (date) => {
    const newdate = new Date(date);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };
    return newdate.toLocaleDateString('en-US', options);
}


export default convertStartDate;