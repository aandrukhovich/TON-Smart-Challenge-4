# TSC4 code repository

See the original contest repository https://github.com/ton-community/tsc4.

10-days contest of writing a smart-contracts for TON blockchain.

Possible to use FunC(dialect of C) or Fift(ASM-like) to write a code. Wrappers and tests are written on TypeScript using Blueprint framework.

# Results:

Tasks solved: **5/5**

Place **83/274** (top 30%)

Prize: A lot of fun and N TONs

# Detailed results:

## Task 1
Points: 5.396919110103502

GasValue: 1589005

[Code](contracts/1.fc) [Wrapper](wrappers/Task1.fc) [Tests](tests/Task1.spec.ts)

Task to meet the language and provided tools for developing. Firstly solution was written with recursion (score 5.16), then optimized (5.21) and finally rewritten using Lisp-like list (5.39)

## Task 2

Points: 5.976338143715719

GasValue: 16366081

[Code](contracts/2.fc) [Wrapper](wrappers/Task2.fc) [Tests](tests/Task2.spec.ts)

The goal is to multiply two matrices. Task to become familiar with memory in general and with tuples in particular in FunC.

The naive algorithm in pure FunC takes a 5.97 score, so almost no need to optimizations.


## Task 3
GasValue: 73738596

Points: 5.291969984009893

[Code](contracts/3.fc) [Wrapper](wrappers/Task3.fc) [Tests](tests/Task3.spec.ts)
Probably the hardest task in the contest. Do a string find-and-replace-all, where strings are binary and presented as integers in linked list of cells, such that bits from the end of cell1 are connected with first bits of cell2.
The first attempt scores 5.29 and hadn't edited.


## Task 4
GasValue: 333391563

Points: 5.644994443586982

[Code](contracts/4.fc) [Wrapper](wrappers/Task4.fc) [Tests](tests/Task4.spec.ts)

Implement a Caesar cipher encryption and decryption functions.



## Task 5

GasValue: 1729374

Points: 5.427721800691111

[Code](contracts/5.fc) [Wrapper](wrappers/Task5.fc) [Tests](tests/Task5.spec.ts)

Find a Fibonacci sequence from N to N+k elements.

The biggest challenge was FunC compiler that produces a very unefficient Fift code for cycles in this task. So for a score 5.9-5.95 task should be written in Fift.

I tried a two approaches: first the naive one with cycle and fast doubling method to find a Fibonacci(n) with O(logN). Both provide similar results around 5.42, but I see the  in tuple pushings that wasn't impr
