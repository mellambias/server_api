const Controller = require('./Controller');

class ControllerMenu extends Controller {
    constructor(model) {
        super(model);
        this.model = model;
    }

    async getMenuItems(menuName = {}) {
        try {
            const root = await this.model.findOne({
                where: { name: menuName },
            });
            const children = await root.getChildren();
            console.log(children);
            const item = {
                id: root.id,
                name: root.name,
                customUrl: root.customUrl,
                order: root.order,
                parentId: root.parentId,
                children,
            };

            return item;
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = ControllerMenu;
