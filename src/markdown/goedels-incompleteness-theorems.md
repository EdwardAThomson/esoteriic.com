---
date: "Wed Jun 10 2009 00:44:00 GMT+0100 (British Summer Time)"
title: "Goedel's incompleteness theorem(s)"
description: ""
category: "abstruse"
---
This was fist mentioned on page 3 of "Faith in simplicity" article written by Ed. I would like to go into slightly more detail about this since it is a fascinating topic.

  
First of all I would like to expand a little on its history, which was already summarised in Ed's article. The flaw that Russell talked about has to do with set theory, one of the foundations of mathematics. Without going into much detail on set theory, a 'set' is simply a collection of distinct objects. There is not really a restriction on what the objects might be and as such, the set itself is also an object and can be a member of any set. And this flaw, which is known as Russell's paradox is most commonly phrased as follows. Let R be 'the set of all sets that do not contain themselves as members', (i.e. A is an member of R if and only if A is not a member of A) then is R a member of itself? If R is a member of R, then by the above definition R is not a member of R. If R isn't a member of R then by the above definition, R is a member of R! (Replace A by R and the paradox become explicit.) You might have noticed that the culprit of this paradox is self-referencing, the fact that R can refer to itself in its definition. Russell was aware of this, thus he and Alfred North Whitehead wrote _Principia Mathematica_ (PM), a mammoth effort to formalise the foundations of mathematics (mostly number theory) in order to free it from this sort of self-referencing. The basic idea is to use a hierarchical system of types for each set and its members: a member of a set is always of a lower type than the set itself in this hierarchy. Thus a set of the lowest type can only contain objects in the normal sense, i.e. they can't have themselves or any other sets as members. Then a set of the type that is next higher up in the hierarchy can contain sets of the lowest type, etc. etc. Under this system, R cannot include itself as a member so the paradox is avoided. However, what Gödel did was to showö that even though this sorf of self-referencing can be basnished, self-referencing of the indirect variety will still occur and turn the system against itself.  
  
To see how this can occur I will introduce the concept of 'quining', which was discovered by Willard Van Orman Quine hence the name. To quine a phrase we just take its quotation and place that in front of the phrase. For example, the quine of  
  
is composed of five words  
  
would be  
  
"is composed of five words" is composed of five words.  
  
We end up with a grammatically correct sentence and as it happens, also true. Perhaps you think this is stupid and  
  
"is stupid" is stupid.  
  
would be another example. Here's the killer, if we quine  
  
yields falsehood when preceded by its quotation  
  
we get  
  
"yields falsehood when preceded by its quotation" yields falsehood when preceded by its quotation.  
  
Think carefully about this and you will see that it is a paradox, and it contains no direct self-reference what so ever. This is central to theproof of Gödel's incompleteness theorem.  
  
Now PM uses what is known as formal language, which contains no ambiguities in its words or symbols. This allows the construction of well-formed formulae/words, which are used write down axioms, build proofs and theorems. (An axiom is a sequence of well-formed formulae/words that one accepts being true without proof. For example: there exists a natural number 1 and there is no natural number whose successor is 1 are two axioms. A theorem on the otherhand, need to be proved using rules of inference and axioms before it be accepted as being true.) However, this lack of ambiguity is the final piece needed for the incompleteness theorem. Goedel had the insight to turn each statement in PM into numbers by assigning a unique code to each symbol and word, which became known as Goedel numbering. Thus each statment has a unique Goedel number, which means each statement can now be understood in two ways: a statement **of** number theory or a statement **about** a statement of number theory, since each statement is now also a unique number! Furthermore, due to the axiomatic nature of the system, Godel showed that there is a mapping (isomorphism to be exact) between manipulating the axioms and symbols to produce theorems and doing arithmatics on the Gödel numbers. Hence in a last stroke of genius, Godel applied the principle of 'quining' on numbers, 'arithomquining' if you will. He was able to construct a Gödel sentence G that says "G is not provable within PM". So if one is able to prove G within PM, then PM is obviously inconsistent, and if G is true and unprovable then PM is incomplete. One could extend PM to PM+ and make G as a statement in PM+. However, Gödel's system ensures that there will be a sentence G+ that says "G+ is not provable in PM+" and this will go on ad infinitum.  
  
This is actually his first incompleteness theorem. The second one says that the even the consistency of PM cannot be proven within PM, and if such a prove is found then PM must be inconsistent! This actually makes sense if you think about it, since an inconsistent system can prove anything, including its own consistency. However, this does not mean one can't have consistency proofs. For example, in a theory T1, one can prove the consistency of another theory T2. The implication is, T2 can never prove the consistency of T1.  
  
In summary, Ed was right in saying there are true statements in number theory that cannot be proven. Infact, Goedel showed there are an infinite number of them! Thus one can view that provability is a weaker notion than truth. Ed was partially right in saying mathematics can be consistent but cannot be proven to be so, since Gödel's theorems can only be applied in sufficiently strong axiomatic systems, which is required for 'arithmoquining' to work. There are areas in mathematics that do not satisfy this requirement.  
  
For more details on this or other related topics, I again recommend "Gödel, Escher, Bach: an Eternal Golden Braid" by Douglas R. Hofstadter, it's a brilliant and fun book, well worth a read.