# Modelos

## Contact

| campo         | type        | notNull | Auto | PK  | fk  | coment   |
| ------------- | ----------- | ------- | ---- | --- | --- | -------- |
| ContactId     | int         | X       | X    | X   |     |          |
| fingerprintId | int         |         | -    | -   | x   | Opcional |
| name          | varchar     | X       | -    | -   |     |          |
| surnames      | varchar     | X       | -    | -   |     |          |
| phone         | varchar(20) | X       | -    | -   |     |          |
| email         | varchar     | X       | -    | -   |     |          |
| message       | text        | X       | -    | -   |     |          |

```js
Contact.belongsTo(models.Fingerprint, { foreignKey: 'fingerprintId' });
```

## Customer

| campo          | type        | unsigned | notNull | Auto | PK  | fk  | coment                                                 |
| -------------- | ----------- | -------- | ------- | ---- | --- | --- | ------------------------------------------------------ |
| id             | int         |          | X       | X    | X   |     |                                                        |
| shoppingCartId | int         |          |         |      |     | X   | (optativo, para saber si tiene ShoppingCart pendiente) |
| name           | varchar     |          | X       |      |     |     |                                                        |
| surnames       | varchar     |          | X       |      |     |     |                                                        |
| phone          | varchar(10) |          | X       |      |     |     |                                                        |
| email          | varchar     |          | X       |      |     |     |                                                        |
| town           | varchar     |          | X       |      |     |     |                                                        |
| postalCode     | char        |          | X       |      |     |     |                                                        |
| address        | varchar     |          | X       |      |     |     |                                                        |

```js
Customer.hasMany(models.ShoppingCart, { foreignKey: 'customerId' });
Customer.hasOne(models.Fingerprint, { foreignKey: 'customerId' });
Customer.hasMany(models.Sale, { foreignKey: 'customerId' });
Customer.hasMany(models.SaleFail, { foreignKey: 'customerId' });
Customer.hasMany(models.Refund, { foreignKey: 'customerId' });
```

## Fingerprint

| campo       | type    | unsigned | notNull | Auto | PK  | fk  | coment |
| ----------- | ------- | -------- | ------- | ---- | --- | --- | ------ |
| id          | int     |          | X       | X    | X   |     |        |
| customerId  | int     |          |         |      |     | X   |        |
| fingerprint | varchar |          | X       |      |     |     |        |

```js
Fingerprint.belongsTo(models.Customer, { foreignKey: 'customerId' });
Fingerprint.hasMany(models.ShoppingCart, { foreignKey: 'fingerprintId' });
Fingerprint.hasOne(models.Contact, { foreignKey: 'fingerprintId' });
```

## ImageResized

| campo                | type           | unsigned | notNull | Auto | PK  | fk  | coment                     |
| -------------------- | -------------- | -------- | ------- | ---- | --- | --- | -------------------------- |
| id                   | int            |          | X       | X    | X   |     |                            |
| imageOriginalId      | int            | X        |         |      |     |     |                            |
| imageConfigurationId | int            | X        |         |      |     |     |                            |
| title                | varchar(150)   |          | X       |      |     |     |                            |
| alt                  | varchar        |          | X       |      |     |     |                            |
| path                 | varchar        |          | X       |      |     |     |                            |
| entity               | varchar        |          | X       |      |     |     |                            |
| entityId             | int            |          | X       |      |     |     |                            |
| languageAlias        | char(2)        |          | X       |      |     |     |                            |
| filename             | varchar        |          | X       |      |     |     |                            |
| content              | varchar        |          | X       |      |     |     |                            |
| mimeType             | varchar        |          | X       |      |     |     |                            |
| grid                 | varchar o enum |          | X       |      |     |     | (desktop, mobile, preview) |
| sizeBytes            | int            | X        | X       |      |     |     |                            |
| widthPx              | int(4)         | X        |         |      |     |     |                            |
| heightPx             | int(4)         | X        |         |      |     |     |                            |
| quality              | int(3)         | X        | X       |      |     |     |                            |

## ImageSetting

