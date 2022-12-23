const errorList = {
    is_null: {
        es: 'Campo obligatorio',
    },
    notEmpty: {
        es: 'No puede estar vacio',
    },
    isMobilePhone: {
        es: 'Tiene que ser un número de teléfono valido',
    },
    isEmail: {
        es: 'Debe ser un correo electronico valido',
    },
    isUrl: {
        es: 'La ruta no es una URL correcta',
    },
    isMimeType: {
        es: 'No es un tipo Mime valido',
    },
    isIn: {
        es: 'Valor del campo ha de ser:',
    },
    isInt: {
        es: 'El valor tiene que ser entero',
    },
    min: {
        es: 'el valor ha de ser mayor que',
    },
    len: {
        es: 'La longitud del campo ha de estar entre',
    },
    isTime: {
        es: 'El formato de la hora es incorrecto',
    },
    isNif: {
        es: 'El formato del NIF es incorrecto',
    },
    isNifLong: {
        es: 'El formato del NIF es incorrecto',
    },
};
module.exports = errorList;
