import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import Style from './index.scss'

function Page1 () {
  const [ counter, setCounter ] = useState(1)
  return (
    <div>
      <p>counter: {counter}</p>
      <button onClick={() => {
        setCounter(val => val + 1)
      }}>add</button>
      <button onClick={() => {
        setCounter(val => val - 1)
      }}>subtract</button>
    </div>
  )
}

class Page2 extends Component {
  componentDidMount() {
    fetch('/api/userInfo').then(res => console.log(res)).catch(err => console.log(err))
  }
  render() {
    console.log('Page2');
    return (
      <div>
        Page2
      </div>
    );
  }
}


function App () {
  return (
    <div className={Style.container}>
      <Page1 />
      <Page2 />
    </div>
  )
}


render(<App />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}
