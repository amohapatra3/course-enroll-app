# Course search and enroll

This React application was made for a class project. Use this application to learn more about some courses offered by the University of Wisconsin-Madison.

## Overview

You can use this application to view course information, filter courses based on parameters, and add or remove courses to cart.

## Getting started

To use the app,follow these steps:

- Open terminal and run the following command:

```
git clone https://github.com/amohapatra3/course-enroll-app.git

```

- The command will create a new folder on your computer with the same name as the repository. Navigate to the folder by running the following command:

```
cd course-enroll-app
```

- You will need npm packages to run the app. In order to install the necessary packages, run the following command:

```
npm install
```

- Once you have installed the packages, run the following command:

```
npm start
```

- You will now see the app deployed on your default browser at `localhost:3000`

## Viewing course information

Each course is listed in an accordion display with a name and number, as shown below.

![Course List](img/screenshot1.png)

Click on the course you want more information on. You will see an expanded view, as shown below.

![Expanded view](img/screenshot2.png)

You can find out course information such as credits, description, requisites, search keywords, and subject. In addition, you can also view sections and subsections for each course (if the course has subsections).

## Problem 2 (1.5 points)

Required: `src/SearchAndFilter.js`

For this problem, you will be designing a search and filter method to decide which courses to display given a variety of inputs:

- **(0.5 points) Credits**: only display courses that have an amount of credits within the selected credit range
- **(0.5 points) Subject**: only display courses that match the selected subject
- **(0.5 points) Search**: only display courses that have a keyword that contains (or is) the user input from the search bar.

Providing multiple fields (e.g. both credits and subject) will return the intersection of the sets.

## Problem 3 (2.5 points)

Recommended: Modifications to `App.js` `CourseArea.js` `Course.js` `Section.js` `Subsection.js` and/or additional Component(s)

For this problem, you will be creating a cart that users can **add** courses to and **remove** courses from.

### Add to cart (1 point)

The user should be able to add 3 slight variations of course information into the cart:

1. A course with **all sections and subsections**
2. A course with **one specific section** of a course with **all subsections**
3. A course with **one specific section** that contains **one specific subsection**.

For example, if course `CS 571` has section `Section 1` with subsections `Subsection 1` and `Subsection 2`, the user should be able to add either of the following with the format of: course -> sections -> subsections with one action (such as a button click)

1. `CS 571` -> `All` -> `All`
2. `CS 571` -> `Section 1` -> `All`
3. `CS 571` -> `Section 1` -> `Subsection 1`

### Remove from cart (1 point)

The user should be able to remove 3 slight variations of course information from the cart:

1. A course with **all sections and subsections**
2. A course with **one specific section** of a course with **all subsections**
3. A course with **one specific section** that contains **one specific subsection**.

For example, if course `CS 571` has section `Section 1` with subsections `Subsection 1` and `Subsection 2`, the user should be able to remove either of the following with the format of: course -> sections -> subsections with one action (such as a button click)

1. `CS 571` -> `All` -> `All`
2. `CS 571` -> `Section 1` -> `All`
3. `CS 571` -> `Section 1` -> `Subsection 1`

### View courses in cart (0.5 points)

The user should be able to view which courses are in the cart. From the cart, users should be able to remove courses as described above. For a course that only has some sections and/or subsections added to the cart, you can choose to display only these sections/subsections, or the data for the entire course while making it clear which sections/subsections the user has and has not added to the cart. When a course has been removed from the course, it should disapear immediately from the cart without any additional action from the user.

---

**Run `npm install` in the terminal after cloning to automatically install needed npm packages**

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Potentially Helpful Links

- [Getting an Object's values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)
- [Getting an Object's keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
- [An Array's forEach() method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- [forEach() with Arrays of Objects](https://stackoverflow.com/questions/16626735/how-to-loop-through-an-array-containing-objects-and-access-their-properties)
- [Pushing elements onto an Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
- [Joining Array elements into a String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
- [String to Int (parseInt())](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
- [React Bootstrap Modal View](https://react-bootstrap.github.io/components/modal/)
- [React Bootstrap Accordion view ](https://react-bootstrap.github.io/components/accordion/)
