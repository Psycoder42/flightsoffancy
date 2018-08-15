# Flights of Fancy
Flights of Fancy is a site where guests can look up information on airports and flights from around the globe. If a guest decides to create an account, they are then able to save airports and flights to their account for easy look up later.

Try out the site for yourself at [https://flightsoffancy.herokuapp.com/](https://flightsoffancy.herokuapp.com/)

### Behind the curtain
This site was created with Ruby on Rails. It is supported by a Postgres database and implements a React front end. In addition, the CSS framework Bootstrap was used to simplify page layout.

### Design and build approach
We attacked this by dividing the work into back and front end sections. The idea was that the separation would allow the most efficient use of time since it almost totally eliminated the possibility of stepping on each other's toes. While the back end was incomplete, the front end work would use stubbed out data and as the back end became available it would be incorporated, replacing the stubbed out data.

### UI

### Site API
Because of the design approach we took, there is a fairly extensive search API available (more so than is apparent in the front end). Here is a quick break down of the search API:

##### Endpoints
The following search endpoints are available and can be called using an HTTP GET request

###### Single table searches
- `/countries/search`
- `/regions/search`
- `/airports/search`
- `/airlines/search`
- `/routes/search`

###### Composite searches
- `/places/search`
- `/flights/search`

All search endpoints also have an associated `/fields` endpoint to let you know the column names and types for that search. For example, if you want to know what information an airport search returns, you would sent and HTTP GET request to `/airports/search/fields`.

Every search field can be used as a search filter. When multiple fields are passed to the search endpoint, they are combined with AND to make a more specific search. All string type fields allow the `%` wildcard character to be included.

In addition to the fields, there are two additional parameters that can be passed that control the paging of the results. First is the number of results per page, `r`, which must be an integer from 5 to 50 inclusive. Second is the page of results to retrieve, `p`, which must be an integer greater than 0. For example, to return the second page of 15 results when searching all countries, you would request `/countries/search?r=15&p=2`. If a page is requested that is past the end of the results set, an empty array of results is returned. The paging parameters are optional and if not passed the default results per page is 10 and only the first page will be returned.

### Known issues
- There currently is no way to use OR in search conditions

### Potential future enhancements
- Add admin abilities (update database entries, manage users)
- Add map integrations to see where airports/flights are
- Add React Router to make navigating with browser controls work correctly

### Contributors
- Joseph Edmed
- Keith Swanson
