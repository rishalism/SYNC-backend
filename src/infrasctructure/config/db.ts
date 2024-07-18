import mongoose from "mongoose"

const connectionURL = process.env.MONGO_URL || ''

if (!connectionURL) {
    console.log('mongo connection url is not set');
    process.exit(1)

}

const connectDb = async () => {
    try {
        await mongoose.connect(connectionURL)
        console.log(`DB connected to ${connectionURL}`);
    } catch (error) {
        console.log(`failed to connect to mongodb database ${error}`);
        process.exit(1)

    }
}

export default connectDb