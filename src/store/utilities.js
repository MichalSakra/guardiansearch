export
const searchParamsContructor = (inputValue, currentSection, currentPage) => {

    let queryParams

    if (inputValue) {
        queryParams = `&q=${inputValue.split(/[^A-Za-z0-9]/).filter(i => i).join(",")}`
    }
    if (currentSection) {
        queryParams += `&section=${currentSection.id}`
    }
    if (currentPage) {
        queryParams += `&page=${currentPage}`
    }
    return queryParams
}