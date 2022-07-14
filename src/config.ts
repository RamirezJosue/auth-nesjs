import { registerAs } from "@nestjs/config";

export default registerAs('config', () => {
    return {
        port: process.env.PORT,
        dbCnnString: process.env.DB_CNN_STRING,
        jtwKey: process.env.JWT_KEY,
        rtKey: process.env.RT_KEY
    }
});