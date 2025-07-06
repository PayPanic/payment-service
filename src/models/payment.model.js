const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
});

const Payment = sequelize.define('Payment', {
    id: { type: DataTypes.UUID, primaryKey: true },
    merchantId: { type: DataTypes.UUID, allowNull: false },
    customerId: { type: DataTypes.UUID, allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    product: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING, defaultValue: 'created' },
    idempotencyKey: { type: DataTypes.STRING, unique: true },
});

(async () => await sequelize.sync())();

module.exports = Payment;
