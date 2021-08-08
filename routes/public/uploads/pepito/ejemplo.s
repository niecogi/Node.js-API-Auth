#este programa almacena en memoria 
#el minimo, maximo y sus posiciones 
#de los valores incluidos en "lista"
#largo almecena el numero de valores en "lista"
.data 0x10000000
minimo: .word 0
maximo: .word 0
pos_min: .word 0
pos_max: .word 0

.data 0x10001000
lista: .half 3, -2, 25, 6, -8, 4, 12
largo: .word 7 #elementos en lista.

.globl __start

.text 0x00400000

__start:
li $7, 0
la $8, largo #direccion de largo
lw $8, 0($8) #valor de largo
la $9, lista #direccion de lista
lh $10, 0($9) #primer elemento de la lista
add $11, $10, $0 #$11 minimo, de momento el primer elemento es el menor
add $12, $10, $0 #$12 maximo, de momento el primer elemento es el mayor
add $13, $0, $0 #$13 posicion del minimo
add $14, $0, $0 #$14 posicion del maximo
bucle: beq $7, $8, fin  #empieza el bucle
addi $9, $9, 2
addi $7, $7, 1
lh $10, 0($9)
slt $16, $10, $11 #elemento menor que minimo?
beq $16, $0, no_menor
add $11, $10, $0  #actualizamos el minimo
add $13, $7, $0
no_menor:
slt $16, $12, $10 #maximo menor que elemento?
beq $16, $0, no_mayor
add $12, $10, $0 #actualizamos el maximo
add $14, $7, $0
no_mayor:
j bucle
fin:
la $8, minimo #guardamos en memoria los valores encontrados
sw $11, 0($8)
sw $12, 4($8)
sw $13, 8($8)
sw $14, 12($8)
.end