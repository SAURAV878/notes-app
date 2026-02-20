const logger = (req, res, next) => {
    const currentTime = new Date().toLocaleTimeString();
    console.log(`[${currentTime}] ${req.method} ${req.url}`);
    next();
}

export default logger;