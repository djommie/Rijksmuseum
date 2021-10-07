import React from 'react'
import '../styles/Search.css'
import axios from 'axios'
import CardContainer from './CardContainer'
import Loader from './loader.gif'

class Search extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            query: '',
            results: {},
            loading: false,
            message: ''
        }

        this.cancel = ''
    }

    
    fetchSearchResults = (updatedPageNr, query) => {
        const API_KEY = 'zZD0atBG'
        const pageNr = updatedPageNr ? `&p=${updatedPageNr}` : ''
        const APIUrl = `https://www.rijksmuseum.nl/api/nl/collection?key=${API_KEY}&imgonly=True&q=${query}${pageNr}`

        if (this.cancel) {
            this.cancel.cancel()
        } 

        this.cancel = axios.CancelToken.source()

        axios.get(APIUrl, {
            cancelToken: this.cancel.token
        })
        .then( res => {
            const resultNotFoundMsg = ! res.data.count
                                    ? 'There are no search results, please try another search.'
                                    : ''
            this.setState({
                results: res.data.artObjects,
                message: resultNotFoundMsg,
                loading: false
            })
        })
        .catch(error => {
            if(axios.isCancel(error) || error){
                this.setState({
                    loading: false,
                    message: 'Failed to fetch data'
                })
            }
        })
    }

    handleInputChange = (event) => {
        const query = event.target.value
        if(! query) {
            this.setState({query, results: {}, message: ''})
        }else{
            this.setState( { query: query, loading: true, message: '' }, () => {
                this.fetchSearchResults(1, query)
            })
        }

    }

    render() {
        const { query, loading, message } = this.state
        return (
            <div className='search-container'>
                <h2 className='search-heading'>Search</h2>
                <label className='search-label' htmlFor='search-input'>
                    <input 
                        type='text'
                        value={query}
                        name='query'
                        id='search-input'
                        placeholder='Search...'
                        onChange={this.handleInputChange}
                    />
                    <i className="fas fa-search search-icon"/>
                </label>

                { message && <p className='message'>{message}</p>}

                <img src={Loader} className={`search-loading ${ loading ? 'show' : 'hide'}`}  alt='loader'/>

                <CardContainer 
                    state={this.state}
                />
            </div>
        )
    }
}

export default Search