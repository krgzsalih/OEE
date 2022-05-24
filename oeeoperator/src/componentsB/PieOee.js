import React, { PureComponent } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { Card } from 'semantic-ui-react';
import axios from 'axios';

import Chart from 'chart.js/auto';


import "../App.css";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5054'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class PieOee extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';

  constructor(props) {
    super(props);
    this.state = {
      dur: false,
      durusNedeni: '',
      durusSuresi: 0,
      pastaDurusList: [
        {
          durusAdi: '',
          durusSuresi: 0,
        }
      ],
    }
  }


  componentWillMount = () => {
    setInterval(this.pastayaDurusGetir, 3000);
  }

  // D:/AHMET ÇALIŞMA/OEE/oeeUretimYaz/uretimYaz.js TEN DURUŞLARI GRUPLANMIŞ BİR ŞEKİLDE ÇEKER
  pastayaDurusGetir = () => {
    axios.post('http://localhost:6161/pastayaDurusGetir').then((res) => {
      this.setState({
        pastaDurusList: res.data,
      }, () => { console.log(this.state.pastaDurusList, " PASTA GELDİİİ") })
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    const { durusNedeni, durusSuresi, pastaDurusList } = this.state;
    const pastaData = [
      { name: durusNedeni, value: durusSuresi },
    ];

    pastaDurusList.map((item, index) => {
      if (!this.state.dur) {
        pastaData.push({
          name: item.durusAdi,
          value: item.durusSuresi,
        })
      }
    })

    return (
      <div>

        <Card className="pie-chart-card">
          <div className="pie-title">
            Duruş Analizi (dk)
          </div>
          <PieChart width={470} height={300}>

            <Pie
              data={pastaData}
              isAnimationActive={true}
              cx="50%"
              cy="50%"
              labelLine={true}
              label
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pastaData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Card>
      </div>
    );
  }
}