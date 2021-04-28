import { useContext } from 'react'
import Creatable from 'react-select'
import classes from "./SearchForm.module.sass"
import Context from "../../store/context"
const SearchForm = props => {
    const { onSubmitForm, onSectionChange, fetchOptions, onInputChange, options, inputValue } = useContext(Context);


    return <form className={classes.Form} onSubmit={onSubmitForm}>
        <input value={inputValue} onChange={onInputChange} className={classes.Input} type="text" />
        <Creatable className={classes.Select} placeholder="All" onChange={onSectionChange} isClearable={true} onMenuOpen={options.length === 0 ? () => fetchOptions() : null} options={options} />
        <button className={classes.Button}>OK</button>
    </form>
}

export default SearchForm