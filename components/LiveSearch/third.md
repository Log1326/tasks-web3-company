I will make two examples for comparison.
The first one will be using useDebounce.
The second is using the built-in useDeferredValue hook.
The react documentation indicates that for such cases it is better to use the useDeferredValue hook

First example with hook useDebounce and infinity scrolling and filtering options (region capital) -
[debounceComponent](live-search-with-debounce.tsx)

Second example with hook useDeferredValue and pagination -
[DeferredValueComponent](live-search-with-use-deferred-value.tsx)

## Setting Up the Environment:

Initialize a new Next.js project. ✅
Install any necessary dependencies (e.g., axios for API requests). ✅

## Component Requirements:

Create a React component named LiveSearch. ✅
The component should include a text input field for user queries. ✅
Implement state management to track the user's input. ✅

## API Integration:

Choose an appropriate public API for fetching data. For example, the REST Countries API (URL: https://restcountries.com/v2/all) can be used to fetch country data. ✅
Implement functionality to make an API request based on the user's input. This request should be debounced to avoid excessive API calls. ✅

## Filtering Results:

The component should filter the results from the API request based on the user’s input. ✅
Display the filtered results in a list or grid format below the input field. ✅

## User Interface and Experience:

Ensure the UI is clean and user-friendly. ✅
Implement responsive design so it works well on different screen sizes.✅
(Optional) Add loading indicators or placeholders while data is being fetched.✅

## Error Handling:

Implement error handling for the API requests.✅
Display appropriate feedback to the user in case of an error or no results found.✅

## Documentation:

Comment your code to explain your logic and decisions. ✅
Include a README file explaining how to set up and run the project. ✅

## Bonus Challenges (Optional):

Implement pagination or infinite scrolling for the results. ✅
Add advanced filtering options (e.g., sort by name, region).✅
Write unit tests ✅
