.globl __start

 

.data
.byte 1, 3, -1, 0xff
valor: .word 0x1ffffff
.asciiz "AABBA"

 

.text
__start:

 

addi $5, $0, 0
la $2, valor
lw $2, 0($2)
bucle: addi $5, $5, 1
beq $5, $2, fin
j bucle
fin:
.end