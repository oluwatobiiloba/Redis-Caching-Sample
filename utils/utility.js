
module.exports = {
    removePathSegments(url) {
        const regex = /^\/[^/]+/;
        const match = url.match(regex);
        return match ? match[0] : url;
    }

}