# Rijks museum Routeplanner

This is a React application that uses the RijksMuseum API.
Using a dynamic search function the user may look for their favorite art pieces, by name or by artist.
When the user finds a piece they like, they can click the corresponding card to see more available information.
This information includes whether or not this piece is currently being displayed in the museum,
if so the user can add this item to the route planner with a click of the button.
At the Routeplanner tab, the user can find their selected pieces and their location, sorted in the ideal order.

## Dependencies

### Axios

**npm install axios**

    Used mainly for it's easy acces to a cancel token, used in the dynamic search to not flood the server.
    Also returns JSON by default, but that's just gravy.

### React Router

**npm install react-router-dom**

    React's easy to use way of Linking to other components.

## Nice problem solving

### Dynamic search

We created a function that looks for a value in the search bar, when nothing is found it sets all relevant state to empty

`this.setState({query, results: {}, message: '', totalPages: 0, totalResults: 0})`

but if a query is found it updates the state with the query and also changes loading to true, 
this is used to show a loading screen. We then use a callback function to call the fetch function to the first page.

`this.setState( { query: query, loading: true, message: '' }, () => {this.fetchSearchResults(1, query)}`

Next we have the `fetchSearchResults` function, it takes a pagenumber and a query.
We use this data to figure are the URL we need for the fetching 

``` 
const API_KEY = 'zZD0atBG'
const pageNr = updatedPageNr ? `&p=${updatedPageNr}` : ''
const APIUrl = `https://www.rijksmuseum.nl/api/nl/collection?key=${API_KEY}&imgonly=True&ps=30&q=${query}${pageNr}`
```
The API key is stored in a const, but could be stored somewhere more secure if needed.
We use template literals to add our key, the query and a pagenumber(only if needed) to our API URL. 

We then use the axios cancel token exactly how its described in their documentation and fetch our data with the API URL.

To find out how many pages of results we have we use a handy little helper function,
It checks if the total amount of results is divisable by the amount of results diplayed per page and if not adds an extra page
for the remaining results.

```
getPageCount = (total, denom) => {
    const divisable = 0 === total % denom
    const toBeAdded = divisable ? 0 : 1
    return Math.floor(total/denom) + toBeAdded
    }
```

We then set the state with all the relevant information, including a message that can be displayed when there are no results found,
and we use the `getPieceSwitchList` function to add links to all the detail pages for all results currently in state.

And at last we add an error message to state in case we cannot fetch any data.

### Add and remove pieces from routeplanner

We need to be able to add a piece to state so it can be sorted and displayed in our routeplanner.

We use the state created when fetching the extensive details on our details page and use the relevant information as input.
We check if the id already exists in our state and if so update our state to include the piece's relevant information.

```    
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
```
We give an alert if the piece already exists in state

To remove the piece from the routeplanner we use a simple `filter` function and update the state to the newly filtered state.

### Sort by location

We need to be able to sort the items in the routeplanner by location.
The locations are formatted as follows:
- either like: "HG-2.30.1"
- or :"HG-1.18"

So we need to remove the first 3 characters and then sort first by the first character, then the second and then the third.

First we needed to convert the location to something sortable, so integers, in a list and add them to the item in state.

```
    createSortable = (location) => {
        const sliced = location.slice(3)
        const sortable = sliced.split('.')
        const sortables = sortable.map(item => parseInt(item))
        return sortables
      }
```

We use this to add sortables to the item, snippet from `AddPieceToView`:

`const sortables = this.createSortable(location)`

We use a nice sort function to sort all the pieces currently in the viewpieces that we have now received through props

```
    const sortedPieces = props.viewPieces.sort((a, b) => {
        return cmp(a.sortables[0], b.sortables[0]) || cmp(a.sortables[1], b.sortables[1]) || cmp(a.sortables[2], b.sortables[2])
      })
```

with the help of 

`const cmp = (a, b) => (a > b) - (a < b)`

We then use a `map` function to return an array of objects to display the sorted items, including the attached `removePieceFromView` function

### Conditionally show info, when its there, don't when it's not.

Not all pieces contain the same info, for some we can show where it was made for example and for some we cannot.

```<p className='piecedetails-places'>{typeof productionPlaces !== 'undefined' && productionPlaces.length > 0 ? `Dit stuk is gemaakt in ${productionPlaces}` : ''}</p>```

Nothing to fancy, but a nice way to show info or not, with just one line.

### Show and hide

When loading is set to true in state we show a loader.

```
<img src={Loader} className={`search-loading ${ loading ? 'show' : 'hide'}`}  alt='loader'/>

.show {
    display: inline-block;
}

.hide {
    display: none;
}

```

### Know issues

When searching on the main page the loading is extremely slow, likely because the images provided in the API,
which are used for the cards are very high resolution and the need to be completely loaded every time the card container renders.

Warning: Each child in a list should have a unique "key" prop.

React Hook useEffect has a missing dependency: 'detailsApi'. Either include it or remove the dependency array

### ToDo

[] Scaling for different resolutions
[] Finetune styling