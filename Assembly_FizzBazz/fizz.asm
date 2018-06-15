
section .data
	fizz	 db "Fizz",10 ;5
	buzz	 db "Buzz",10 ;5
	fizzBuzz db "FizzBuzz",10 ;9

	counter  db  0
	divider  db  0
	size 	 db  100
	divisor  db  10

section .text
	global _start

_start:

loop:
	mov ax, 0
	inc byte [counter]
	mov al, [counter]
	jmp _check
endCheck:
	mov dl, byte [counter]
	cmp dl, byte [size]
	jne loop

	mov rax,60
	mov rdi, 0 
	syscall


_check:	
	mov byte [divider], 3
	div byte [divider]	; [ax] / 3
	cmp ah,0		; rest in ah register
	je _check5pos  		; if(x % 3 == 0 )
	jmp _check5neg		; else...

_check5pos:
	mov al, [counter]
	mov byte [divider],5
	div byte [divider]
	cmp ah, 0		;rest
	je _printFizzBuzz	;if( x % 5 == 0)
	jmp _printFizz		;else...

_check5neg:
	mov ax,0
	mov al, [counter]
	mov byte [divider],5
	div byte [divider]
	cmp ah,0
	je _printBuzz		;if( x % 5 == 0)
	jmp endCheck		;else

_printFizz:
	mov rax,1
	mov rdi,1
	mov rsi, fizz
	mov rdx, 5
	syscall
	jmp endCheck

_printBuzz:
	mov rax, 1
	mov rdi, 1
	mov rsi, buzz
	mov rdx, 5
	syscall
	jmp endCheck

_printFizzBuzz:
	mov rax, 1
	mov rdi, 1
	mov rsi, fizzBuzz
	mov rdx, 9
	syscall

	jmp endCheck

