import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Users = db.define('user', {
    name: DataTypes.STRING,
    asrama: DataTypes.STRING,
}, {
    freezeTableName: true
});

export default Users;

(async () => {
    await db.sync({ alter: true }); 
})();