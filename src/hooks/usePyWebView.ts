import {useEffect, useState} from 'react';

type Pywebview = {
  api: {
    echo: (lockerId: string) => void;
    open_dll: () => void;
  };
};

declare global {
  interface Window {
    pywebview: Pywebview;
  }
}

export const usePyWebView = () => {
  const [pyWebView, setPyWebView] = useState<Pywebview | null>(null);

  useEffect(() => {
    const checkPyWebView = () => {
      if (window.pywebview) {
        setPyWebView(window.pywebview);
      } else {
        setTimeout(checkPyWebView, 500);
      }
    };

    checkPyWebView();
  }, []);

  return pyWebView;
};
