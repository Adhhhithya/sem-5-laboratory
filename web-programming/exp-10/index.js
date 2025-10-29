const express = require('express');
const app = express();
const PORT = process.env.PORT||3000;

app.use(express.json());

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

//TO DO List
let todos=[];
//GET /todos - Get all todos
app.get('/todos',(req,res)=>{
    res.json(todos);
})

//GET /todos/:id - Get specific todo by ID
app.get('/todos/:id',(req,res)=>{
    const todoId = req.params.id;
    const todo = todos.find(todo=>todo.id===todoId);
    if(!todo){
        return res.status(404).json({Error:'Todo not found'});
    }
    res.json(todo);
})

//POST /todos - Create a new todo
app.post('/todos',(req,res)=>{
    const newTodo = req.body;
    todos.push(newTodo);
    res.status(201).json(newTodo);
})

//PUT /todos/:id - Update a todo by ID
app.put('/todos/:id',(req,res)=>{
    const todoId = req.params.id;
    const updatedTodo = req.body;
    const todoIndex = todos.findIndex(todo=>todo.id === todoId);
    if(todoIndex === -1){
        return res.status(404).json({Error:'Todo not found'});
    }
    todos[todoIndex]= {...todos[todoIndex],...updatedTodo};
    res.json(todos[todoIndex]);
});

//DELETE /todos/:id - Delete a todo by ID
app.delete('/todos/:id',(req,res)=>{
    const todoId= req.params.id;
    todos = todos.filter(todo=> todo.id !== todoId);
    res.sendStatus(204);
});

//Error Handling
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({error:'Something went wrong!'});
});