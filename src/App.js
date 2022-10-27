import React, { useState, useEffect, useRef } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const ratesRef = useRef({});
  // const [rates, setRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);


  useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
      .then(res => res.json())
      .then(res => {
        // setRates(res.rates)
        ratesRef.current = res.rates
        onChangeToPrice(1)
      })

      .catch(err => console.log(err))

  }, [])

  useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrency])

  useEffect(() => {
    onChangeToPrice(toPrice)
  }, [toCurrency])

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setFromPrice(value)
    setToPrice(result.toFixed(3))
  }

  const onChangeToPrice = (value) => {
    const price = value / ratesRef.current[toCurrency];
    const result = price * ratesRef.current[fromCurrency];
    setToPrice(value)
    setFromPrice(result.toFixed(3))
  }



  return (
    <div className="App">
      <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice} />
      <Block value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice} />
    </div>
  );
}

export default App;
