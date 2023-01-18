const Controller = require('../controllers/ControllerImageConfig');
const RouterApp = require('./RouterApp');
const cors = require('cors');
const corsOptions = require('../utils/serverCors');
const ImageService = require('../services/image-service');

class ImageSettingRouter extends RouterApp {
    constructor(
        model,
        middlewares = {},
        origin,
        resize,
        setting,
        controllerClass = Controller
    ) {
        super(model, middlewares, controllerClass);
        this.models = {
            origin,
            resize,
            setting,
        };
        return this;
    }

    configRouter() {
        if (this.middlewares?.all.length) {
            this.router.use(this.middlewares.all);
        }
        this.router.use(cors(corsOptions));
        this.router.post('/', this.middlewares.post, async (req, res) => {
            const imageService = new ImageService('slider', 1, this.models);
            imageService.upload(req.files);
            res.status(200).json({
                status: 200,
                message: 'Processed images with success',
            });
        });
    }
}
module.exports = ImageSettingRouter;
