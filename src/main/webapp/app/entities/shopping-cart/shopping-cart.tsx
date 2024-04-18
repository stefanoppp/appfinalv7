import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './shopping-cart.reducer';

export const ShoppingCart = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const shoppingCartList = useAppSelector(state => state.shoppingCart.entities);
  const loading = useAppSelector(state => state.shoppingCart.loading);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?sort=${sortState.sort},${sortState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [sortState.order, sortState.sort]);

  const sort = p => () => {
    setSortState({
      ...sortState,
      order: sortState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="shopping-cart-heading" data-cy="ShoppingCartHeading">
        <Translate contentKey="storeApp.shoppingCart.home.title">Shopping Carts</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="storeApp.shoppingCart.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/shopping-cart/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="storeApp.shoppingCart.home.createLabel">Create new Shopping Cart</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {shoppingCartList && shoppingCartList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="storeApp.shoppingCart.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('placedDate')}>
                  <Translate contentKey="storeApp.shoppingCart.placedDate">Placed Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('placedDate')} />
                </th>
                <th className="hand" onClick={sort('status')}>
                  <Translate contentKey="storeApp.shoppingCart.status">Status</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('status')} />
                </th>
                <th className="hand" onClick={sort('totalPrice')}>
                  <Translate contentKey="storeApp.shoppingCart.totalPrice">Total Price</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('totalPrice')} />
                </th>
                <th className="hand" onClick={sort('paymentMethod')}>
                  <Translate contentKey="storeApp.shoppingCart.paymentMethod">Payment Method</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('paymentMethod')} />
                </th>
                <th className="hand" onClick={sort('paymentReference')}>
                  <Translate contentKey="storeApp.shoppingCart.paymentReference">Payment Reference</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('paymentReference')} />
                </th>
                <th>
                  <Translate contentKey="storeApp.shoppingCart.customerDetails">Customer Details</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {shoppingCartList.map((shoppingCart, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/shopping-cart/${shoppingCart.id}`} color="link" size="sm">
                      {shoppingCart.id}
                    </Button>
                  </td>
                  <td>
                    {shoppingCart.placedDate ? <TextFormat type="date" value={shoppingCart.placedDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    <Translate contentKey={`storeApp.OrderStatus.${shoppingCart.status}`} />
                  </td>
                  <td>{shoppingCart.totalPrice}</td>
                  <td>
                    <Translate contentKey={`storeApp.PaymentMethod.${shoppingCart.paymentMethod}`} />
                  </td>
                  <td>{shoppingCart.paymentReference}</td>
                  <td>
                    {shoppingCart.customerDetails ? (
                      <Link to={`/customer-details/${shoppingCart.customerDetails.id}`}>{shoppingCart.customerDetails.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/shopping-cart/${shoppingCart.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/shopping-cart/${shoppingCart.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/shopping-cart/${shoppingCart.id}/delete`)}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="storeApp.shoppingCart.home.notFound">No Shopping Carts found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
