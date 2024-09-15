
export function generateId(n=10) {
    return btoa(String(Math.random()))
        .replace('MC4', '')
        .replaceAll('=', '')
        .substring(0,n)
}