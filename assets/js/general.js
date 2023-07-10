function IsValuable(str) {
    return str !== null && str !== undefined && str !== "";
}

function CheckValueSetEmpty(str) {
    if (!IsValuable(str)) {
        return "";
    } else {
        return str;
    }
}

function CheckValueSetZero(str) {
    try {
        if (!IsValuable(str)) {
            return 0;
        } else if (isNaN(str)) {
            return 0;
        } else {
            return Number(str);
        }
    } catch (e) {
        return 0;
    }
}