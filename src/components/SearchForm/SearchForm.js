
import Creatable from 'react-select'
import classes from "./SearchForm.module.sass"
const SearchForm = props => {

    const { sectionChange, submitForm, inputChange } = props.handlers

    return <form className={classes.Form} onSubmit={submitForm}>
        <input value={props.inputValue} onChange={inputChange} className={classes.Input} type="text" />
        <Creatable className={classes.Select} placeholder="All" onChange={sectionChange} isClearable={true} onMenuOpen={props.options.length === 0 ? () => props.fetchOptions() : null} options={props.options} defaultOptions cacheOptions loadOptions={props.loadOptions} />
        <button className={classes.Button}>OK</button>
    </form>
}

export default SearchForm