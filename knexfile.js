module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './comments.db'
    },
    useNullAsDefault: true
  }
};