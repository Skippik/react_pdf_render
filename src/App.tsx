/* eslint-disable @typescript-eslint/ban-ts-comment */
import {Button, Flex, notification, Typography} from 'antd';
import './assets/reset.less';
import {usePyWebView} from './hooks/usePyWebView';

function App() {
  //
  const pyWebView = usePyWebView();

  //
  const openPython = (appName: string) => {
    notification.success({
      message: `Open ${appName} success`,
      type: 'success',
    });
    pyWebView?.api.echo(appName);
  };
  //
  const viewFunctionDll = () => {
    pyWebView?.api.open_dll();
  };
  //
  return (
    <>
      <Flex justify='center'>
        <Typography.Title>
          {'To close press combinations fgfgfg  q + w'}
        </Typography.Title>
      </Flex>
      <Flex
        style={{height: '90vh', overflow: 'hidden'}}
        gap={20}
        justify='center'
        align='center'>
        <Button
          onClick={() => {
            openPython('calc.exe');
          }}
          type='primary'>
          {'Open calc python'}
        </Button>
        <Button
          onClick={() => {
            openPython('notepad.exe');
          }}
          type='primary'>
          {'Open note python'}
        </Button>
        <Button
          onClick={() => {
            openPython('cmd.exe');
          }}
          type='primary'>
          {'Open CMD python'}
        </Button>
        <Button
          onClick={() => {
            openPython('https://www.google.com');
          }}
          type='primary'>
          {'Open GOOGLE python'}
        </Button>
        <Button onClick={viewFunctionDll} type='primary'>
          {'View function DLL'}
        </Button>
      </Flex>
    </>
  );
}

export default App;
