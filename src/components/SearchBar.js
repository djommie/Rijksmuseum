import React from "react"
import Loader from './images/loader.gif'

function SearchBar({query, loading, message, handleInputChange}) {

    return (
        <div className='search-container'>
                <label className='search-label' htmlFor='search-input'>
                    <input 
                        type='text'
                        value={query}
                        name='query'
                        id='search-input'
                        placeholder='Search...'
                        onChange={handleInputChange}
                    />
                    <i className="fas fa-search search-icon"/>
                </label>

                { message && <p className='message'>{message}</p>}

                <img src={Loader} className={`search-loading ${ loading ? 'show' : 'hide'}`}  alt='loader'/>
        </div>
    )
}

export default SearchBar