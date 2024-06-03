import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';

function App() {
  const [ip, setIp] = useState();
  const [isLoading, setLoading] = useState(false);

  const fetchIp = async () => {
    try {
      const response = await axios.get('https://ipwho.is/');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(ip.ip);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  useEffect(() => {
    fetchIp().then(r => setIp(r));
  }, []);

  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => {
    copyToClipboard().then(() => setLoading(true));
  };

  return (
    <>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col sm={6} xl={4}>
            {ip ? (
              <Card>
                <Card.Body>
                  <Card.Title>{ip.ip} </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {ip.type}
                  </Card.Subtitle>
                  <Card.Text>
                    <Image
                      src={ip.flag.img}
                      style={{
                        height: '13px',
                        outline: '1px solid black'
                      }}
                    />{' '}
                    {ip.country}, {ip.city}
                  </Card.Text>
                  <Button
                    variant="outline-primary"
                    onClick={!isLoading ? handleClick : null}
                  >
                    {isLoading ? 'Скопировано' : 'Копировать'}
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              'Загрузка...'
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

App.propTypes = {};

export default App;
