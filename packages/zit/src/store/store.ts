/* eslint-disable no-unused-vars */
export interface Store<T> {
  value: T;
  __STORE: boolean;
  onChange: (fn: any) => void;
}

function useStore<T>(init: T): [Store<T>, (setter: (prevalue: T) => T) => void] {
  const uses: any[] = [];
  const regists = function (fn: any) {
    uses.push(fn);
  };

  return [
    { value: init, __STORE: true, onChange: regists },
    (setter: (prevalue: T) => T) => {
      init = setter(init);
      uses.forEach((use) => {
        use(init); // set
      });
    },
  ];
}

useStore(0)[1](() => 10);

export { useStore };
