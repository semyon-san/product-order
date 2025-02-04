export function convertObjectForUrlSearchParams(obj: Record<string, any>): Record<string, string> {
    const result: Record<string, string> = {}

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key]

            if (typeof value === 'boolean') {
                result[key] = value ? '1' : '0'
            } else {
                result[key] = String(value)
            }
        }
    }

    return result
}