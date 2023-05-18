declare var _env_: {
    PUBLIC_PATH?: string
}
function getEnvConfig() {
    return _env_ || {}
}

export function getPublicPath() {
    return getEnvConfig().PUBLIC_PATH
}
