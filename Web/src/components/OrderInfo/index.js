import React, { useEffect, useState } from 'react';
import { format, parseISO, isValid } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdClose, MdInsertPhoto } from 'react-icons/md';

import { Container, Content, Info, Dates, Signature } from './styles';

export default function OrderInfo({ data, visible }) {
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState({ start_date: data.start_date });
  const [endDate, setEndDate] = useState({ endDate: data.end_date });

  useEffect(() => {
    async function validDate() {
      if (isValid(parseISO(data.start_date))) {
        setStartDate({
          ...startDate,
          start_date: format(parseISO(data.start_date), "d 'de' MMMM", {
            locale: pt,
          }),
        });
      }

      if (isValid(parseISO(data.end_date))) {
        setEndDate({
          ...endDate,
          end_date: format(parseISO(data.end_date), "d 'de' MMMM", {
            locale: pt,
          }),
        });
      }

      if (data.start_date && data.end_date === 'null') {
        setStartDate('');
        setEndDate('');
      }
    }

    validDate();
  }, [data, endDate, startDate]);

  function handleClose(_e) {
    setShow(!show);
  }

  if (visible === show) {
    return null;
  }

  return (
    <Container {...visible}>
      <Content>
        <Info>
          <div>
            <p>ORDER INFORMATION</p>
            <button type="button" onClick={e => handleClose(e)}>
              <MdClose size={20} color="#000" />
            </button>
          </div>
          <div className="info">
            <div>
              <span>Product: {data.product}</span>
            </div>

            <span className="addres">
              {`Street ${data.recipient.street}, ${data.recipient.number}`}
              <br />
              {data.recipient.city} - {data.recipient.state}
              <br />
              {data.recipient.zipcode}
            </span>
          </div>
        </Info>

        <Dates>
          <p>DATES</p>
          <div className="withdrawal">
            <h3>Withdrawal:</h3>
            <span>
              {startDate.start_date
                ? startDate.start_date
                : 'No withdrawal date'}
            </span>
          </div>
          <div>
            <h3>DELIVERY:</h3>
            <span>
              {endDate.end_date ? endDate.end_date : 'No delivery date'}
            </span>
          </div>
        </Dates>

        <Signature>
          <p>RECIPIENT SIGNATURE</p>
          <div>
            <img
              src={
                data.signature ? (
                  data.signature.url
                ) : (
                  <MdInsertPhoto size={30} color="#999" />
                )
              }
              alt=""
            />
          </div>
        </Signature>
      </Content>
    </Container>
  );
}
