1. Crear una pila vacía
2. Tener a disposición el nodo raíz del arbol y asignarlo a la variable `actual`
3. 3.1 Hacer `push` del nodo `actual` a la pila
   3.2 Asignar `actual.nodoIzquierdo` a `actual`
   3.3 repetir el paso 3 hasta que `actual` sea NULL
4. Si `actual` es NULL y la pila no está vacía entonces
   4.1 Recuperar un elemento de la pila en la variable `temp` e imprimirlo.
   4.2 Asignar `temp.nodoDerecha` a la variable `actual`
5. Si `actual` es distinto de NULL o la pila no está vacía, ir al paso 3

Tenemos el árbol:

            1
          /   \
        2      3
      /  \
    4     5

1. creamos una pila vacía: pila = NULL
2. actual -> 1
3. actual = 1
   3.1 pila.push(actual) => pila = 1
   3.2 actual -> 2

    3.1 pila.push(actual) => pila = 2, 1
    3.2 actual -> 4

    3.1 pila.push(actual) => pila = 4, 2, 1
    3.2 actual -> NULL

4. actual = NULL
   pila = 4, 2, 1
   4.1 temp = pila.pop(); => temp = 4,
   salida = 4
   4.2 actual -> NULL
5. actual = NULL
   pìla = 2, 1
   3.1 actual = NULL, no hace nada
6. actual = NULL
   pila = 2, 1
   4.1 temp = pila.pop(); => temp = 2
   salida = 4,2
   4.2 actual -> 5
7. actual = 5
   pìla = 1
   3.1 pila.push(actual) => pila = 5, 1
   3.2 actual -> NULL
8. actual = NULL
   pila = 5, 1
   4.1 temp = pila.pop(); => temp = 5
   salida = 4,2,5
   4.2 actual -> NULL
9. actual = NULL
   pìla = 1
   3.1 actual = NULL, no hace nada
10. actual = NULL
    pila = 1
    4.1 temp = pila.pop(); => temp = 1
    salida = 4,2,5,1
    4.2 actual -> 3
11. actual = 3
    pìla = (vacía)
    3.1 pila.push(actual) => pila = 3
    3.2 actual -> NULL
12. actual = NULL
    pila = 3
    4.1 temp = pila.pop(); => temp = 3
    salida = 4,2,5,1,3
    4.2 actual -> NULL
13. actual = NULL
    pìla = (vacía)
    Por tanto, termina el proceso.
