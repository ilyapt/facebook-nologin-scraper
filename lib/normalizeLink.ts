export const normalizeFbLink = (link:string):string => {
    return link.replace(/www\.facebook/, 'facebook').replace(/m\.facebook/, 'facebook')
}
