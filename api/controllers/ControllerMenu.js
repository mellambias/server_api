const Controller = require('./Controller');

class ControllerMenu extends Controller {
    constructor(model) {
        super(model);
        this.model = model;
    }

    async getMenuItems(menuName = {}) {
        try {
            const result = [];
            const pila = [];
            const pilaName = [];
            let current = {};
            let temp = {};
            let children = [];
            const root = await this.model.findOne({
                where: { name: menuName },
            });
            current = root;
            do {
                pila.push(current);
                pilaName.push(current.name);
                do {
                    children = await current.getChildren();
                    if (children.length) {
                        children.forEach(element => {
                            pila.push(element);
                            pilaName.push(element.name);
                        });
                        result.push(current.name);
                        current = pila.pop();
                        pilaName.pop();
                    } else {
                        result.push(current.name);
                        current = pila.pop();
                        pilaName.pop();
                    }
                } while (current != undefined || pila.length > 0);
                if (pila.length != 0) {
                    temp = pila.pop();
                    console.log(temp.dataValues);
                    current = pila.pop();
                }
            } while (current != undefined || pila.length > 1); //Si `actual` es distinto de NULL o la pila no está vacía, ir al paso 3
            return result;
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = ControllerMenu;
