import {Col, Flex, Row, Spin, Tag} from 'antd';
import {useEffect, useState} from 'react';

const ScrollAnimating = () => {
  const renderItems = () => {
    return <div style={{width: '100%', height: 100, background: 'red'}} />;
  };

  const arrayItems = Array.from({length: 150}, renderItems);

  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);

  const formSubmit = async () => {
    setLoading(true);
    console.log('Start send');
    await new Promise(resolve => setTimeout(resolve, 3000));
    setLoading(false);
    console.log('End send');
  };

  const scrollPage = () => {
    let animationFrameId: number | null = null;
    let scrollPosition = 0;
    const scrollStep = 1;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    console.log(
      'Starting scroll with clientHeight:',
      clientHeight,
      'scrollHeight:',
      scrollHeight,
    );

    const scroll = () => {
      scrollPosition += scrollStep;

      console.log('Scrolling... current position:', scrollPosition);

      if (scrollPosition + clientHeight >= scrollHeight) {
        console.log('Reached bottom. Scrolling to top...');

        window.scrollTo({top: 0, behavior: 'smooth'});

        setTimeout(() => {
          scrollPosition = 0;
          console.log('Restarting scroll after delay...');
          animationFrameId = requestAnimationFrame(scroll);
        }, 5000); // Delay before restarting the scroll
      } else {
        window.scrollTo({top: scrollPosition, behavior: 'smooth'});
        animationFrameId = requestAnimationFrame(scroll);
      }
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameId !== null) {
        console.log('Cleaning up scroll animation...');
        cancelAnimationFrame(animationFrameId);
      }
    };
  };

  useEffect(() => {
    if (loading) {
      window.scrollTo({top: 0, behavior: 'smooth'});
      console.log('Loading in progress, skipping scroll setup...');
      return;
    }

    // const container = document.querySelector('.scroll-test');
    const container = document.documentElement;
    // console.log('Container:', container);

    if (!container) {
      console.log('Container not found, exiting...');
      return;
    }
    // console.log('container.clientHeight', container.clientHeight);
    // console.log('container.scrollHeight', container.scrollHeight);

    if (container.clientHeight !== container.scrollHeight) {
      console.log('Setting up scroll...');
      window.scrollTo({top: 0, behavior: 'smooth'});

      const cleanupScroll = scrollPage();

      return () => {
        cleanupScroll();
      };
    } else {
      console.log('No need to scroll. Content fits within the viewport.');
    }
  }, [loading, submit]);

  useEffect(() => {
    formSubmit();
  }, [submit]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('New submit triggered by interval');
      setSubmit(s => !s);
    }, 60000); // Every 60 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Row
      className='scroll-test'
      style={{height: '100%', maxWidth: '100%'}}
      justify='start'
      gutter={[20, 32]}>
      {arrayItems.map((item, index) => (
        <Col key={index} flex='260px'>
          <Spin spinning={loading}>
            <Flex vertical align='center' justify='center'>
              {item}
              <Tag color='red'>{index + 1}</Tag>
            </Flex>
          </Spin>
        </Col>
      ))}
    </Row>
  );
};

export default ScrollAnimating;
