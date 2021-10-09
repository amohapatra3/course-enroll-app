class SearchAndFilter {
  searchAndFilter(courses, search, subject, minimumCredits, maximumCredits) {
    if (
      subject === "All" &&
      ((minimumCredits === "" && maximumCredits === "") ||
        minimumCredits === "" ||
        maximumCredits === "")
    ) {
      return courses.filter((course) =>
        course.keywords.join().includes(search.trim())
      );
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
    if (
      search === "" &&
      ((minimumCredits === "" && maximumCredits === "") ||
        minimumCredits === "" ||
        maximumCredits === "")
    ) {
      return courses.filter((course) => course.subject === subject);
    }

    if (
      (minimumCredits === "" && maximumCredits === "") ||
      minimumCredits === "" ||
      maximumCredits === ""
    ) {
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
