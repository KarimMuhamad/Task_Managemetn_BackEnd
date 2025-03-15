const prisma = require('../config/db')

const getAllTask = async (req, res) => {
    try {
    const userId = req.user.id

    const task = await prisma.user.findUnique({
        where: {id: userId},
        select: {tasks: true}
    })

    res.status(200).json({userId, task})

    } catch (err) {
        res.status(500).json({msg: 'Server Error', err})
    }
}

const createTask = async (req, res) => {
    try {
        const userId = req.user.id
        const {title, description} = req.body

        if(!title) return res.status(400).json({msg: 'Judul harus di isi'})
        
        const task = {title, description}

        const updateUser = await prisma.user.update({
            where: {id: userId},
            data: {
                tasks: {push: (task)},
            },
            select: {tasks: true}
        })

        res.status(200).json({
            msg: 'Task Succes crated',
            updateUser
        })

        
    } catch (err) {
        res.status(500).json({msg: 'Internal server error'})
    }
}

const updateStatus = async (req, res) => {
    try {
        const userId = req.user.id
        const {title} = req.query

        const userTask = await prisma.user.findUnique({
            where: {id: userId},
            select: {tasks: true}
        })
        
        let taskDone

        const updateTask = userTask.tasks.map(tasks => {
            if (tasks.title === title) {
                taskDone = tasks.title
                return {...tasks, status: 'done'}
            }

            return tasks
            
        })
                
        await prisma.user.update({
            where: {id: userId},
            data: {tasks: updateTask}
        })

        res.status(200).json({
            msg: `succes task done ${taskDone}`,
        })

    } catch (err) {
        res.status(500).json({msg: 'Internal server error', err})
    }
}

const deleteTask = async (req, res) => {
    try {
        const userId = req.user.id
        const {title} = req.query
        
        const userTask = await prisma.user.findUnique({
            where: {id: userId},
            select: {tasks: true}
        })

        const updateTask = userTask.tasks.filter(tasks => tasks.title !== title)

        await prisma.user.update({
            where: {id: userId},
            data: {tasks: updateTask}
        })
        
        res.status(200).json({
            msg: `succes task done ${title}`,
        })
    
    } catch (err) {
        res.status(500).json({msg : 'Internal Server error', err})
    }
}

module.exports = {
    getAllTask,
    createTask,
    updateStatus,
    deleteTask,
}
