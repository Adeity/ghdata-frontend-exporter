function validateInput(username, password) {
    validateUsername(username)
    validatePassword(password)
}

function validateUsername(username) {
   validateLength(username, "Uzivatelske jmeno")
}


function validatePassword(password) {
    validateLength(password, "Heslo");
}

function validateLength(input, inputName) {
    if (input.length < 1) {
        throw new Error(inputName + " je prilis kratke!")
    }
    return input.length >= 1;

}

export {validateInput}