const app = require('./src/app');

const config = {
    port: 3000
};

app.listen(config.port, () => {
    console.log(`Servidor corriendo en el puerto ${config.port}`);
});
