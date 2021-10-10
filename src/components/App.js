import React from 'react'
import '../styles/style.css'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import NavBar from './NavBar'
import Footer from './Footer'
import CardContainer from './CardContainer'
import PageButtons from './PageButtons'
import SearchBar from './SearchBar'
import PieceDetails from './PieceDetails'
import RoutePlanner from './RoutePlanner'

class App extends React.Component {

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
            pieceSwitchList: '',
            viewPieces: [],
            viewPiecesIds: []
        }

        this.cancel = ''
        this.handlePageClick = this.handlePageClick.bind(this)
    }
    
    fetchSearchResults = (updatedPageNr, query) => {
        const API_KEY = 'zZD0atBG'
        const pageNr = updatedPageNr ? `&p=${updatedPageNr}` : ''
        const APIUrl = `https://www.rijksmuseum.nl/api/nl/collection?key=${API_KEY}&imgonly=True&ps=30&q=${query}${pageNr}`

        if (this.cancel) {
            this.cancel.cancel()
        } 

        this.cancel = axios.CancelToken.source()

        axios.get(APIUrl, {
            cancelToken: this.cancel.token
        })
        .then( res => {
            const total = res.data.count
            const totalPagesCount = this.getPageCount(total, 30)
            const resultNotFoundMsg = ! res.data.count
                                    ? 'There are no search results, please try another search.'
                                    : ''
            const pieceSwitchList = this.getPieceSwitchList(res.data.artObjects)
            this.setState({
                results: res.data.artObjects,
                message: resultNotFoundMsg,
                totalResults: total,
                totalPages: totalPagesCount,
                currentPageNr: updatedPageNr,
                loading: false,
                pieceSwitchList: pieceSwitchList
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

    getPageCount = (total, denom) => {
        const divisable = 0 === total % denom
        const toBeAdded = divisable ? 0 : 1
        return Math.floor(total/denom) + toBeAdded
    }

    getPieceSwitchList = (results) => {
        const pieceSwitchList = results.map((result, index) =>{
            return(
                <Route path={`/${result.objectNumber}`}>
                    <PieceDetails 
                        objectNumber={result.objectNumber}
                        webImageUrl={result.webImage.url}                
                        addPieceToView={this.addPieceToView}
                        key={index}
                    />
                </Route>
            )
        })
        return pieceSwitchList
    }

    createSortable = (location) => {
        const sliced = location.slice(3)
        const sortable = sliced.split('.')
        const sortables = sortable.map(item => parseInt(item))
        return sortables
      }

    addPieceToView = (id, longTitle, location) => {
        if (! this.state.viewPiecesIds.includes(id)){
            const sortables = this.createSortable(location)
            this.setState(prevState => {
                const updatedViewPieces = prevState.viewPieces.concat({
                    id,
                    longTitle,
                    location,
                    sortables,
                    })
                const updatedViewPiecesIds = prevState.viewPiecesIds.concat(id)
                    return {
                        viewPieces: updatedViewPieces,
                        viewPiecesIds: updatedViewPiecesIds
                    }
            })
        }else{
            alert('Dit stuk is al toegevoegd aan de route!')
        }
    }

    removePieceFromView = (id) => {
        this.setState(prevState => {
            let updatedViewPieces = prevState.viewPieces.filter(viewPiece => viewPiece.id !== id)
            let updatedViewPiecesIds = prevState.viewPiecesIds.filter(viewPieceId => viewPieceId !== id)
            return {
                viewPieces: updatedViewPieces,
                viewPiecesIds: updatedViewPiecesIds
            }
        })
    }


    render() {
        const { query, loading, message, currentPageNr, totalPages, pieceSwitchList } = this.state

        const showPrevBtn = currentPageNr > 1
        const showNextBtn = totalPages > currentPageNr

        return (
            < Router >
                <div className='page-container'>
                    <NavBar />
                    <Switch>
                        {pieceSwitchList}
                        <Route path='/route-planner'>
                            <RoutePlanner 
                                viewPieces={this.state.viewPieces}
                                removePieceFromView={this.removePieceFromView}
                            />
                        </Route>
                        <Route path='/'>
                            <SearchBar 
                                query={query}
                                loading={loading}
                                message={message}
                                handleInputChange={this.handleInputChange}
                            />
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
                        </Route>
                    </Switch>
                    <Footer />
                </div>
                
            </Router>
        )
    }
}

export default App