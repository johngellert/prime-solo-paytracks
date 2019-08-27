
export default ((arrayOfFields) => {
    let count = 0;
    for(const field of arrayOfFields) {
        if (field === null || field === '') {
            count +=1;
        }
    }
    if (count === 0){
        return true;
    }
    else {
        return false;
    }
});