| campo               | type            | notNull | Auto | PK  | fk  | coment                     |
| ------------------- | --------------- | ------- | ---- | --- | --- | -------------------------- |
| id                  | int             | X       | X    | X   |     |                            |
| entity              | varchar         | X       |      |     |     |                            |
| directory           | varchar         | X       |      |     |     |                            |
| type                | varchar         |         |      |     |     |                            |
| content             | varchar         |         |      |     |     |                            |
| grid                | varchar o ENUM  | X       |      |     |     | (desktop, mobile, preview) |
| contentAccepted     | varchar         | X       |      |     |     | (ej: jpg/jpeg/webp)        |
| extensionConversion | varchar(4)      | X       |      |     |     |                            |
| widthPx             | int(4) unsigned |         |      |     |     |                            |
| heightPx            | int(4) unsigned |         |      |     |     |                            |
| quality             | int(3) unsigned | X       |      |     |     |                            |

## Language

| campo      | type    | notNull | Auto | PK  | fk  | coment |
| ---------- | ------- | ------- | ---- | --- | --- | ------ |
| languageId | int     | X       | X    | X   |     |
| name       | varchar | X       |      |     |     |
| alias      | char 2  | X       |      |     |     |

## Locale

| campo         | type    | unsigned | notNull | Auto | PK  | fk  | coment |
| ------------- | ------- | -------- | ------- | ---- | --- | --- | ------ |
| localeId      | int     |          | X       | X    | X   |     |
| languageAlias | char(2) |          | X       |      |     |     |
| entity        | varchar |          | X       |      |     |     |
| entityPK      | int     | X        | X       |      |     |     |
| PK            | varchar |          | X       |      |     |     |
| value         | varchar |          |         |      |     |     |

## OriginalImage

| campo         | type    | unsigned | notNull | Auto | PK  | fk  | coment |
| ------------- | ------- | -------- | ------- | ---- | --- | --- | ------ |
| id            | int     |          | X       | X    | X   |     |        |
| path          | varchar |          | X       |      |     |     |        |
| entity        | varchar |          | X       |      |     |     |        |
| entityId      | int     |          | X       |      |     |     |        |
| languageAlias | char(2) |          | X       |      |     |     |        |
| filename      | varchar |          | X       |      |     |     |        |
| content       | varchar |          | X       |      |     |     |        |
| mimeType      | varchar |          | X       |      |     |     |        |
| sizeBytes     | int     | X        | X       |      |     |     |        |
| widthPx       | int(4)  | X        | X       |      |     |     |        |
| heightPx      | int(4)  | X        | X       |      |     |     |        |

## PaymentMethod

| campo   | type      | unsigned | notNull | Auto | PK  | fk  | coment |
| ------- | --------- | -------- | ------- | ---- | --- | --- | ------ |
| id      | int       |          | X       | X    | X   |     |        |
| name    | varchar   |          | X       |      |     |     |        |
| visible | tinyint 1 |          | X       |      |     |     |        |

```js
PaymentMethod.hasMany(models.Sale, { foreignKey: 'paymentMethodId' });
PaymentMethod.hasMany(models.SaleFail, { foreignKey: 'paymentMethodId' });
PaymentMethod.hasMany(models.Refund, { foreignKey: 'paymentMethodId' });
```

## Product

| campo       | type         | unsigned | notNull | Auto | PK  | fk  | coment               |
| ----------- | ------------ | -------- | ------- | ---- | --- | --- | -------------------- |
| productId   | int          |          | X       | X    | X   |     |                      |
| categoryId  | int          |          | X       |      |     | X   | n:1 ProductsCategory |
| taxeId      | int          |          | X       |      |     | X   | n:1 Taxe             |
| name        | varchar      |          | X       |      |     |     |                      |
| price       | decimal(6,2) | X        |         |      |     |     |                      |
| outstanding | tinyint(1)   |          |         |      |     |     |                      |

```js
Product.belongsTo(models.ProductsCategory, { foreignKey: 'categoryId' });
Product.belongsTo(models.Taxe, { foreignKey: 'taxeId' });
Product.hasMany(models.ShoppingCartDetail, { foreignKey: 'productId' });
Product.hasMany(models.SaleDetail, { foreignKey: 'productId' });
Product.hasMany(models.RefundDetail, { foreignKey: 'productId' });
```

## ProductsCategory

