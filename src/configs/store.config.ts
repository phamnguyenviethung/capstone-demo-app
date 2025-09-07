import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface IExampleSlice {
  test: number;
  hi: string;
  setTest: (value: number) => void;
}
const ExampleSlice: SliceInterface<IExampleSlice> = (set) => {
  return {
    test: 1,
    hi: 'Hello',
    setTest: (value: number) => set({ test: value }),
  };
};

type AppStore = IExampleSlice;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SliceInterface<T>
  extends StateCreator<AppStore, [['zustand/devtools', never]], [], T> {}

const useAppStore = create<AppStore>()(
  devtools((...a) => ({
    ...ExampleSlice(...a),
  }))
);
export default useAppStore;
