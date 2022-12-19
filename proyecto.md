# Tablas proyecto

## Sliders

| campo    | tipo    | notNull | Auto | key     | fk  |
| -------- | ------- | ------- | ---- | ------- | --- |
| sliderId | int     | notnull | X    | primary |     |
| nombre   | varchar | notnull | -    | -       |     |

## Language

| campo      | tipo    | notNull | Auto | key     | fk  |
| ---------- | ------- | ------- | ---- | ------- | --- |
| languageId | int     | notnull | X    | primary |     |
| name       | varchar | notnull |      |         |     |
| alias      | char 2  | notnull |      |         |     |

## Locale

| campo         | tipo         | notNull | Auto | key     | fk  |
| ------------- | ------------ | ------- | ---- | ------- | --- |
| localeId      | int          | notnull | X    | primary |     |
| languageAlias | char(2)      | notnull |      |         |     |
| entity        | varchar      | notnull |      |         |     |
| entityKey     | int unsigned | notnull |      |         |     |
| key           | varchar      | notnull |      |         |     |
| value         | varchar      |         |      |         |     |

## ImagenesConfiguracion

| campo               | tipo            | notNull | Auto | key     | fk  | coment                     |
| ------------------- | --------------- | ------- | ---- | ------- | --- | -------------------------- |
| id                  | int             | notnull | X    | primary |     |                            |
| entity              | varchar         | notnull |      |         |     |                            |
| directory           | varchar         | notnull |      |         |     |                            |
| type                | varchar         |         |      |         |     |                            |
| content             | varchar         |         |      |         |     |                            |
| grid                | varchar o ENUM  | notnull |      |         |     | (desktop, mobile, preview) |
| contentAccepted     | varchar         | notnull |      |         |     | (ej: jpg/jpeg/webp)        |
| extensionConversion | varchar(4)      | notnull |      |         |     |                            |
| widthPx             | int(4) unsigned |         |      |         |     |                            |
| heightPx            | int(4) unsigned |         |      |         |     |                            |
| quality             | int(3) unsigned | notnull |      |         |     |                            |

## ImagenesRedimension

| campo                | tipo           |          | notNull | Auto | key     | fk  | coment                     |
| -------------------- | -------------- | -------- | ------- | ---- | ------- | --- | -------------------------- |
| id                   | int            |          | notnull | X    | primary |     |                            |
| imageOriginalId      | int            | unsigned |         |      |         |     |                            |
| imageConfigurationId | int            | unsigned |         |      |         |     |                            |
| title                | varchar(150)   |          | notnull |      |         |     |                            |
| alt                  | varchar        |          | notnull |      |         |     |                            |
| path                 | varchar        |          | notnull |      |         |     |                            |
| entity               | varchar        |          | notnull |      |         |     |                            |
| entityId             | int            |          | notnull |      |         |     |                            |
| languageAlias        | char(2)        |          | notnull |      |         |     |                            |
| filename             | varchar        |          | notnull |      |         |     |                            |
| content              | varchar        |          | notnull |      |         |     |                            |
| mimeType             | varchar        |          | notnull |      |         |     |                            |
| grid                 | varchar o enum |          | notnull |      |         |     | (desktop, mobile, preview) |
| sizeBytes            | int            | unsigned | notnull |      |         |     |                            |
| widthPx              | int(4)         | unsigned |         |      |         |     |                            |
| heightPx             | int(4)         | unsigned |         |      |         |     |                            |
| quality              | int(3)         | unsigned | notnull |      |         |     |                            |

## ImagenesOrigial

| campo         | tipo    |          | notNull | Auto | key     | fk  | coment |
| ------------- | ------- | -------- | ------- | ---- | ------- | --- | ------ |
| id            | int     |          | notnull | X    | primary |     |        |
| path          | varchar |          | notnull |      |         |     |        |
| entity        | varchar |          | notnull |      |         |     |        |
| entityId      | int     |          | notnull |      |         |     |        |
| languageAlias | char(2) |          | notnull |      |         |     |        |
| filename      | varchar |          | notnull |      |         |     |        |
| content       | varchar |          | notnull |      |         |     |        |
| mimeType      | varchar |          | notnull |      |         |     |        |
| sizeBytes     | int     | unsigned | notnull |      |         |     |        |
| widthPx       | int(4)  | unsigned | notnull |      |         |     |        |
| heightPx      | int(4)  | unsigned | notnull |      |         |     |        |

