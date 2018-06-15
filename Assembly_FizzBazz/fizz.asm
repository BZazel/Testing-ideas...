; *********** DEFINE MACROS ***************
%macro printINT 1
	mov rax, 1
	mov rdi, 1
	mov rsi, 48
	add rsi, [%1] 		;ACSII e.g. 48 +3 = 51 (char 3 in ASCII)
	mov rdx, 1		;length
	syscall
%endmacro

;********************************************


section .data
	fizz	 db "Fizz",10 ;5
nnnnn	buzz	 db "Buzz",10 ;5
	fizzBuzz db "FizzBuzz",10 ;11
	counter  db  0
	divider  db 0
	size 	 db 100
	temp1 	 db 0
	temp2 	 db 0
	divisor  db 10
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
	jmp _printCurrentNumber		;else

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
	mov rdx, 11
	syscall

	jmp endCheck

_printCurrentNumber:
	
	mov ax, 0
	mov al, byte [counter]
	div byte [divisor]
	mov [temp1], ah
	mov ah,0
	div byte [divisor]
	mov [temp2], ah
	printINT temp2
	printINT temp1

	jmp endCheck
