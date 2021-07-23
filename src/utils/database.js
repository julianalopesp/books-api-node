const mongoose = require('mongoose');

module.exports = {
    connectDatabase: async () => {
        try {
            const connection = await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            });
            console.log(`MongoDB connected: ${connection.connection.host}`);
        } catch (err) {
            console.log(`Error: ${err.message}`);
            process.exit(1);
        }
    }
};