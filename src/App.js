import { useState, useEffect } from "react"
import axios from './axios'
import Header from "./components/Header/Header"
import SearchForm from './components/SearchForm/SearchForm';
import Posts from "./components/Posts/Posts"




const App = () => {
  const API_KEY = "api-key=dca6d006-bd98-45cb-be08-3eb788ed6009"


  const [options, setOptions] = useState([])
  const [currentSection, setCurrentSection] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(null)


  const showContent = (queryParams = "") => {


    axios.get(`/search?${API_KEY}${queryParams}`)
      .then(res => res)
      .then(({ data }) => {
        setCurrentPage(data.response.startIndex)
        setPosts(data.response.results)
      })

  }

  useEffect(() => {

    showContent()

  }, [])



  const fetchOptions = () => {
    axios.get(`/sections?${API_KEY}`)
      .then(res => res)
      .then(({ data }) => {
        setOptions(data.response.results.map(section => {
          return {
            label: section.webTitle,
            value: section.webTitle,
            id: section.id
          }
        }))
      })

  }

  const changeSectionValueHandler = (value, { action }) => {

    switch (action) {
      case "select-option":
        return setCurrentSection(value)
      case "clear":
        return setCurrentSection(null)

      default:
        return null
    }
  }

  const changeInputValueHandler = e => {
    setInputValue(e.target.value)
  }

  const searchParamsContructor = () => {

    let queryParams

    if (inputValue) {
      queryParams = `&q=${inputValue.split(/[^A-Za-z0-9]/).filter(i => i).join(",")}`
    }
    if (currentSection) {
      queryParams += `&section=${currentSection.id}`
    }
    if (currentPage) {
      queryParams += `page=${currentPage}`
    }
    return queryParams
  }

  const submitFormHandler = e => {
    e.preventDefault()


    const queryParams = searchParamsContructor()

    showContent(queryParams)
    setCurrentPage(null)

  }



  return (
    <div>
      <Header />
      <div className="App">
        <SearchForm handlers={{
          sectionChange: changeSectionValueHandler,
          inputChange: changeInputValueHandler,
          submitForm: submitFormHandler
        }} inputValue={inputValue} options={options} fetchOptions={fetchOptions} />
      </div>
      <Posts posts={posts || []} />
    </div>
  );
}

export default App;
