class SearchAndFilter {
  searchAndFilter(courses, search, subject, minimumCredits, maximumCredits) {
    if (subject === "All" && minimumCredits === "" && maximumCredits === "") {
      return courses.filter((course) =>
        course.keywords.join().includes(search.trim())
      );
    }
    if (subject === "All" && minimumCredits !== "" && maximumCredits === "") {
      return courses
        .filter((course) => course.keywords.join().includes(search.trim()))
        .filter((course) => course.credits >= parseInt(minimumCredits));
    }
    if (subject === "All" && minimumCredits === "" && maximumCredits !== "") {
      return courses
        .filter((course) => course.keywords.join().includes(search.trim()))
        .filter((course) => course.credits <= parseInt(maximumCredits));
    }
    if (subject === "All" && search === "") {
      return courses.filter(
        (course) =>
          course.credits >= parseInt(minimumCredits) &&
          course.credits <= parseInt(maximumCredits)
      );
    }
    if (subject === "All") {
      return courses
        .filter((course) => course.keywords.join().includes(search.trim()))
        .filter(
          (course) =>
            course.credits >= parseInt(minimumCredits) &&
            course.credits <= parseInt(maximumCredits)
        );
    }
    if (search === "" && minimumCredits === "" && maximumCredits === "") {
      return courses.filter((course) => course.subject === subject);
    }
    if (search === "" && minimumCredits === "" && maximumCredits !== "") {
      return courses
        .filter((course) => course.subject === subject)
        .filter((course) => course.credits <= parseInt(maximumCredits));
    }
    if (search === "" && minimumCredits !== "" && maximumCredits === "") {
      return courses
        .filter((course) => course.subject === subject)
        .filter((course) => course.credits >= parseInt(minimumCredits));
    }
    if (minimumCredits === "" && maximumCredits === "") {
      return courses
        .filter((course) => course.keywords.join().includes(search.trim()))
        .filter((course) => course.subject === subject);
    }
    if (search === "") {
      return courses
        .filter((course) => course.subject === subject)
        .filter(
          (course) =>
            course.credits >= parseInt(minimumCredits) &&
            course.credits <= parseInt(maximumCredits)
        );
    }
    if (minimumCredits === "" && maximumCredits !== "") {
      courses.filter((course) => course.credits <= parseInt(maximumCredits));
    }
    if (maximumCredits === "" && minimumCredits !== "") {
      courses.filter((course) => course.credits >= parseInt(minimumCredits));
    }
    return courses
      .filter((course) => course.subject === subject)
      .filter((course) => course.keywords.join().includes(search.trim()))
      .filter(
        (course) =>
          course.credits >= parseInt(minimumCredits) &&
          course.credits <= parseInt(maximumCredits)
      );
  }
}

export default SearchAndFilter;
