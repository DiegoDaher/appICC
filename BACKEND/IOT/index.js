const app = require('./src/app');

const config = {
    port: process.env.PORT || 3005,
};

app.listen(config.port, () => {
    console.log(`Servidor corriendo en el puerto ${config.port}`);
});
