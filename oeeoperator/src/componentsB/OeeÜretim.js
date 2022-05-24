import React, { PureComponent } from 'react';
import "../App.css"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';


const datam2 = [
  {
    name: '',
    planlanmisUretim: 0,
    toplamUretim: 0,
    amt: 0
  }
];

export default class Example extends PureComponent {
  // static demoUrl = 'https://codesandbox.io/s/synchronized-line-charts-zc3nl';
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      planlanmisUretim: props.planlanmisUretim,
      toplamUretim: props.toplamUretim,
      amt: 0,
      akey: 0,
      dur: false,
      grafikData: [{ grafikZaman: '0' }],
      datam2: [
        {
          name: '',
          uv: 0,
          pv: 0,
          amt: 0
        }],
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      planlanmisUretim: nextProps.planlanmisUretim,
      toplamUretim: nextProps.toplamUretim,
    });
    //const datam = [this.state.planlanmisUretim, this.state.toplamUretim]
  }

  componentDidMount() {
    setInterval(this.getData, 3000);
  }
  
  // ÜST COMPONENT TEN GELEN CANLI VERİLERİ (toplamUretim ile planlanmisUretim) GRAFİĞE YAZAR
  getData = () => {
    const datam=[{}];

    //datam2.splice(0, datam2.length - 5);
    datam.map((item, index) => {
      if (!this.state.dur) {
        datam2.push({
          name: this.state.akey, //moment('YYYY-MM-DD kk:mm:ss.SSS').format('ss.S'),
          planlanmisUretim: Number(this.state.planlanmisUretim),
          toplamUretim: Number(this.state.toplamUretim),
          amt: 3000,
        })
        this.setState(prevState => {
          return {akey: prevState.akey + 1}
       })
      }
    })
    console.log(this.state.akey, datam2, 123);

  }

  render() {
    const { planlanmisUretim, toplamUretim, name, amt } = this.state;

    return (
      <div style={{ width: '100%' }}>
        <h2>Üretim Adet (Hedef / Gerçekleşen)</h2>
        {/* {console.log('geldi  ', datam2)} */}
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            key={this.state.akey}
            data={datam2}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="black" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis />
            <Tooltip />
            <Legend />

            {/*{datam2.map(name => (
            ))}*/}

            <Line type="monotone" isAnimationActive={false} dataKey="planlanmisUretim" stroke="rgb(255,0,0)" fill="rgb(255,0,0)" />
            <Line type="monotone" isAnimationActive={false} dataKey="toplamUretim" stroke="rgb(0,100,255)" fill="rgb(0,100,255)" />

          </LineChart>
        </ResponsiveContainer>

      </div>
    );
  }
}
