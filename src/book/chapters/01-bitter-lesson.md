---
layout: book-chapter
title: Why Learning Wins
part: The Bitter Lesson
partNum: I
order: 1
permalink: /book/bitter-lesson/
---

For seventy years, the field of artificial intelligence has relearned the same lesson,
and each time it has been a bitter one. We build systems around our own understanding of a
problem — our features, our priors, our carefully engineered structure — and for a while they
win. Then compute grows, someone throws a general method and a great deal of it at the same
problem, and the hand-built system is left behind.

> The biggest lesson that can be read from 70 years of AI research is that general methods
> that leverage computation are ultimately the most effective, and by a large margin.
> — Rich Sutton, *The Bitter Lesson*

This book is organized around taking that lesson seriously. If general methods plus computation
win, then the central questions become: *which* general methods scale, *how* their performance
grows with resources, and *what kinds of data* they can consume. The rest of the book follows
that thread — from the predictable arithmetic of scaling, through discrete data, to continuous
data, and finally to the multimodal models that begin to look like world models.

## Two ways to encode knowledge

There are, roughly, two ways to get knowledge into a machine. The first is to put it there
ourselves. The second is to let the machine find it, given data and search. Write the first as a
fixed function $f_\theta$ whose structure we design, and the second as the same function
whose parameters we *learn* by minimizing a loss over data:

$$
\theta^\star = \arg\min_\theta \; \mathbb{E}_{x \sim \mathcal{D}} \big[ \ell(f_\theta(x),\, y) \big].
$$

The bitter lesson is a claim about which of these improves when you add a zero to the compute
budget. Hand-built structure does not; learning and search do.

## What this book is not

This is not a survey. It is an argument with a spine, and the chapters are the vertebrae. Where a
result matters for the argument, we will derive it; where it does not, we will cite it and move on.

*(Draft — this chapter is a work in progress.)*
