.globl __start

.data 0x10000000
cadenamin: .asciiz “covid”


.data 0x10001000
cadenamay: .space 6


.text 0x00400000
__start:	lui $2, 0x1000 
		ori $3,$2, 0x1000
	
bucle:	lb $4,0($2)
		beq $4,$0,salida
		addi $4,$4,-32
		sb $4,0($3)
		addi $2,$2,1
		addi $3,$3,1
		j bucle
salida:
.end
