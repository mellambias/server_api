# Tablas proyecto

## Sliders

| campo    | type    | notNull | Auto | key     | fk  |
| -------- | ------- | ------- | ---- | ------- | --- |
| sliderId | int     | notnull | X    | primary |     |
| name     | varchar | notnull | -    | -       |     |

## Language

| campo      | type    | notNull | Auto | key     | fk  |
| ---------- | ------- | ------- | ---- | ------- | --- |
| languageId | int     | notnull | X    | primary |     |
| name       | varchar | notnull |      |         |     |
| alias      | char 2  | notnull |      |         |     |

## Locale

| campo         | type         | notNull | Auto | key     | fk  |
| ------------- | ------------ | ------- | ---- | ------- | --- |
| localeId      | int          | notnull | X    | primary |     |
| languageAlias | char(2)      | notnull |      |         |     |
| entity        | varchar      | notnull |      |         |     |
| entityKey     | int unsigned | notnull |      |         |     |
| key           | varchar      | notnull |      |         |     |
| value         | varchar      |         |      |         |     |

## ImageSetting

| campo               | type            | notNull | Auto | key     | fk  | coment                     |
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

| campo                | type           |          | notNull | Auto | key     | fk  | coment                     |
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

| campo         | type    |          | notNull | Auto | key     | fk  | coment |
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

| campo       | type    |     | notNull | Auto | key     | fk  | coment |
| ----------- | ------- | --- | ------- | ---- | ------- | --- | ------ |
| id          | int     |     | notnull | X    | primary |     |        |
| customerId  | int     |     |         |      |         | X   |        |
| fingerprint | varchar |     | notnull |      |         |     |        |

```js
Fingerprint.belongsTo(models.Customer, { foreignKey: 'customerId' });
Fingerprint.hasMany(models.ShoppingCart, { foreignKey: 'fingerprintId' });
Fingerprint.hasOne(models.Contact, { foreignKey: 'fingerprintId' });
```

## ProductsCategory

| campo | type    |     | notNull | Auto | key     | fk  | coment |
| ----- | ------- | --- | ------- | ---- | ------- | --- | ------ |
| id    | int     |     | notnull | X    | primary |     |        |
| name  | varchar |     | notnull |      |         |     |        |

```js
ProductsCategory.hasMany(models.Product, { foreignKey: 'categoryId' });
```

## PaymentMethod

| campo   | type      |     | notNull | Auto | key     | fk  | coment |
| ------- | --------- | --- | ------- | ---- | ------- | --- | ------ |
| id      | int       |     | notnull | X    | primary |     |        |
| name    | varchar   |     | notnull |      |         |     |        |
| visible | tinyint 1 |     | notnull |      |         |     |        |

```js
PaymentMethod.hasMany(models.Sale, { foreignKey: 'paymentMethodId' });
PaymentMethod.hasMany(models.SaleFail, { foreignKey: 'paymentMethodId' });
PaymentMethod.hasMany(models.Refund, { foreignKey: 'paymentMethodId' });
```

### Taxes

| campo | type      |          | notNull | Auto | key     | fk  | coment |
| ----- | --------- | -------- | ------- | ---- | ------- | --- | ------ |
| id    | int       |          | notnull | X    | primary |     |        |
| type  | int(2)    | unsigned | notnull |      |         |     |        |
| valid | tinyint 1 |          | notnull |      |         |     |        |

```js
Taxe.hasMany(models.Product, { foreignKey: 'taxeId' });
```

#### Customer

| campo          | type        |         | notNull | Auto | key     | fk  | coment                                                 |
| -------------- | ----------- | ------- | ------- | ---- | ------- | --- | ------------------------------------------------------ |
| id             | int         |         | X       | X    | primary |     |                                                        |
| shoppingCartId | int         |         |         |      |         | X   | (optativo, para saber si tiene ShoppingCart pendiente) |
| name           | varchar     | notnull |         |      |         |     |                                                        |
| surnames       | varchar     | notnull |         |      |         |     |                                                        |
| phone          | varchar(10) | notnull |         |      |         |     |                                                        |
| email          | varchar     | notnull |         |      |         |     |                                                        |
| town           | varchar     | notnull |         |      |         |     |                                                        |
| postalCode     | char        | notnull |         |      |         |     |                                                        |
| address        | varchar     | notnull |         |      |         |     |                                                        |

