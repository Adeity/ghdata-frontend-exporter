const baseUrl = "http://localhost:8080"

const loginUrl = baseUrl + "/j_spring_security_check"
const logoutUrl = baseUrl + "/j_spring_security_logout"
const changePasswordUrl = baseUrl + "/api/security/change-password"
const filterSleepsUrl = baseUrl + "/garmin/sleeps/filter"
const checkAuthorizedUrl = baseUrl + "/api/security/check-authorized"
const dummyUrl = baseUrl + "/api/security/dummy"

export {loginUrl, changePasswordUrl, filterSleepsUrl, checkAuthorizedUrl, dummyUrl, logoutUrl}