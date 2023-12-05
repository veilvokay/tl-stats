export const trimStatName = (name: string) => {
    return name.slice(-3);
}

export const getDeepKeys = (obj: any) => {
    let keys: string[] = [];
    for(var key in obj) {
        keys.push(key);
        if(typeof obj[key] === "object") {
            var subkeys = getDeepKeys(obj[key]);
            keys = keys.concat(
                subkeys.map(
                    function(subkey) {
                        return key + "." + subkey;
                    }
                )
            );
        }
    }
    return keys;
}

export const getDeepValuesForKeys = (keys: string[], obj: any) => {
    const keyValuePairs = {a: '123'};
    keys.forEach(key => {
        // {key, ...keyValuePairs}
    })
    return keyValuePairs;
}
