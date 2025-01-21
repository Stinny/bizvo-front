import { InputAdornment, TextField } from '@mui/material';
import React from 'react';
import { NumericFormat } from 'react-number-format';

const AmountIn = ({ setAmount, amount }) => {
  const handleValueChange = (values) => {
    const { formattedValue, value } = values;
    console.log('Formatted Value:', formattedValue);
    console.log('Raw Value:', value);
    setAmount(value);
  };

  const CustomInput = React.forwardRef((props, ref) => (
    <input
      ref={ref}
      {...props}
      className="text-xs w-full bg-gray-50 border border-gray-200 focus:outline-none hover:bg-gray-200 focus:bg-gray-200 hover:border-gray-200 focus:border-gray-200 focus:ring-0 text-stone-800 ring-0 rounded-md p-2 pl-0.5"
    />
  ));

  return (
    <NumericFormat
      value={amount}
      customInput={CustomInput}
      thousandSeparator=","
      decimalSeparator="."
      decimalScale={2}
      fixedDecimalScale={true}
      prefix="$"
      allowNegative={false}
      onValueChange={handleValueChange}
    />
  );
};

export default AmountIn;
