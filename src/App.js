import React from 'react';
import './App.css';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import TweetEmbed from 'react-tweet-embed';
import 'antd/dist/antd.css';
import { Layout, Select, Typography } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;
const { Title } = Typography;
const defaultKey = "ZGF5IDUwIA==";
//

// json encoded data from #timestamps
const timeline = require('./timeline.json');

let twitterRegex = /https?:\/\/w?w?w?.?twitter.com\/.*\/status\/([0-9]+\??s?\=?[0-9]+)/g //twitter matching pattern

class Timeline extends React.Component {
  constructor(props) {
    super(props);
  }
  
  timeline() {
    //console.log(this.props);
    //console.log('test');
    //Object.keys(this.props.data).map(entry => {
      //let twitterID = null;
      //let body = entry.body;
      /*if(twitterRegex.test(body)) {
        twitterID = body.match(/([0-9]{10,})/g)[0];
        entry.body = body.replace(twitterRegex, '');
      }
          return (
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff'}}
            contentArrowStyle={{ borderRight: '7px solid rgb(33, 150, 243)' }}
            date={entry.time + ' ' + entry.zone}
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            dateClassName="woke-stamp-date"
          >
            <h3 className="vertical-timeline-element-title">{entry.location}</h3>
            <p>
            {entry.body}
            {entry.attachments.length > 0 && entry.attachments.join(' ')}
            </p>
            {twitterID > 0 &&
              <TweetEmbed id={twitterID} options={{ theme: 'dark' }} />
            }
          </VerticalTimelineElement>
          )*/
    //})
  }

  render() {
    return (
      <React.Fragment>
        {timeline}
      </React.Fragment>
    )
  }
}

function App() {
  console.log(typeof Object.values(timeline[defaultKey].events))
  console.log(Object.values(timeline[defaultKey].events))
  let selectOptions = Object.keys(timeline).map(key => {
    const buffer = Buffer.from(key, "base64");
    const day = buffer.toString("utf-8"); // convert encoded day back to string
    if(day) return(<Option value={key}>{day}</Option>);
  })
  return (
    <Layout>
      <Header style={{color: 'white', fontSize: 24}}>Protest Timeline</Header>
      <Layout>
        <Sider>
          <Title level={3} style={{paddingLeft: 10, color: 'white'}}>Select A Day</Title>
          <Select style={{paddingLeft: 10, width: 150}} defaultValue="ZGF5IDUwIA==">
            {selectOptions}
          </Select>
        </Sider>
        <Content>
        <VerticalTimeline>
          <h2 style={{marginRight: 150}}>Day 50</h2>
          <Timeline data={Object.values(timeline[defaultKey].events)} day="Day 50" />
        </VerticalTimeline>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
