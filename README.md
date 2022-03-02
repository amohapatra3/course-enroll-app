# Course search and enroll

This **ReactJS** application was made for a class project. Use this application to learn more about some courses offered by the University of Wisconsin-Madison.

## Overview

You can use this application to view course information, filter courses based on parameters, add courses to cart, and remove courses from the cart.

---

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

---

## Viewing course information

Each course is listed in an accordion display with a name and number, as shown below.

![Course List](img/screenshot1.png)

Click on the course you want more information on. You will see an expanded view, as shown below.

![Expanded view](img/screenshot2.png)

The expanded view displays course information such as credits, description, requisites, search keywords, and subject. In addition, the view lists sections and subsections for each course (if the course has subsections).

---

## Using the search feature

You can use the search feature to filter the course list based on specific parameters, as seen in the expanded view. The parameters include search keywords, subject, and credits.

Enter a keyword in the search bar to only see courses tagged with the entered keyword.

Select a subject from the dropdown menu to filter the course list by the selected subject.

Specify a range of credits to see courses within the credit range, maximum and minimum inclusive.

If either value is unspecified, the other is assumed as a bound. For example, only specifying a minimum of 3 credits will display all courses with 3 credits or more.

Specifying only a maximum of 3 credits will display courses with 3 credits or less.

---

## Utilizing the cart feature

The application allows you to add or remove courses from a cart. This simulates real course enrollment systems.

To use the cart, click on the **Cart** tab on the top left corner of the page. You can toggle between **Search** and **Cart** by clicking on either tab.

### Adding to cart

You can add courses to the cart in 3 different configurations:

1. Add all sections and subsections of a course.
2. Add a specific section and all subsections within that section.
3. Add a specific subsection of the course.

Follow these steps to add a course to the cart:

1. Click the course you want to add to the cart.
2. The expanded view will show the same information as in the **Search** tab, with the addition of buttons.
3. Click a button based on what course configuration you want to add to the cart.

   - Click **Add course to cart** to add a course and all its sections and subsections to the cart.

   **Note:** You will not be able to add individual course sections or subsections to the cart after this action.

   - Click **Add section to cart** to add a specific section of the course, along with all its subsections.

   **Note:** You will not be able to indidivually add subsections of the added section to the cart after this action.

   - Click **Add subsection to cart** to add a specific course subsection to the cart.

4. After clicking a button, you will be able to see course information in your cart on the right hand side of the page. This information will reflect the button you clicked. New additions will append to the end of the list.

### Removing from cart

Click **Remove from cart** to remove courses from the cart.
