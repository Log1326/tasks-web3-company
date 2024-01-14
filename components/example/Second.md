## In this component, we get infinite loop due to in our dependence in the useEffect

## we put the state of an empty array and therefore we will call our useEffect every time

## There will be two examples here

## The source code

const Example = () => {
const [data, setData] = useState([]);

useEffect(() => {
fetchData().then((fetchedData) => setData(fetchedData));
}, [data]); // dependency array to run the effect every time

async function fetchData() {
const response = await fetch('https://api-test.com/data');
const result = response.json();
return result;
}

return (
<div>
{data.map((item: any) => (
<div key={item.id}>{item.name}</div>
))}
</div>
);
};

## The correctly

const ExampleWithFixIssue = () => {
const [data, setData] = useState([]);
useEffect(() => {
// we can isolate our function to optimize and save memory.
async function fetchData() {
//we wrapped our code block to 'try catch' to detect errors.
try {
const response = await fetch('https://api-test.com/data');
// we need to use await to put our result in our state
const result = await response.json();
setData(result);
} catch (error) {
console.log('useEffect error:', error);
}
}
fetchData();
}, []); // Empty dependency array to run the effect only once

return (
<div>
{data.map((item: any) => (
<div key={item.id}>{item.name}</div>
))}
</div>
)
}
