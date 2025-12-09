import * as React from "react";

const TOAST_LIMIT = 1;
// kept large, but you can reduce if you want to auto-remove faster in dev
const TOAST_REMOVE_DELAY = 1000000;

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
};

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

// map of toastId -> timeoutId
const toastTimeouts = new Map();

const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    // clear stored timeout and dispatch a remove action
    toastTimeouts.delete(toastId);
    dispatch({
      type: actionTypes.REMOVE_TOAST,
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

const clearRemoveQueue = (toastId) => {
  const t = toastTimeouts.get(toastId);
  if (t) {
    clearTimeout(t);
    toastTimeouts.delete(toastId);
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action;

      // schedule removal(s)
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }

    case actionTypes.REMOVE_TOAST:
      if (action.toastId === undefined) {
        // clear all timeouts
        toastTimeouts.forEach((to) => clearTimeout(to));
        toastTimeouts.clear();
        return {
          ...state,
          toasts: [],
        };
      }
      // ensure we clear the timeout for the removed toast
      clearRemoveQueue(action.toastId);
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };

    default:
      return state;
  }
};

const listeners = [];
let memoryState = { toasts: [] };

function dispatch(action) {
  memoryState = reducer(memoryState, action);
  // call listeners synchronously (they will set local state)
  listeners.forEach((listener) => {
    try {
      listener(memoryState);
    } catch (err) {
      // swallow listener errors so one bad listener doesn't break others
      // optionally console.error here during development
      // console.error("toast listener error", err);
    }
  });
}

function toast(props) {
  const id = genId();

  const update = (propsToUpdate) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      toast: { ...propsToUpdate, id },
    });

  const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });

  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = React.useState(memoryState);

  React.useEffect(() => {
    // subscribe once on mount
    listeners.push(setState);
    // sync initial state (in case it changed before mount)
    setState(memoryState);

    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
    // empty deps so subscribe/unsubscribe only on mount/unmount
  }, []);

  return {
    ...state,
    toast,
    // optional toastId
    dismiss: (toastId) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  };
}

export { useToast, toast };
