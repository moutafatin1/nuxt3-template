export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    deleteCookie(event,config.cookieName)

    return null
});
