

const tasks = [
    {
        id: 1,
        text: 'Groceries',
        day: 'Feb 15',
        reminder: false
    },
    {
        id: 2,
        text: 'Shoe shopping',
        day: 'Feb 15',
        reminder: false
    }
]

const Task = ({tasks}) => {
    
    return (
        <>
          {tasks.map((task) => 
            (<h3 key={task.id}>{task.text}</h3>)
          )}    
        </>
    )
}

export default Task
