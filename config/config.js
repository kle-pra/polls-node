module.exports = {
  dbUrl: process.env.NODE_ENV === 'production' ? "mongodb://polls:polls@ds036617.mlab.com:36617/polls" : "mongodb://localhost:27017/polls"
}