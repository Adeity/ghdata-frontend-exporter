function validateInput(username, password) {
    validateUsername(username)
    validatePassword(password)
}

function validateUsername(username) {
   validateLength(username, "Uživatelské jméno")
}


function validatePassword(password) {
    validateLength(password, "Heslo");
}

function validateLength(input, inputName) {
    if (input.length < 1) {
        throw new Error(inputName + " je příliš krátké!")
    }
    return input.length >= 1;

}

export {validateInput}