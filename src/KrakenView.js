import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react/cjs/react.production.min';

const styles = {
  Container: {
    position: 'relative',
    width: '320px',
    height: '400px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(28, 29, 30, 0.8)',
    alignItems: 'center',
    borderRadius: '20px',
  },
  TabContainer: {
    width: '292px',
    height: '38px',
    pointerEvents: 'none',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(28, 29, 30, 0.6)',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '32px',
    borderRadius: '16px',
  },
  TabText: {
    fontSize: '14px',
    color: '#FFFFFF'
  },
  BoardTitle: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#FFFFFF',
    fontWeight: '600',
  },
  KrakenDataBoard: {
    width: '292px',
    minHeight: '30px',
    marginTop: '10px',
    backgroundColor: 'rgba(28, 29, 30, 0.6)', 
    borderRadius: '16px',
    color: '#FFF',
    padding: '10px',
    paddingLeft: '15px',
    paddingRight: '15px',
    wordWrap: 'break-word',
  },
  CallKrakenButton: {
    position: 'absolute',
    bottom: '32px',
    width: '160px',
    height: '48px',
    backgroundColor: '#1D70F2',
    textAlign: 'center',
    color: '#FFFFFF',
    borderRadius: '12px',
    lineHeight: '48px',
  }
};

const krakenObj = window.webf;

function KrakenView() {
  const [krakenReply, setNativeReply] = useState('');
  const [krakenRequest, setNativeRequest] = useState('');

  useEffect(() => {
    console.log(krakenObj.methodChannel);
    krakenObj.methodChannel.clearMethodCallHandler();
    krakenObj.methodChannel.addMethodCallHandler((method, args) => {
      var request = method + ' method invoked' + '\n' + 'Its params is : ' + args;
      console.log('Received request from Kraken : ' + request);
      setNativeRequest(request);
    });
  }, []);

  return (
    <div style={styles.Container} className="container">
      <div style={styles.TabContainer} className="tabContainer">
        <div style={styles.TabText}>跨端交互</div>
        <div style={styles.TabText}>内聚业务</div>
      </div>
      <div style={styles.BoardTitle}> { ">> Kraken Reply <<" }</div>
      <div style={styles.KrakenDataBoard}>{krakenReply}</div>
      <div style={styles.BoardTitle}> { ">> Request from Kraken <<" }</div>
      <div style={styles.KrakenDataBoard}>{krakenRequest}</div>
      <div style={styles.CallKrakenButton} onClick={ () => {
        krakenObj.methodChannel.invokeMethod('onJSCall', new Date().getTime().toString(), ['Param Two'], {
          value: 'Param Three',
        })
        .then(result => {
          console.log('Received reply from Kraken', result);
          setNativeReply(result);
        })
        .catch(err => {
          console.log('Some error occured', err);
        });
      }}>JS 调用 Kraken 方法</div>
    </div>
  );
}

export default KrakenView;