## Fingerprint

| campo       | tipo    |     | notNull | Auto | key     | fk  | coment |
| ----------- | ------- | --- | ------- | ---- | ------- | --- | ------ |
| id          | int     |     | notnull | X    | primary |     |        |
| clientId    | int     |     |         |      |         | X   |        |
| fingerprint | varchar |     | notnull |      |         |     |        |

```js
Fingerprint.belongsTo(models.Cliente, { foreignKey: 'clientId' });
Fingerprint.hasMany(models.Carrito, { foreignKey: 'fingerprintId' });
Fingerprint.hasOne(models.Contacto, { foreignKey: 'fingerprintId' });
```

## ProductosCategoria

| campo  | tipo    |     | notNull | Auto | key     | fk  | coment |
| ------ | ------- | --- | ------- | ---- | ------- | --- | ------ |
| id     | int     |     | notnull | X    | primary |     |        |
| nombre | varchar |     | notnull |      |         |     |        |

```js
ProductosCategoria.hasMany(models.Producto, { foreignKey: 'categoriaId' });
```

## MetodosPago

| campo   | tipo      |     | notNull | Auto | key     | fk  | coment |
| ------- | --------- | --- | ------- | ---- | ------- | --- | ------ |
| id      | int       |     | notnull | X    | primary |     |        |
| nombre  | varchar   |     | notnull |      |         |     |        |
| visible | tinyint 1 |     | notnull |      |         |     |        |

```js
MetodosPago.hasMany(models.Venta, { foreignKey: 'metodoPagoId' });
MetodosPago.hasMany(models.ErroresVenta, { foreignKey: 'metodoPagoId' });
MetodosPago.hasMany(models.Abono, { foreignKey: 'metodoPagoId' });
```

### Ivas

| campo   | tipo      |          | notNull | Auto | key     | fk  | coment |
| ------- | --------- | -------- | ------- | ---- | ------- | --- | ------ |
| id      | int       |          | notnull | X    | primary |     |        |
| tipo    | int(2)    | unsigned | notnull |      |         |     |        |
| vigente | tinyint 1 |          | notnull |      |         |     |        |

```js
Iva.hasMany(models.Producto, { foreignKey: 'ivaId' });
```

#### Cliente

| campo        | tipo        |         | notNull | Auto | key     | fk  | coment                                            |
| ------------ | ----------- | ------- | ------- | ---- | ------- | --- | ------------------------------------------------- |
| id           | int         |         | X       | X    | primary |     |                                                   |
| carritoId    | int         |         |         |      |         | X   | (optativo, para saber si tiene carrito pendiente) |
| nombre       | varchar     | notnull |         |      |         |     |                                                   |
| apellidos    | varchar     | notnull |         |      |         |     |                                                   |
| telefono     | varchar(10) | notnull |         |      |         |     |                                                   |
| email        | varchar     | notnull |         |      |         |     |                                                   |
| poblacion    | varchar     | notnull |         |      |         |     |                                                   |
| codigoPostal | char        | notnull |         |      |         |     |                                                   |
| direccion    | varchar     | notnull |         |      |         |     |                                                   |

```js
Cliente.hasMany(models.Carrito, { foreignKey: 'clienteId' });
Cliente.hasOne(models.Fingerprint, { foreignKey: 'clienteId' });
Cliente.hasMany(models.Venta, { foreignKey: 'clienteId' });
Cliente.hasMany(models.ErroresVenta, { foreignKey: 'clienteId' });
Cliente.hasMany(models.Abono, { foreignKey: 'clienteId' });
```

## Contacto

| campo         | tipo        | notNull | Auto | key     | fk  |
| ------------- | ----------- | ------- | ---- | ------- | --- |
| contactoId    | int         | notnull | X    | primary |     |
| fingerprintId | int         |         | -    | -       | x   |
| nombre        | varchar     | notnull | -    | -       |     |
| apellidos     | varchar     | notnull | -    | -       |     |
| telefono      | varchar(20) | notnull | -    | -       |     |
| email         | varchar     | notnull | -    | -       |     |
| mensaje       | text        | notnull | -    | -       |     |

