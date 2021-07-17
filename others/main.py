#!/usr/bin/venv python3
# -*- coding:utf-8 -*-
lookup = {}


def count_terms(n):
   if n not in lookup:
      if n == 1:
         lookup[n] = 1
      elif not n % 2:
         lookup[n] = count_terms(n / 2)[0] + 1
      else:
         lookup[n] = count_terms(n*3 + 1)[0] + 1

   return lookup[n], n


print(max(count_terms(i) for i in range(9, 1000000, 2)))
