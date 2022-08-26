import s from './FormTransaction.module.css';

import { addExpenseTransaction } from '../../redux/transaction/transaction-operations';
import { useDispatch } from 'react-redux';

import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import options from './ExpensesCategories';

const FormTransaction = () => {
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();

  const handleChange = e => {
    const { value } = e.target;
    setDescription(value);
  };

  const handleChangeAmount = e => {
    const { value } = e.target;
    setAmount(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const initialForm = {
      description,
      amount,
      date: date.toISOString().slice(0, 10),
      category: category.value,
    };

    dispatch(addExpenseTransaction(initialForm));

  };


  return (
        <form onSubmit={handleSubmit} className={s.form}>
          <span className={s.calendarIcon}></span>

          <DatePicker
            dateFormat="dd.MM.yyyy"
            className={s.date}
            selected={date}
            onChange={(date: Date) => setDate(date)}
          />
          <label>
            <input
              className={s.input}
              type="text"
              name="description"
              placeholder="Product category"
              required
              value={description}
              onChange={handleChange}
            />
          </label>
          <Select
            placeholder="Product category"
            className={s.select}
            classNamePrefix={s.selectList}
            defaultValue={category}
            onChange={setCategory}
            options={options}
          />
          <label>
            <input
              className={s.input}
              type="number"
              name="number"
              pattern="^[1-9]\d*$"
              required
              value={amount}
              onChange={handleChangeAmount}
            />
          </label>
          <button type="submit" className={s.buttonInput}>
            Input
          </button>
          <button
            type="button"
            className={s.buttonClear}
            onClick={() => (
              setDate(new Date()),
              setDescription(''),
              setCategory(null),
              setAmount(0)
            )}
          >
            Clear
          </button>
        </form>
  );
};

export default FormTransaction;