| campo | type    | unsigned | notNull | Auto | PK  | fk  | coment |
| ----- | ------- | -------- | ------- | ---- | --- | --- | ------ |
| id    | int     |          | X       | X    | X   |     |        |
| name  | varchar |          | X       |      |     |     |        |

```js
ProductsCategory.hasMany(models.Product, { foreignKey: 'categoryId' });
```

## RefundDetail

| campo        | type          | unsigned | notNull | Auto | PK  | fk  | coment      |
| ------------ | ------------- | -------- | ------- | ---- | --- | --- | ----------- |
| id           | int           |          | X       | X    | X   |     |             |
| refundId     | int           |          | X       |      |     | X   | n:1 Refund  |
| productId    | int           |          | X       |      |     | X   | n:1 Product |
| amount       | int           |          | X       |      |     |     |             |
| price        | decimal (6,2) | X        | X       |      |     |     |             |
| unitMesasure | varchar       |          | X       |      |     |     |             |
| productName  | varchar       |          | X       |      |     |     |             |
| vatType      | int           |          |         |      |     |     |             |

```js
RefundDetail.belongsTo(models.Refund, { foreignKey: 'RefundId' });
RefundDetail.belongsTo(models.Product, { foreignKey: 'productId' });
```

## Refunds

| campo           | type           | unsigned | notNull | Auto | PK  | fk  | coment            |
| --------------- | -------------- | -------- | ------- | ---- | --- | --- | ----------------- |
| id              | int            |          | X       | X    | X   |     |                   |
| saleId          | int            |          | X       |      |     | X   | n:1 Sale          |
| customerId      | int            |          | X       |      |     | X   | n:1 Customer      |
| paymentMethodId | int            |          | X       |      |     | X   | n:1 PaymentMethod |
| reference       | varchar        |          | X       |      |     |     |                   |
| totalPrice      | decimal (10,2) |          | X       |      |     |     |                   |
| priceBaseTotal  | decimal (10,2) |          | X       |      |     |     |                   |
| priceVatTotal   | decimal (10,2) |          | X       |      |     |     |                   |
| issueDate       | date           |          | X       |      |     |     |                   |
| issueTime       | time           |          | X       |      |     |     |                   |

```js
Refund.belongsTo(models.Sale, { foreignKey: 'saleId' });
Refund.belongsTo(models.Customer, { foreignKey: 'customerId' });
Refund.belongsTo(models.PaymentMethod, { foreignKey: 'paymentMethodId' });
Refund.hasMany(models.RefundDetail, { foreignKey: 'id' });
```

## SalesDetalle

| campo        | type         |          | notNull | Auto | PK  | fk  | coment |
| ------------ | ------------ | -------- | ------- | ---- | --- | --- | ------ |
| id           | int          |          | notnull | X    | X   |     |        |
| saleId       | int          |          |         |      |     | X   |        |
| productId    | int          |          |         |      |     | X   |        |
| amount       | int          | unsigned | notnull |      |     |     |        |
| price        | decimal(6,2) | unsigned | notnull |      |     |     |        |
| unitMesasure | varchar      |          | notnull |      |     |     |        |
| productName  | varchar      |          | notnull |      |     |     |        |
| vatType      | int          |          |         |      |     |     |        |

```js
SaleDetail.belongsTo(models.Sale, { foreignKey: 'saleId' });
SaleDetail.belongsTo(models.Product, { foreignKey: 'productId' });
```

## SaleFail

| campo           | type    | unsigned | notNull | Auto | PK  | fk  | coment            |
| --------------- | ------- | -------- | ------- | ---- | --- | --- | ----------------- |
| id              | int     |          | X       | X    | X   |     |                   |
| paymentMethodId | int     |          | X       |      |     | X   | n:1 PaymentMethod |
| customerId      | int     |          | X       |      |     | X   | n:1 Customer      |
| shoppingCartId  | int     |          | X       |      |     | X   | n:1 ShoppingCart  |
| errorCode       | int(5)  | X        | X       |      |     |     |                   |
| errorMessage    | varchar |          |         |      |     |     |                   |

```js
SaleFail.belongsTo(models.PaymentMethod, { foreignKey: 'paymentMethodId' });
SaleFail.belongsTo(models.Customer, { foreignKey: 'customerId' });
SaleFail.belongsTo(models.ShoppingCart, { foreignKey: 'shoppingCartId' });
```

