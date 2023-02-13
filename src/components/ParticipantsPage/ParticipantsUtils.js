export function getActiveDescription(allowed, deregistrationTime) {
    if (allowed === false && deregistrationTime === undefined) {
        return "Nedal přístup."
    } else if (allowed === false && deregistrationTime !== undefined) {
        return "Odhlášen"
    } else if (allowed === true) {
        return "Aktivní"
    }
    return "";
}