Answers to Questions
1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
 getElementById:

 answer----

 It is a built-in-method of document.Actually we use to select CSS Id. We can catch id without #. And make it clickable or functionable.We use it in js DOM.It returns object.If there is no element, it returns null. we can write it as--document.getElementById("redBtn")

 getElementsByClassName:

 answer---

 It is a built-in-method of document. Actually we use to select CSS class. We can catch id without .(dot sign). And make it clickable or functionable. We use it in js DOM.It returns collection of HTML.  we can write it as--document.getElementById("menu-item")

 ##querySelector() and querySelectorAll()

querySelector():

It is use for any CSS(Id or class). It is also used for catching Id or class. It returns 1st matching element.It is not used for selecting multiple elements.We can write it as--doccument.querySelector.

 querySelectorAll():
It is used for selecting maultiple CSS elements from html file.And it returns Nodelist (like div,p, main).


2. How do you create and insert a new element into the DOM?


we can create a new element into the DOM by using document.createElement() method. In the js file we can keep the element in a variable. Like const newDev = document.createElement("div");
Then we have to add content and attributes. for this we can use setAttribute("Id", "class"), Then we can use appendChild method

we can create a new element into the DOM by using document.createElement() method. In the js file we can keep the element in a variable. Like const newDev = document.createElement("div");
Then we have to add content and attributes. for this we can use setAttribute("Id", "class"), Then we can use appendChild method. 

InsertBefore is using for inserting a new element before an existing reference elements in the DOM.



3. What is Event Bubbling? And how does it work?

Event Bubbling is a mechanism. When an Event is going to work on a nested elemnent that time it bubbles up through its previous elements in the DOM.

How it works:

a. When you click on a button inside a div:

b.The button's event handler fires first

c. Then the div's event handler fires

d. Then the body's event handler fires

e. And so on up to the document root


4. What is Event Delegation in JavaScript? Why is it useful?


5. What is the difference between preventDefault() and stopPropagation() methods?