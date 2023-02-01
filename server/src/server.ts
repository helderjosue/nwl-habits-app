import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import cors from '@fastify/cors';
import { z } from 'zod'; // to exported ones
import dayjs from 'dayjs';
import { request } from 'http';

const app = Fastify()
const prisma =  new PrismaClient({
    log: ['query']
})

app.register(cors)

/**
 * Metodo HTTP: Get, Post, Put, Patch, Delete
 */
app.post('/habits', async (request) => {

const creatHabitBody = z.object({
    title: z.string(),
    weekDays: z.array(z.number().min(0).max(6))
})

const { title, weekDays } = creatHabitBody.parse(request.body) 

const today = dayjs().startOf('day').toDate();

await prisma.habit.create({
    data: {
        title,
        created_at: today,
        weekDays: {
            create: weekDays.map(weekDay => {
                return {
                    habitId: "",
                    week_day: weekDay,
                    // habitId: ""
                }
            })
        }
    }
})

})

app.get('/hello', async () => {

        const habits = await prisma.habit.findMany({
            where: {
                title: {
                    startsWith: 'Beber'
                }
            }
        })
        return habits
    })

app.get('/day', async(request) => {
    const getDayParms = z.object({
        date: z.coerce.date()
    })
    const { date } = getDayParms.parse(request.query)

    const parsedDate = dayjs(date).startOf('day')

    const weekDay = parsedDate.get('day')


    const possibleHabits = await prisma.habit.findMany({
        where: {
            created_at: {
                lte: date,

            },
            weekDays: {
                some: {
                    week_day: weekDay
                }
            }
        }
    })

    const day = await prisma.day.findUnique({
        where: {
            date: parsedDate.toDate(),
        },
        include: {
            dayHabits: true,
        }
    })

    const completedHabits = day?.dayHabits.map(dayHabit => {
        return dayHabit.habit_id
    })

    return {
        possibleHabits,
        completedHabits,
    }
})

app.listen({
    port:3333
}).then(()=> {
    console.log('HTTP Server is running!')
})