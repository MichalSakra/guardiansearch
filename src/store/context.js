import React, { useState } from 'react';
import { searchParamsContructor } from "./utilities"
import axios from "../axios"
const Context = React.createContext({
    options: [],
    currentSection: null,
    inputValue: "",
    posts: [],
    currentPage: null,
    onSubmitForm: () => { },
    onInputChange: () => { },
    onSectionChange: () => { },
    fetchOptions: () => { }

})
export const ContextProvider = props => {
    const [options, setOptions] = useState([])
    const [currentSection, setCurrentSection] = useState(null)
    const [inputValue, setInputValue] = useState("")
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(null)
    const showContent = (queryParams = "") => {
        axios.get(`/search?${process.env.REACT_APP_API_KEY}${queryParams}`)
            .then(res => res)
            .then(({ data }) => {
                setCurrentPage(data.response.startIndex)
                setPosts(data.response.results)
            })
    }
    const fetchOptions = () => {
        axios.get(`/sections?${process.env.REACT_APP_API_KEY}`)
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
    const submitFormHandler = e => {
        e.preventDefault()
        const queryParams = searchParamsContructor(inputValue, currentSection, currentPage)
        showContent(queryParams)
        setCurrentPage(null)
    }
    const changeInputValueHandler = e => {
        setInputValue(e.target.value)
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
    return <Context.Provider value={{
        options,
        currentSection,
        inputValue,
        posts,
        currentPage,
        onSubmitForm: submitFormHandler,
        onInputChange: changeInputValueHandler,
        onSectionChange: changeSectionValueHandler,
        fetchOptions: fetchOptions,
        showContent: showContent
    }}> {
            props.children
        } </Context.Provider>

}



export default Context