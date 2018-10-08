module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Tasks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      people: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      description: {
        type: Sequelize.TEXT,
      },
      date: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["OnReview", "Open", "Pending", "Done", "Decline"],
      },
      subscrebedPeople: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Tasks");
  },
};
