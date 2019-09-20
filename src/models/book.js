export default (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, { timestamps: true, tableName: 'Book' });
  Book.associate = () => {
  };
  return Book;
};
