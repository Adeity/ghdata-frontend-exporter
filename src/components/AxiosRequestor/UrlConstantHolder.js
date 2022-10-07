const baseUrl = process.env.REACT_APP_BASE_URL

const loginUrl = baseUrl + "/j_spring_security_check"
const logoutUrl = baseUrl + "/j_spring_security_logout"
const changePasswordUrl = baseUrl + "/api/security/change-password"
const filterSleepsUrl = baseUrl + "/garmin/sleeps/filter"
const checkAuthorizedUrl = baseUrl + "/api/security/check-authorized"
const dummyUrl = baseUrl + "/api/security/dummy"
const getActiveResearchNumbersUrl = baseUrl + "/device/active-research-numbers"
const exportSleepsUrl = baseUrl + "/garmin/sleeps/export"

export {
    loginUrl,
    changePasswordUrl,
    filterSleepsUrl,
    checkAuthorizedUrl,
    dummyUrl,
    logoutUrl,
    getActiveResearchNumbersUrl,
    exportSleepsUrl
}