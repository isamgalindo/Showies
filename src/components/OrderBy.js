import React from 'react';
import '../CSS-files/OrderBy.css';
import Form from 'react-bootstrap/Form';
import { FormattedMessage, useIntl } from 'react-intl';

function GenreFilter({ selectedOrder, onOrderChange }) {
  
  const intl = useIntl();
  
  const ordenes = [intl.formatMessage({ id: "OB-name" }), intl.formatMessage({ id: "OB-date" })];
  
  return (
    <div className="orderBy-container" data-testid="orderBy-container">
      <div style={{ whiteSpace: 'nowrap' }}><FormattedMessage id="OB-order"/>:&nbsp;</div>
      <Form.Select
        className="form-control"
        value={selectedOrder}
        data-testid="orderBy-select"
        onChange={(e) => onOrderChange(e.target.value)}
      >
        <option value="">-</option>
        {ordenes.map((orden) => (
          <option key={orden} value={orden}>
            {orden}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}

export default GenreFilter;