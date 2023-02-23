import prisma from '~/lib/prisma'
export default defineEventHandler(async (_event) => {
    const un = getCookie(_event, 'un')
    const query = getQuery(_event)
    const id = query.id

    const login = await $fetch('/api/checkLogin', { method: 'POST', body: JSON.stringify({ un: un }) })

    if (!login.login) {
        return undefined
    }

    const candidate = await prisma.candidate.findUnique({
        where: { id: parseInt(id as string) },
    })

    return candidate
})