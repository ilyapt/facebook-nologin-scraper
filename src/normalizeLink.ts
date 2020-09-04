// remove distinguishing among desktop or mobile version
// thanks this function both mobile and desktop links are the same
export const normalizeFbLink = (link:string):string => {
    return link.replace(/www\.facebook/, 'facebook').replace(/m\.facebook/, 'facebook');
};
