# Rijks museum Routeplanner

This is a React application that uses the RijksMuseum API.
Using a dynamic search function the user may look for their favorite art pieces, by name or by artist.
When the user finds a piece they like, they can click the corresponding card to see more available information.
This information includes whether or not this piece is currently being displayed in the museum,
if so the user can add this item to the route planner with a click of the button.
At the Routeplanner tab, the user can find their selected pieces and their location, sorted in the ideal order.

## Dependencies

**Axios**
npm install axios

Used mainly for it's easy acces to a cancel token, used in the dynamic search to not flood the server.
Also returns JSON by default, but that's just gravy.

**React Router**

npm install react-router-dom

React's easy to use way of Linking to other components.

## Nice problem solving

### Dynamic search

We created a function that looks for a value in the search bar, when nothing is found it sets all relevant state to empty

    `this.setState({query, results: {}, message: '', totalPages: 0, totalResults: 0})`

but if a query is found it updates the state with the query and also changes loading to true, 
this is used to show a loading screen. We then use a callback function to call the fetch function to the first page.

    `this.setState( { query: query, loading: true, message: '' }, () => {this.fetchSearchResults(1, query)}`

Next we have the fetchSearchresults function, it takes a pagenumber and a query.
We use this data to figure are the URL we need for the fetching 

``` 
    const API_KEY = 'zZD0atBG'
    const pageNr = updatedPageNr ? `&p=${updatedPageNr}` : ''
    const APIUrl = `https://www.rijksmuseum.nl/api/nl/collection?key=${API_KEY}&imgonly=True&ps=30&q=${query}${pageNr}`
```


### My notes

Using axios for cancel token, to make sure the search query doesnt get made multiple times while typing so we dont flood the server.

### Know issues

Why is this slow, the images probably all need to be loaded full resolution every render.

Warning: Each child in a list should have a unique "key" prop.

React Hook useEffect has a missing dependency: 'detailsApi'. Either include it or remove the dependency array

<p className='piecedetails-places'>{typeof productionPlaces !== 'undefined' && productionPlaces.length > 0 ? `Dit stuk is gemaakt in ${productionPlaces}` : ''}</p>