const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

async function main() {
    const conn = await mongoose.connect(process.env.MONGOOSE_URL);
    console.log('Mongodb Connected:', conn.connection.host);
};

main().catch(err => console.log(err));