## Sales

| campo           | type           | unsigned | notNull | Auto | PK  | fk  | coment            |
| --------------- | -------------- | -------- | ------- | ---- | --- | --- | ----------------- |
| id              | int            |          | X       | X    | X   |     |                   |
| customerId      | int            |          | X       |      |     | X   | n:1 Customer      |
| shoppingCartId  | int            |          | X       |      |     | X   | n:1 ShoppingCart  |
| paymentMethodId | int            |          | X       |      |     | X   | n:1 PaymentMethod |
| reference       | varchar        |          | X       |      |     |     |                   |
| totalPrice      | decimal(10,2)  | X        | X       |      |     |     |                   |
| priceBaseTotal  | decimal (10,2) | X        | X       |      |     |     |                   |
| priceVatTotal   | decimal (10,2) | X        | X       |      |     |     |                   |
| issueDate       | date           |          | X       |      |     |     |                   |
| issueTime       | time           |          | X       |      |     |     |                   |

```js
Sale.belongsTo(models.Customer, { foreignKey: 'customerId' });
Sale.belongsTo(models.ShoppingCart, { foreignKey: 'shoppingCartId' });
Sale.belongsTo(models.PaymentMethod, { foreignKey: 'paymentMethodId' });
Sale.hasMany(models.SaleDetail, { foreignKey: 'saleId' });
Sale.hasMany(models.Refund, { foreignKey: 'saleId' });
```

## ShoppingCartDetail

| campo          | type         | unsigned | notNull | Auto | PK  | fk  | coment           |
| -------------- | ------------ | -------- | ------- | ---- | --- | --- | ---------------- |
| id             | int          |          | X       | X    | X   |     |                  |
| shoppingCartId | int          |          | X       |      |     | X   | n:1 ShoppingCart |
| productId      | int          |          | X       |      |     | X   | n:1 Product      |
| amount         | int          | X        | X       |      |     |     |                  |
| price          | decimal(6,2) | X        | X       |      |     |     |                  |
| unitMesasure   | varchar 10   |          | X       |      |     |     |                  |
| productName    | varchar      |          | X       |      |     |     |                  |
| vatType        | int          |          |         |      |     |     |                  |

```js
ShoppingCartDetail.belongsTo(models.ShoppingCart, {
    foreignKey: 'shoppingCartId',
});
ShoppingCartDetail.belongsTo(models.Product, { foreignKey: 'productId' });
```

## ShoppingCart

| campo          | type | unsigned | notNull | Auto | PK  | fk  | coment          |
| -------------- | ---- | -------- | ------- | ---- | --- | --- | --------------- |
| shoppingCartId | int  |          | X       | X    | X   |     |                 |
| customerId     | int  |          |         |      |     | X   | n:0,1 Customer  |
| fingerprintId  | int  |          | X       |      |     | X   | n:1 Fingerprint |

```js
ShoppingCart.belongsTo(models.Customer, { foreignKey: 'customerId' });
ShoppingCart.belongsTo(models.Fingerprint, { foreignKey: 'fingerprintId' });
ShoppingCart.hasMany(models.ShoppingCartDetail, {
    foreignKey: 'shoppingCartId',
});
ShoppingCart.hasMany(models.Sale, { foreignKey: 'shoppingCartId' });
ShoppingCart.hasMany(models.SaleFail, { foreignKey: 'shoppingCartId' });
```

## Slider

| campo    | type    | notNull | Auto | PK  | fk  | coment |
| -------- | ------- | ------- | ---- | --- | --- | ------ |
| sliderId | int     | X       | X    | X   |     |
| name     | varchar | X       | -    | -   |     |

## Taxe

| campo | type      | unsigned | notNull | Auto | PK  | fk  | coment |
| ----- | --------- | -------- | ------- | ---- | --- | --- | ------ |
| id    | int       |          | X       | X    | X   |     |        |
| type  | int(2)    | X        | X       |      |     |     |        |
| valid | tinyint 1 |          | X       |      |     |     |        |

```js
Taxe.hasMany(models.Product, { foreignKey: 'taxeId' });
```
