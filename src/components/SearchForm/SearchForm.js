import { useContext } from 'react'
import Creatable from 'react-select'
import classes from "./SearchForm.module.sass"
import Context from "../../store/context"
const SearchForm = props => {
    const context = useContext(Context);


    return <form className={classes.Form} onSubmit={context.onSubmitForm}>
        <input value={props.inputValue} onChange={context.onInputChange} className={classes.Input} type="text" />
        <Creatable className={classes.Select} placeholder="All" onChange={context.onSectionChange} isClearable={true} onMenuOpen={props.options.length === 0 ? () => props.fetchOptions() : null} options={props.options} defaultOptions cacheOptions loadOptions={props.loadOptions} />
        <button className={classes.Button}>OK</button>
    </form>
}

export default SearchForm