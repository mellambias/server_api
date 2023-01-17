class Main {
    constructor(param1) {
        this.param = param1;
    }
}

class ExtendToMain extends Main {
    constructor(nombre, tratamiento, sexo) {
        super(nombre);
        this.tratamiento = tratamiento;
        this.sexo = sexo;
    }
}

const main = new Main('Miguel');

console.log(main.param);
console.log(main.sexo);
