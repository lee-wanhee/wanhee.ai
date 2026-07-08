---
layout: book-chapter
title: Autoregressive Language Models
part: Discrete Data
partNum: III
order: 3
permalink: /book/discrete-data/
---

The first modality to fall to scale was discrete: text, as a sequence of tokens. Autoregressive
models factorize the joint distribution into a product of conditionals,

$$
p_\theta(x_{1:T}) = \prod_{t=1}^{T} p_\theta(x_t \mid x_{<t}),
$$

and train by maximizing likelihood. This chapter develops why this simple objective, at scale,
produces such general capabilities.

*(Draft — chapter outline only.)*
