import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {Pie} from 'react-chartjs-2';





const Transaction = props => (
    
  <tr>
    <td>{props.transaction.namecategory}</td>
    <td>{props.transaction.type}</td>
    <td>{props.transaction.amount}</td>
    <td>{props.transaction.description}</td>
    <td>{props.transaction.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.transaction._id}>Редагувати</Link> | <a href="#" onClick={() => { props.deleteTransaction(props.transaction._id) }}>Видалити</a>
    </td>
  </tr>
)
    const ytemps = [];
    const xtemps = [];

const BarGraph = props => {
    
    const data = {
        type: 'radar',
        labels: xtemps,
        datasets: [
          {
            label: 'Мої витрати',
            fill: true,
            lineTension: 0.2,
            backgroundColor: ['rgba(75,192,192,0.4)',
            'rgba(255, 0, 0, 0.5)',
            'rgba(255, 0, 0, 0.5)',
            'rgba(153, 255, 51, 0.5)',
            'rgba(0, 102, 255, 0.5)',
            'rgba(180, 99, 32, 0.5)',
            'rgba(210, 99, 132, 0.5)',],
            borderColor: 'rgba(255,255,255,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 5,
            data: ytemps
          }
        ]
      };

    return (
        <Pie data={data}/>

    )
}









const options = {
    title: {
        text:'Графік витрат'
    },
    series: [
        {
            type:'pie',
            data:[200, 200, 100, 86]
                  },
    ]
}



var ds =[];

var asValueArray = ds.map(function(row){
    return [row["0"],row["1"]];
});


export default class TransactionsList extends Component {
  constructor(props) {
    super(props);
    
    this.deleteTransaction = this.deleteTransaction.bind(this)

    this.state = {
        transaction: [],
        data: []
    };
    
  }
  //TRY
    

   componentDidMount() {
    axios.get('http://localhost:5000/transaction/')
      .then(response => {
        let component = this;

          component.setState({transaction: response.data});
        var a = response.data.length;
        
        function func(){
            for(var i=0; i<a; i++){
                ytemps.push(response.data[i]['amount'])
                xtemps.push(response.data[i]['namecategory'])
            }

        }

        console.log(response.data[0]['namecategory']);
        setTimeout(func,1000);
       // ytemps.push(response.data['amount'])
          


      
        console.log(a);

      })
      .catch((error) => {
        console.log(error);
      })
  }

  
  
  deleteTransaction(id) {
    axios.delete('http://localhost:5000/transaction/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
       
        transaction: this.state.transaction.filter(el => el._id !== id)
    })
  }

  transactionList() {
    return this.state.transaction.map(currenttransaction => {
        return <Transaction transaction={currenttransaction} deleteTransaction={this.deleteTransaction} key={currenttransaction._id}/>;
    })
  };

  


  render() {
   
    
    
    
 
    return (
      <div>
          
        <h3>Поточні транзакції</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Назва категорії</th>
              <th>Тип</th>
              <th>Сума</th>
              <th>Опис</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
           { this.transactionList() }
          </tbody>
        </table>
        <div> 
            <BarGraph />
        </div>
      </div>
      
    )
  }
}