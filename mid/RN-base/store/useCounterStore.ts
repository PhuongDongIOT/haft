import { StateCreator, create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createSelectors } from './createSelectors';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';


type CounterStates = {
  click: number;
  paw: boolean;
};
type CounterActions = {
  incrementClick: () => void;
  decrementClick: () => void;
};
const createCounterSlice: StateCreator<
CounterStates & CounterActions,
  [
    ['zustand/immer', never],
    ['zustand/devtools', unknown],
    ['zustand/subscribeWithSelector', never],
    ['zustand/persist', unknown],
  ]
> = (set, get) => ({
  click: 0,
  paw: true,
  incrementClick: () =>
    set(state => {
      state.click++;
    }),
    decrementClick: () =>
    set(state => {
      state.click--;
    })
});

export const useCounterStore = createSelectors(
  create<CounterStates & CounterActions>()(
    immer(
      devtools(
        subscribeWithSelector(
          persist(createCounterSlice, {
            name: 'counter store',
          }),
        ),
        {
          enabled: true,
          name: 'counter store',
        },
      ),
    ),
  ),
);
// Updating state, will trigger listeners
useCounterStore.setState({ paw: false })
// Listening to all changes, fires synchronously on every change
const unsub = useCounterStore.subscribe(console.log);
unsub();