```js
Customer.hasMany(models.ShoppingCart, { foreignKey: 'customerId' });
Customer.hasOne(models.Fingerprint, { foreignKey: 'customerId' });
Customer.hasMany(models.Sale, { foreignKey: 'customerId' });
Customer.hasMany(models.SaleFail, { foreignKey: 'customerId' });
Customer.hasMany(models.Refund, { foreignKey: 'customerId' });
```

## Contact

| campo         | type        | notNull | Auto | key     | fk  |
| ------------- | ----------- | ------- | ---- | ------- | --- |
| ContactId     | int         | notnull | X    | primary |     |
| fingerprintId | int         |         | -    | -       | x   |
| name          | varchar     | notnull | -    | -       |     |
| surnames      | varchar     | notnull | -    | -       |     |
| phone         | varchar(20) | notnull | -    | -       |     |
| email         | varchar     | notnull | -    | -       |     |
| message       | text        | notnull | -    | -       |     |

```js
Contact.belongsTo(models.Fingerprint, { foreignKey: 'fingerprintId' });
```

## Product

| campo       | type         |          | notNull | Auto | key     | fk  | coment |
| ----------- | ------------ | -------- | ------- | ---- | ------- | --- | ------ |
| productId   | int          |          | notnull | X    | primary |     |        |
| categoryId  | int          |          |         |      |         | X   |        |
| taxeId      | int          |          |         |      |         | X   |        |
| name        | varchar      |          | notnull |      |         |     |        |
| price       | decimal(6,2) | unsigned |         |      |         |     |        |
| outstanding | tinyint(1)   |          |         |      |         |     |        |

```js
Product.belongsTo(models.ProductsCategory, { foreignKey: 'categoryId' });
Product.belongsTo(models.Taxe, { foreignKey: 'taxeId' });
Product.hasMany(models.ShoppingCartDetail, { foreignKey: 'productId' });
Product.hasMany(models.SaleDetail, { foreignKey: 'productId' });
Product.hasMany(models.RefundDetail, { foreignKey: 'productId' });
```

## ShoppingCart

| campo          | type |     | notNull | Auto | key     | fk  | coment |
| -------------- | ---- | --- | ------- | ---- | ------- | --- | ------ |
| shoppingCartId | int  |     | notnull | X    | primary |     |        |
| customerId     | int  |     |         |      |         | X   |        |
| fingerprintId  | int  |     |         |      |         | X   |        |

```js
ShoppingCart.belongsTo(models.Customer, { foreignKey: 'customerId' });
ShoppingCart.belongsTo(models.Fingerprint, { foreignKey: 'fingerprintId' });
ShoppingCart.hasMany(models.ShoppingCartDetail, {
    foreignKey: 'shoppingCartId',
});
ShoppingCart.hasMany(models.Sale, { foreignKey: 'shoppingCartId' });
ShoppingCart.hasMany(models.SaleFail, { foreignKey: 'shoppingCartId' });
```

## ShoppingCartDetail

| campo          | type         |          | notNull | Auto | key     | fk  | coment |
| -------------- | ------------ | -------- | ------- | ---- | ------- | --- | ------ |
| id             | int          |          | notnull | X    | primary |     |        |
| shoppingCartId | int          |          |         |      |         | X   |        |
| productId      | int          |          |         |      |         | X   |        |
| amount         | int          | unsigned | notnull |      |         |     |        |
| price          | decimal(6,2) | unsigned | notnull |      |         |     |        |
| unitMesasure   | varchar 10   |          | notnull |      |         |     |        |
| productName    | varchar      |          | notnull |      |         |     |        |
| vatType        | int          |          |         |      |         |     |        |

```js
ShoppingCartDetail.belongsTo(models.ShoppingCart, {
    foreignKey: 'shoppingCartId',
});
ShoppingCartDetail.belongsTo(models.Product, { foreignKey: 'productId' });
```

## Sales

| campo           | type           |          | notNull | Auto | key     | fk  | coment |
| --------------- | -------------- | -------- | ------- | ---- | ------- | --- | ------ |
| id              | int            |          | notnull | X    | primary |     |        |
| customerId      | int            |          |         |      |         | X   |        |
| shoppingCartId  | int            |          |         |      |         | X   |        |
| paymentMethodId | int            |          |         |      |         | X   |        |
| reference       | varchar        |          | notnull |      |         |     |        |
| totalPrice      | decimal(10,2)  | unsigned | notnull |      |         |     |        |
| priceBaseTotal  | decimal (10,2) | unsigned | notnull |      |         |     |        |
| priceVatTotal   | decimal (10,2) | unsigned | notnull |      |         |     |        |
| issueDate       | date           |          | notnull |      |         |     |        |
| issueTime       | time           |          | notnull |      |         |     |        |

