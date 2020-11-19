import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';

const initialState = {
  expressao: '',
  ponto: false,
  ultimo:'',
}

export default class App extends Component {
  state = { ...initialState }

  addDigit = n => {
    if(this.state.expressao.length<10){
      if(n !== '.' || (n === '.' && !this.state.ponto  )){
        if(this.state.ultimo === '='){

          const displayValue = n
          this.setState({expressao:displayValue})
          if (n === '.'){
            this.setState({ponto:true, ultimo:'.'})
          }
        }
        else{
          const displayValue = this.state.expressao + n
          this.setState({expressao:displayValue,ultimo: 'N'})
          if (n === '.'){
            this.setState({ponto:true, ultimo:'.'})
          }
        }
        
      }
    }
  }

  clearMemory = () => {
    this.setState({ ...initialState })
  }

  setOperation = operation => {
    if(this.state.expressao.length<10){
      if(this.state.ultimo === 'O'){
        const displayValue = this.state.expressao.substr(0,this.state.expressao.length-1 ) + operation
        this.setState({expressao: displayValue})
      }
      if(this.state.ultimo === 'N' || this.state.ultimo === '='){
        const displayValue = this.state.expressao + operation
        this.setState({expressao: displayValue,ponto: false, ultimo:'O'})
      }
    }
  }

  igual = () => {
    if(this.state.expressao.length>0 && this.state.ultimo ==='N'){
      const displayValue = String(eval(this.state.expressao))
      this.setState({expressao: displayValue, ponto: false, ultimo:'='})
    }
    
  }



  render(){
    return (
      <View style={styles.container}>
        <Display value={this.state.expressao} />
        <View style={styles.buttons}>
          <Button label='AC' triple onClick={this.clearMemory} />
          <Button label='/' operation onClick={this.setOperation} />
          <Button label='7' onClick={this.addDigit} />
          <Button label='8' onClick={this.addDigit} />
          <Button label='9' onClick={this.addDigit} />
          <Button label='*' operation  onClick={this.setOperation} />
          <Button label='4' onClick={this.addDigit} />
          <Button label='5' onClick={this.addDigit} />
          <Button label='6' onClick={this.addDigit} />
          <Button label='-' operation onClick={this.setOperation} />
          <Button label='1' onClick={this.addDigit} />
          <Button label='2' onClick={this.addDigit} />
          <Button label='3' onClick={this.addDigit} />
          <Button label='+' operation onClick={this.setOperation} />
          <Button label='0' double  onClick={this.addDigit} />
          <Button label='.' onClick={this.addDigit} />
          <Button label='=' operation onClick={this.igual} />
        </View>
      </View>
    );}
}

const styles = StyleSheet.create({
container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }

});
