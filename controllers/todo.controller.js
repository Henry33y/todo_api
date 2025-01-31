import mongoose from "mongoose";
import Todo from "../models/todo.model.js";

export const getAllTodos = async (req, res) => {
    try{
        const { page, limit } = req.query
        if(!page || !limit){
            return res.status(400).json({success: false, error: "Page and Limit must be provided"})
        }
        const pageNum = Number(page)
        const limitNum = Number(limit)
        
        const skip = (pageNum - 1) * limitNum

        const todos = await Todo.find({}).skip(skip).limit(limitNum)

        const total = await Todo.countDocuments()

        res.status(200).json({ success: true, data: todos, page: pageNum, limit: limitNum, total })
    }catch(error){
        console.log("Error: ", error);
        return res.status(200).json({success: false, error: error.message})
    }
}

export const createNewTodo = async (req, res) => {
    try{
        const todo = req.body

        const newTodo = new Todo(todo)
        await newTodo.save()
        res.status(201).json({ success: true, data: newTodo })
    }catch(error){
        console.log("Error: ", error);
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const updateTodo = async (req, res) => {
    const { id } = req.params
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({ success: false, error: "Invalid todo id"})
        }        
        const existingTodo = Todo.findById(id)

        if(!existingTodo){
            return res.status(404).json({ success: false, error: "Todo does not exist"})
        }

        const newTodo = {
            title: req.body.title || existingTodo.title,
            description: req.body.description || existingTodo.description
        }

        const updatedTodo = await Todo.findByIdAndUpdate(id, newTodo, {new: true})
        
        res.status(200).json({ success: true, data: updatedTodo })
    }catch(error){
        console.log("Error: ", error);
        return res.status(500).json({ success: false, error: error.message })
    }
}

export const deleteTodo = async (req, res) => {
    const { id } = req.params

    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({ success: false, error: "Invalid todo id"})
        }

        const deletedTodo = await Todo.findByIdAndDelete(id)

        if(!deletedTodo){
            return res.status(404).json({success: false, error: "Todo does not exist"})
        }
        res.status(200).json({ success: true, data: deletedTodo })
    }catch(error){
        console.log("Error: ", error);
        return res.status(500).json({ success: false, error: error.message })
    }
}