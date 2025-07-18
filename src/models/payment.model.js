const { DataTypes } = require('sequelize');
const { createSequelizeInstance } = require('infra-lib/db/sequelize');

const sequelize = createSequelizeInstance();

const Payment = sequelize.define('Payment', {
    id: { type: DataTypes.UUID, primaryKey: true },
    merchantId: { type: DataTypes.UUID, allowNull: false },
    customerId: { type: DataTypes.UUID, allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    product: { type: DataTypes.STRING },
    status: {
        type: DataTypes.ENUM('created', 'completed', 'failed'),
        allowNull: false,
        defaultValue: 'created',
    },
    idempotencyKey: { type: DataTypes.STRING, unique: true },
});

// Ensure the DB schema is up to date
(async () => await sequelize.sync())();

module.exports = Payment;
