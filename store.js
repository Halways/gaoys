import {createStore} from 'redux';
import {reducer} from './reducer';

/**
 * The states are actually saved here in a store (in RAM actually).
 * A component can access the states in two ways:
 * 1. "Receive" the state in realtime, that is, the component will be notified
 * as the state is changed.
 * 2. Modify the state through a "transmitter" that dispatches an action to the
 * store. The store then will change the state based on the rules defined in by
 * the reducer.
 */
export default createStore(reducer);
