import { useEffect, useContext } from "react"
import Header from "./components/Header/Header"
import SearchForm from './components/SearchForm/SearchForm';
import Posts from "./components/Posts/Posts"
import Context from "./store/context"


const App = () => {

  const context = useContext(Context);

  useEffect(() => {
    context.showContent()

  }, [])

  return (
    <div>
      <Header />
      <div className="App">
        <SearchForm handlers={{
          sectionChange: context.onSectionChange,
          inputChange: context.onInputChange,
          submitForm: context.onSubmitForm
        }} inputValue={context.inputValue} options={context.options} fetchOptions={context.fetchOptions} />
      </div>
      <Posts posts={context.posts || []} />
    </div>
  );
}

export default App;
