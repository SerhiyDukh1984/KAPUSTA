import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Balance } from 'components/Balance/Balance';
import Paginator from 'components/Paginator/Paginator';
import s from './ReportsHeader.module.css';

const ReportsHeader = ({ month, setMonth, setCategory }) => {
  const navigate = useNavigate();

  const PaginatorPeriod = () => {
    const dateFormatStr = moment().add(month, 'month').format('MMMM YYYY');
    const onBtnPrevClick = () => {
      setMonth(prev => prev - 1);
      setCategory('');
    };
    const onBtnNextClick = () => {
      setMonth(prev => prev + 1);
      setCategory('');
    };
    return (
      <Paginator
        clickPrev={onBtnPrevClick}
        clickNext={onBtnNextClick}
        descr={dateFormatStr}
        disableNext={month === 0}
      />
    );
  };

  return (
    <div className={s.block}>
      <div className={s.wrapper}>
        <button className={s.btnPrevPage} onClick={e => navigate(-1)}></button>
        <p className={s.mainPage}>Main Page</p>
      </div>
      <Balance />
      <div className={s.blockMonth}>
        <p className={s.currentPeriod}>Current Period:</p>
        <PaginatorPeriod />
      </div>
    </div>
  );
};

ReportsHeader.propTypes = {
  month: PropTypes.number.isRequired,
  setMonth: PropTypes.func.isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default ReportsHeader;
