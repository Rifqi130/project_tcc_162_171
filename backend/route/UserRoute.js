import express from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controller/UserController.js";

const router = express.Router();

// CRUD Users
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;