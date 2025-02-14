export const extractLastSegment = (url: any) => {
    const segments = url.split('/')
    return segments[segments.length - 1]
}
