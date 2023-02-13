const baseUrl = process.env.REACT_APP_BASE_URL

const loginUrl = baseUrl + "/j_spring_security_check"
const logoutUrl = baseUrl + "/j_spring_security_logout"
const changePasswordUrl = baseUrl + "/api/security/change-password"
const filterSleepsUrl = baseUrl + "/garmin/sleeps/filter"
const checkAuthorizedUrl = baseUrl + "/api/security/check-authorized"
const dummyUrl = baseUrl + "/api/security/dummy"
const allResearchNumbersUrl = baseUrl + "/device/all"
const exportSleepsUrl = baseUrl + "/garmin/sleeps/export"
const participantsInformation = baseUrl + "/device/info"
const invalidParticipants = baseUrl + "/device/invalid-number-candidates"
const updateResearchNumber = baseUrl + "/device/update-research-number"

export {
    loginUrl,
    changePasswordUrl,
    filterSleepsUrl,
    checkAuthorizedUrl,
    dummyUrl,
    logoutUrl,
    allResearchNumbersUrl,
    exportSleepsUrl,
    participantsInformation,
    invalidParticipants,
    updateResearchNumber
}