export const validEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

export const getInitials = (name) => {

    if(!name) return '';

    const nameArray = name.split(' ');
    if(nameArray.length === 1) return (nameArray[0][0]).toUpperCase();
    return (nameArray[0][0] + nameArray[1][0]).toUpperCase();
}

console.log(getInitials('Name'));

export default function helper() {
    // console.log('helper function');
    
}

