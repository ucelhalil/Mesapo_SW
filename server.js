import app from './app.js';



const StartServer = async () => {
    try {
        const PORT = process.env.SW_PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

StartServer();