import React from 'react'
import '../styles/Search.css'
import axios from 'axios'
import CardContainer from './CardContainer'
import PageButtons from './PageButtons'
import Loader from './loader.gif'

class Search extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            query: '',
            results: {},
            loading: false,
            message: '',
            totalResults: 0,
            totalPages: 0,
            currentPageNr: 0,
        }

        this.cancel = ''
        this.handlePageClick = this.handlePageClick.bind(this)
    }

    getPageCount = (total, denom) => {
        const divisable = 0 === total % denom
        const toBeAdded = divisable ? 0 : 1
        return Math.floor(total/denom) + toBeAdded
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
            const total = res.data.count
            const totalPagesCount = this.getPageCount(total, 10)
            const resultNotFoundMsg = ! res.data.count
                                    ? 'There are no search results, please try another search.'
                                    : ''
            this.setState({
                results: res.data.artObjects,
                message: resultNotFoundMsg,
                totalResults: total,
                totalPages: totalPagesCount,
                currentPageNr: updatedPageNr,
                loading: false
            })
        })
        .catch(error => {
            if(axios.isCancel(error) || error){
                this.setState({
                    loading: false,
                    message: 'Failed to fetch data',
                })
            }
        })
    }

    handleInputChange = (event) => {
        const query = event.target.value
        if(! query) {
            this.setState({query, results: {}, message: '', totalPages: 0, totalResults: 0})
        }else{
            this.setState( { query: query, loading: true, message: '' }, () => {
                this.fetchSearchResults(1, query)
            })
        }
    }

    handlePageClick = (type, event) => {
        event.preventDefault()
        const updatePage = 'prev' === type 
            ? this.state.currentPageNr -1 
            : this.state.currentPageNr +1

        if( ! this.state.loading ) {
            this.setState({loading: true, message: ''}, () => {
                this.fetchSearchResults(updatePage, this.state.query)
            })
        }
    }

    render() {
        const { query, loading, message, currentPageNr, totalPages } = this.state

        const showPrevBtn = currentPageNr > 1
        const showNextBtn = totalPages > currentPageNr

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
            	<PageButtons 
                    loading={this.state.loading}
                    showPrevBtn={showPrevBtn}
                    showNextBtn={showNextBtn}
                    handlePrevClick={(event) => this.handlePageClick('prev', event)}
                    handleNextClick={(event) => this.handlePageClick('next', event)}
                />
                <CardContainer 
                    state={this.state}
                />
            	<PageButtons 
                    loading={this.state.loading}
                    showPrevBtn={showPrevBtn}
                    showNextBtn={showNextBtn}
                    handlePrevClick={(event) => this.handlePageClick('prev', event)}
                    handleNextClick={(event) => this.handlePageClick('next', event)}
                />
            </div>
        )
    }
}

export default Search