```js
Contacto.belongsTo(models.Fingerprint, { foreignKey: 'fingerprintId' });
```

## Producto

| campo       | tipo         |          | notNull | Auto | key     | fk  | coment |
| ----------- | ------------ | -------- | ------- | ---- | ------- | --- | ------ |
| productoId  | int          |          | notnull | X    | primary |     |        |
| categoriaId | int          |          |         |      |         | X   |        |
| ivaId       | int          |          |         |      |         | X   |        |
| nombre      | varchar      |          | notnull |      |         |     |        |
| precio      | decimal(6,2) | unsigned |         |      |         |     |        |
| destacado   | tinyint(1)   |          |         |      |         |     |        |

```js
Producto.belongsTo(models.ProductosCategoria, { foreignKey: 'categoriaId' });
Producto.belongsTo(models.Iva, { foreignKey: 'ivaId' });
Producto.hasMany(models.CarritoDetalle, { foreignKey: 'productoId' });
Producto.hasMany(models.VentaDetalle, { foreignKey: 'productoId' });
Producto.hasMany(models.AbonosDetalle, { foreignKey: 'productoId' });
```

## Carrito

| campo         | tipo |     | notNull | Auto | key     | fk  | coment |
| ------------- | ---- | --- | ------- | ---- | ------- | --- | ------ |
| carritoId     | int  |     | notnull | X    | primary |     |        |
| clienteId     | int  |     |         |      |         | X   |        |
| fingerprintId | int  |     |         |      |         | X   |        |

```js
Carrito.belongsTo(models.Cliente, { foreignKey: 'clienteId' });
Carrito.belongsTo(models.Fingerprint, { foreignKey: 'fingerprintId' });
Carrito.hasMany(models.CarritoDetalle, { foreignKey: 'carritoId' });
Carrito.hasMany(models.Venta, { foreignKey: 'carritoId' });
Carrito.hasMany(models.ErroresVenta, { foreignKey: 'carritoId' });
```

## CarritoDetalle

| campo          | tipo         |          | notNull | Auto | key     | fk  | coment |
| -------------- | ------------ | -------- | ------- | ---- | ------- | --- | ------ |
| id             | int          |          | notnull | X    | primary |     |        |
| carritoId      | int          |          |         |      |         | X   |        |
| productoId     | int          |          |         |      |         | X   |        |
| cantidad       | int          | unsigned | notnull |      |         |     |        |
| precio         | decimal(6,2) | unsigned | notnull |      |         |     |        |
| unidadMedida   | varchar 10   |          | notnull |      |         |     |        |
| nombreProducto | varchar      |          | notnull |      |         |     |        |
| tipoIva        | int          |          |         |      |         |     |        |

```js
CarritoDetalle.belongsTo(models.Carrito, { foreignKey: 'carritoId' });
CarritoDetalle.belongsTo(models.Producto, { foreignKey: 'productoId' });
```

## Ventas

| campo           | tipo           |          | notNull | Auto | key     | fk  | coment |
| --------------- | -------------- | -------- | ------- | ---- | ------- | --- | ------ |
| id              | int            |          | notnull | X    | primary |     |        |
| clienteId       | int            |          |         |      |         | X   |        |
| carritoId       | int            |          |         |      |         | X   |        |
| metodoPagoId    | int            |          |         |      |         | X   |        |
| referencia      | varchar        |          | notnull |      |         |     |        |
| precioTotal     | decimal(10,2)  | unsigned | notnull |      |         |     |        |
| precioBaseTotal | decimal (10,2) | unsigned | notnull |      |         |     |        |
| precioIvaTotal  | decimal (10,2) | unsigned | notnull |      |         |     |        |
| fechaEmision    | date           |          | notnull |      |         |     |        |
| horaEmision     | time           |          | notnull |      |         |     |        |

