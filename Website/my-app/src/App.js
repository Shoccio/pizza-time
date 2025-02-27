import pizza from './pizza.png'
import './App.css';

function SearchBox(){
  return(
    <input
            type="text"
            placeholder="Search..."
            style={{
                padding: '8px',
                width: '280px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                marginLeft: '5vmin',
                marginBottom: '2vmin'
            }}
        />
  )
}

function Table(){
  const rows = 20
  return(
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Status</th>
          <th>Date</th>
          <th>Payment Method</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({length: rows}).map((_, index) => (
        <tr key = {index}>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>          
        ))}

      </tbody>
    </table>
  )
}

function App() {
  return (
    <div>
      <header className="App-header">
        <p style={{margin: 0}}>
          <b>Order History</b> <img src={pizza} className='App-logo'></img>
        </p>
      </header>
      <SearchBox/>
      <Table/>
    </div>
  );
}

export default App;
