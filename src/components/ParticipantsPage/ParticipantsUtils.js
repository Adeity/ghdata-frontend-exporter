export function getActiveDescription(allowed, deregistrationTime) {
    if (allowed === false && deregistrationTime === undefined) {
        return {
            name: "Nedokončil registraci",
            description: "Nedokončil registraci: Započal registraci, ale nedokončil ji udělením přistupu k datům."
        }
    } else if (allowed === false && deregistrationTime !== undefined) {
        return {
            name: "Odhlášen",
            description: "Odhlášen: Přidělený přístup k datům ze zařízení byl odebrán."
        }
    } else if (allowed === true) {
        return {
            name: "Aktivní",
            description: "Aktivní: Přidělený přístup k datům ze zařizení je aktivní."
        }
    }
    return "";
}