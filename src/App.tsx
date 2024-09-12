/* eslint-disable @typescript-eslint/ban-ts-comment */
import {Button, Flex, notification, Typography} from 'antd';
import './assets/reset.less';

function App() {
  //
  const openPython = (appName: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    // eslint-disable-next-line react-hooks/exhaustive-deps
    let windowPyWebView = window.pywebview;
    console.log('windowPyWebView', windowPyWebView);

    if (windowPyWebView && windowPyWebView.api) {
      notification.success({
        message: `Open ${appName} success`,
        type: 'success',
      });
      windowPyWebView.api.echo(appName);
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      // eslint-disable-next-line react-hooks/exhaustive-deps
      windowPyWebView = window.pywebview;
    }
  };
  //
  return (
    // <div style={{padding: 40}}>
    // {/* <ProofOfDelivery /> */}
    // {/* <Parcer /> */}
    // <ScrollAnimating />
    // </div>
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
      </Flex>
    </>
  );
}

export default App;
