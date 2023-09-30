interface ConfigProps {
    port: number;
    mongoUsername: string;
    mongoPassword: string;
    mongoDBName: string;
    accessTokenSecret: string;
}

export const config = (): ConfigProps => ({
    port: parseInt(process.env.PORT, 10) || 5000,
    mongoUsername: process.env.MONGO_USERNAME,
    mongoPassword: process.env.MONGO_PASSWORD,
    mongoDBName: process.env.MONGO_DB,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET
})