const Controller = require('./Controller');

class ControllerMenu extends Controller {
    constructor(model) {
        super(model);
        this.model = model;
    }

    async getMenuItems(menuName = {}) {
        try {
            const mapChildren = new Map();
            const root = await this.model.findOne({
                where: { name: menuName },
                raw: true,
            });
            if (Object.keys(root).length) {
                mapChildren.set(root.id, { ...root, children: [] });
                const children = await this.model.findAll({
                    order: [['id', 'ASC'], ['parentId'], ['order', 'ASC']],
                    raw: true,
                });
                children.forEach(element => {
                    mapChildren.set(element.id, {
                        ...element,
                        children: [],
                    });
                });
                mapChildren.forEach((value, key, map) => {
                    if (value?.parentId) {
                        map.get(value.parentId).children.push(value);
                    }
                });
            }
            return mapChildren.get(root.id);
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = ControllerMenu;
