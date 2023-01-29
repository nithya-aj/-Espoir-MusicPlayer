const mongoose = require('mongoose')

module.exports = async () => {
    mongoose.set('strictQuery', false)
    try {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Database connected successfully!');
    } catch (error) {
        console.log(error, 'Database refused to connect');
    }
} 