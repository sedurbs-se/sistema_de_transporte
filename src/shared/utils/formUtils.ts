export const placaVeiculoRegex = /[A-Z]{3}-[0-9][0-9A-Z][0-9]{2}/;

export const normalizePlaca = (value: string | undefined) => {
    if (!value) {
        return ""
    }

    let val = value

    if(isNaN(parseInt(val))) {
        val = val.toUpperCase()
    }

    if(val.length === 4 && !val.includes('-')) {
        val = val.substring(0,3) + '-' + val.substring(3)
    }

    return val;
}
