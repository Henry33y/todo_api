import { Router } from "express";
import { createNewTodo, deleteTodo, getAllTodos, updateTodo } from "../controllers/todo.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const todoRouter = Router()

todoRouter.get('/todos', requireAuth, getAllTodos)
todoRouter.post('/todos',requireAuth, createNewTodo)
todoRouter.put('/todos/:id',requireAuth, updateTodo)
todoRouter.delete('/todos/:id',requireAuth, deleteTodo)

export default todoRouter