const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const Controller = require('../controllers/Controller');

class ImageService {
    constructor(entity, entityId, models) {
        this.entity = entity;
        this.entityId = entityId;
        this.models = models;
        this.tempPath = 'storage/tmp';
        this.imagePath = 'storage/image';
    }

    async upload(images) {
        Object.values(images).forEach(image => {
            image.forEach(data => {
                console.log('19 image-service: %o', data);
                const originPath = path.join(
                    __dirname,
                    '..',
                    this.tempPath,
                    data.originalname
                );
                const targetPath = path.join(
                    __dirname,
                    '..',
                    this.imagePath,
                    this.entity,
                    `${this.entityId}`,
                    data.fieldname,
                    'original',
                    data.originalname
                );
                console.log('originPath: %o', originPath);
                console.log('targetPath: %o', targetPath);

                fs.mkdir(
                    path.dirname(targetPath),
                    { recursive: true },
                    error => {
                        if (error) {
                            throw new Error(error.message);
                        }
                        // movemos el archivo
                        fs.rename(originPath, targetPath, error => {
                            if (error) {
                                throw new Error(error.message);
                            }
                            // registramos en el modelo originales
                            const imageTarget = sharp(targetPath);
                            imageTarget
                                .metadata()
                                .then(async metadata => {
                                    console.log('Meta %o', metadata);
                                    const toOriginalImage = {
                                        path: targetPath,
                                        entity: this.entity,
                                        entityId: this.entityId,
                                        languageAlias: 'es',
                                        filename: data.originalname,
                                        content: data.fieldname,
                                        mimeType: data.mimetype,
                                        sizeBytes: data.size,
                                        widthPx: metadata.width,
                                        heightPx: metadata.height,
                                    };
                                    const originalImageCtr = new Controller(
                                        this.models.origin
                                    );
                                    try {
                                        const originalImage =
                                            await originalImageCtr.create(
                                                toOriginalImage
                                            );

                                        // Actualiza los directorios
                                        const basePath = path.join(
                                            __dirname,
                                            '..',
                                            this.imagePath,
                                            this.entity,
                                            `${this.entityId}`,
                                            data.fieldname
                                        );
                                        // buscar que formato necesitamos para cada configuración
                                        const configCtr = new Controller(
                                            this.models.setting
                                        );
                                        try {
                                            const configs =
                                                await configCtr.findAll({
                                                    where: {
                                                        entity: this.entity,
                                                    },
                                                });
                                            console.log(
                                                'Configuraciones %o',
                                                configs
                                            );
                                            Object.values(configs).forEach(
                                                config => {
                                                    const currentPath =
                                                        path.join(
                                                            basePath,
                                                            config.grid
                                                        );
                                                    if (
                                                        !fs.existsSync(
                                                            currentPath
                                                        )
                                                    ) {
                                                        fs.mkdirSync(
                                                            currentPath
                                                        );
                                                    }
                                                    imageTarget
                                                        .resize(
                                                            config.widthPx,
                                                            config.heightPx
                                                        )
                                                        .webp({
                                                            quality:
                                                                config.quality,
                                                        })
                                                        .toFile(
                                                            path.join(
                                                                currentPath,
                                                                path.parse(
                                                                    data.filename
                                                                ).name + '.webp'
                                                            )
                                                        )
                                                        .then(
                                                            async imageRedim => {
                                                                console.log(
                                                                    'Registrando la imagen redimensionada'
                                                                );
                                                                const toImageResized =
                                                                    {
                                                                        ...toOriginalImage,
                                                                        imageOriginalId:
                                                                            originalImage.id,
                                                                        imageConfigurationId:
                                                                            config.id,
                                                                        title: 'title',
                                                                        alt: 'alt',
                                                                        path: 'path',
                                                                        grid: config.grid,
                                                                        quality: 100,
                                                                        widthPx:
                                                                            imageRedim.width,
                                                                        heightPx:
                                                                            imageRedim.height,
                                                                        size: imageRedim.size,
                                                                        content:
                                                                            imageRedim.format,
                                                                    };
                                                                const redimensionCtr =
                                                                    new Controller(
                                                                        this.models.resize
                                                                    );
                                                                try {
                                                                    await redimensionCtr.create(
                                                                        toImageResized
                                                                    );
                                                                } catch (error) {
                                                                    throw error;
                                                                }
                                                            }
                                                        )
                                                        .catch(error => {
                                                            console.log(
                                                                '110- image-service error %o',
                                                                error
                                                            );
                                                        });
                                                }
                                            );
                                        } catch (error) {
                                            console.log(error);
                                        }
                                    } catch (error) {
                                        throw error;
                                    }
                                })
                                .catch(e => {
                                    console.log('Error %o', e);
                                });
                        });
                    }
                );
            });
        });
    }
}

module.exports = ImageService;
