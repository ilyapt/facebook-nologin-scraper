enum Gender {
    m = 'm',
    f = 'f',
    u = 'u' // Unknown
}

export const getGenderFromName = (name: string): Gender => {
    const nameParts = name.trim().split(' ').filter(e => e.length);
    return nameParts.length ? (nameParts[0].endsWith('a') ? Gender.f : Gender.m) : Gender.u;
}
