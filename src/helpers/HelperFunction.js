export const convertDate = (dateString) => {
    let stringArray = new Date(dateString).toDateString().split(" ")
    stringArray.shift()
    let hold = stringArray[0]
    stringArray[0] = stringArray[1]
    stringArray[1] = hold
    return stringArray.join(" ")
}
