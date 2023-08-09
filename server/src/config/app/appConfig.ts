export default () => ({
    port: parseInt(process.env.PORT, 10) || 8002,
    deploy_origin: process.env.DEPLOY_ORIGIN,
});
