import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.POSTGRES_PRISMA_URL
        }
    }
}).$extends(withAccelerate())


export default prisma;