```js
Sale.belongsTo(models.Customer, { foreignKey: 'customerId' });
Sale.belongsTo(models.ShoppingCart, { foreignKey: 'shoppingCartId' });
Sale.belongsTo(models.PaymentMethod, { foreignKey: 'paymentMethodId' });
Sale.hasMany(models.SaleDetail, { foreignKey: 'saleId' });
Sale.hasMany(models.Refund, { foreignKey: 'saleId' });
```

### SalesDetalle

| campo        | type         |          | notNull | Auto | key     | fk  | coment |
| ------------ | ------------ | -------- | ------- | ---- | ------- | --- | ------ |
| id           | int          |          | notnull | X    | primary |     |        |
| saleId       | int          |          |         |      |         | X   |        |
| productId    | int          |          |         |      |         | X   |        |
| amount       | int          | unsigned | notnull |      |         |     |        |
| price        | decimal(6,2) | unsigned | notnull |      |         |     |        |
| unitMesasure | varchar      |          | notnull |      |         |     |        |
| productName  | varchar      |          | notnull |      |         |     |        |
| vatType      | int          |          |         |      |         |     |        |

```js
SaleDetail.belongsTo(models.Sale, { foreignKey: 'saleId' });
SaleDetail.belongsTo(models.Product, { foreignKey: 'productId' });
```

## SaleFail

| campo           | type    |          | notNull | Auto | key     | fk  | coment |
| --------------- | ------- | -------- | ------- | ---- | ------- | --- | ------ |
| id              | int     |          | notnull | X    | primary |     |        |
| paymentMethodId | int     |          | notnull |      |         | X   |        |
| customerId      | int     |          | notnull |      |         | X   |        |
| shoppingCartId  | int     |          | notnull |      |         | X   |        |
| errorCode       | int(5)  | unsigned | notnull |      |         |     |        |
| errorMessage    | varchar |          |         |      |         |     |        |

```js
SaleFail.belongsTo(models.PaymentMethod, { foreignKey: 'paymentMethodId' });
SaleFail.belongsTo(models.Customer, { foreignKey: 'customerId' });
SaleFail.belongsTo(models.ShoppingCart, { foreignKey: 'shoppingCartId' });
```

## Refunds

| campo           | type           |     | notNull | Auto | key     | fk  | coment |
| --------------- | -------------- | --- | ------- | ---- | ------- | --- | ------ |
| id              | int            |     | notnull | X    | primary |     |        |
| saleId          | int            |     |         |      |         | X   |        |
| customerId      | int            |     |         |      |         | X   |        |
| paymentMethodId | int            |     |         |      |         | X   |        |
| reference       | varchar        |     | notnull |      |         |     |        |
| totalPrice      | decimal (10,2) |     | notnull |      |         |     |        |
| priceBaseTotal  | decimal (10,2) |     | notnull |      |         |     |        |
| priceVatTotal   | decimal (10,2) |     | notnull |      |         |     |        |
| issueDate       | date           |     | notnull |      |         |     |        |
| issueTime       | time           |     | notnull |      |         |     |        |

```js
Refund.belongsTo(models.Sale, { foreignKey: 'saleId' });
Refund.belongsTo(models.Customer, { foreignKey: 'customerId' });
Refund.belongsTo(models.PaymentMethod, { foreignKey: 'paymentMethodId' });
Refund.hasMany(models.RefundDetail, { foreignKey: 'id' });
```

### RefundDetail

| campo        | type          |          | notNull | Auto | key     | fk  | coment |
| ------------ | ------------- | -------- | ------- | ---- | ------- | --- | ------ |
| id           | int           |          | notnull | X    | primary |     |        |
| id           | int           |          |         |      |         | X   |        |
| productId    | int           |          |         |      |         | X   |        |
| amount       | int           |          | notnull |      |         |     |        |
| price        | decimal (6,2) | unsigned | notnull |      |         |     |        |
| unitMesasure | varchar       |          | notnull |      |         |     |        |
| productName  | varchar       |          | notnull |      |         |     |        |
| vatType      | int           |          |         |      |         |     |        |

```js
RefundDetail.belongsTo(models.Refund, { foreignKey: 'id' });
RefundDetail.belongsTo(models.Product, { foreignKey: 'productId' });
```