```js
Venta.belongsTo(models.Cliente, { foreignKey: 'clienteId' });
Venta.belongsTo(models.Carrito, { foreignKey: 'carritoId' });
Venta.belongsTo(models.MetodosPago, { foreignKey: 'metodoPagoId' });
Venta.hasMany(models.VentaDetalle, { foreignKey: 'ventaId' });
Venta.hasMany(models.Abono, { foreignKey: 'ventaId' });
```

### VentasDetalle

| campo          | tipo         |          | notNull | Auto | key     | fk  | coment |
| -------------- | ------------ | -------- | ------- | ---- | ------- | --- | ------ |
| id             | int          |          | notnull | X    | primary |     |        |
| ventaId        | int          |          |         |      |         | X   |        |
| productoId     | int          |          |         |      |         | X   |        |
| cantidad       | int          | unsigned | notnull |      |         |     |        |
| precio         | decimal(6,2) | unsigned | notnull |      |         |     |        |
| unidadMedida   | varchar      |          | notnull |      |         |     |        |
| nombreProducto | varchar      |          | notnull |      |         |     |        |
| tipoIva        | int          |          |         |      |         |     |        |

```js
VentaDetalle.belongsTo(models.Venta, { foreignKey: 'ventaId' });
VentaDetalle.belongsTo(models.Producto, { foreignKey: 'productoId' });
```

## ErroresVenta

| campo        | tipo    |          | notNull | Auto | key     | fk  | coment |
| ------------ | ------- | -------- | ------- | ---- | ------- | --- | ------ |
| id           | int     |          | notnull | X    | primary |     |        |
| metodoPagoId | int     |          | notnull |      |         | X   |        |
| clienteId    | int     |          | notnull |      |         | X   |        |
| carritoId    | int     |          | notnull |      |         | X   |        |
| codigoError  | int(5)  | unsigned | notnull |      |         |     |        |
| mensajeError | varchar |          |         |      |         |     |        |

```js
ErroresVenta.belongsTo(models.MetodosPago, { foreignKey: 'metodoPagoId' });
ErroresVenta.belongsTo(models.Cliente, { foreignKey: 'clienteId' });
ErroresVenta.belongsTo(models.Carrito, { foreignKey: 'carritoId' });
```

## Abonos

| campo           | tipo           |     | notNull | Auto | key     | fk  | coment |
| --------------- | -------------- | --- | ------- | ---- | ------- | --- | ------ |
| id              | int            |     | notnull | X    | primary |     |        |
| ventaId         | int            |     |         |      |         | X   |        |
| clienteId       | int            |     |         |      |         | X   |        |
| metodoPagoId    | int            |     |         |      |         | X   |        |
| referencia      | varchar        |     | notnull |      |         |     |        |
| precioTotal     | decimal (10,2) |     | notnull |      |         |     |        |
| precioBaseTotal | decimal (10,2) |     | notnull |      |         |     |        |
| precioIvaTotal  | decimal (10,2) |     | notnull |      |         |     |        |
| fechaEmision    | date           |     | notnull |      |         |     |        |
| horaEmision     | time           |     | notnull |      |         |     |        |

```js
Abono.belongsTo(models.Venta, { foreignKey: 'ventaId' });
Abono.belongsTo(models.Cliente, { foreignKey: 'clienteId' });
Abono.belongsTo(models.MetodosPago, { foreignKey: 'metodoPagoId' });
Abono.hasMany(models.AbonosDetalle, { foreignKey: 'abonoId' });
```

### AbonosDetalle

| campo          | tipo          |          | notNull | Auto | key     | fk  | coment |
| -------------- | ------------- | -------- | ------- | ---- | ------- | --- | ------ |
| id             | int           |          | notnull | X    | primary |     |        |
| abonoId        | int           |          |         |      |         | X   |        |
| productoId     | int           |          |         |      |         | X   |        |
| cantidad       | int           |          | notnull |      |         |     |        |
| precio         | decimal (6,2) | unsigned | notnull |      |         |     |        |
| unidadMedida   | varchar       |          | notnull |      |         |     |        |
| nombreProducto | varchar       |          | notnull |      |         |     |        |
| tipoIva        | int           |          |         |      |         |     |        |

```js
AbonosDetalle.belongsTo(models.Abono, { foreignKey: 'abonoId' });
AbonosDetalle.belongsTo(models.Producto, { foreignKey: 'productoId' });
```
