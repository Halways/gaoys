import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  Text,
  Alert,
  Button,
  Image,
  ImageBackground,
} from 'react-native';

export default class LoginScene extends Component {
  username = '';
  password = '';

  /**
   * 当用户名输入框值改变时，保存改变的值
   * @param  {[type]} newUsername [输入的用户名]
   */
  onUsernameChanged = (newUsername) => {
    console.log(newUsername); //运行后可以在输入框随意输入内容并且查看log验证！
    this.username = newUsername;
  };

  /**
   * 当密码输入框值改变时，保存改变的值
   * @param  {[type]} newUsername [输入的密码]
   */
  onPasswordChanged = (newPassword) => {
    console.log(newPassword); //运行后可以在输入框随意输入内容并且查看log验证！
    this.password = newPassword;
  };

  /**
   * 点击空白处使输入框失去焦点
   */
  // blurTextInput = () => {
  //   this.refs.username.blur();
  //   this.refs.password.blur();
  // };

  /**
   * 登陆按钮，点击时验证输入的用户名和密码是否正确，正确时进入主页面，否则弹出提示
   */
  login = () => {
    if (this.username == 'gys' && this.password == '123') {
      // this.refs.username.blur();
      // this.refs.password.blur();
      const {navigate} = this.props.navigation; //获取navigation的navigate方法
      navigate('Home'); //跳转到注册过的Home界面
    } else {
      Alert.alert('Failed', 'ID or password error'); //弹出提示框
    }
  };

  /**
   * 注册按钮，点击进入注册界面
   */
  register = () => {
    const {navigate} = this.props.navigation; //获取navigation的navigate方法
    navigate('Register'); //跳转到注册过的Register界面
  };

  render() {
    return (
      <ImageBackground
        style={styles.container}
        resizeMode="cover"
        source={require('./registerCar.jpeg')}>
        <TouchableOpacity //用可点击的组件作为背景
          activeOpacity={1.0} //设置背景被点击时的透明度改变值
          // onPress={this.blurTextInput} //添加点击事件
        >
          <View style={styles.inputBox}>
            <TextInput
              ref="username" //设置描述
              onChangeText={this.onUsernameChanged} //添加值改变事件
              style={styles.input}
              autoCapitalize="none" //设置首字母不自动大写
              underlineColorAndroid={'transparent'} //将下划线颜色改为透明
              placeholderTextColor={'#ccc'} //设置占位符颜色
              placeholder={'ID'} //设置占位符
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              ref="password" //设置描述
              onChangeText={this.onPasswordChanged} //添加值改变事件
              style={styles.input}
              autoCapitalize="none" //设置首字母不自动大写
              underlineColorAndroid={'transparent'} //将下划线颜色改为透明
              secureTextEntry={true} //设置为密码输入框
              placeholderTextColor={'#ccc'} //设置占位符颜色
              placeholder={'password'} //设置占位符
            />
          </View>
          <TouchableOpacity
            onPress={this.login} //添加点击事件
            style={styles.button}>
            <Text style={styles.btText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.register} //添加点击事件
            style={styles.button}>
            <Text style={styles.btText}>Sign up</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    height: 60,
    width: '100%',
    marginBottom: 50,
  },
  input: {
    width: 200,
    height: 40,
    fontSize: 17,
    color: '#000000',
  },
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 320,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  button: {
    height: 50,
    width: 320,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#3366FF',
    marginTop: 20,
  },
  btText: {
    color: '#fff',
    fontSize: 20,
  },
});
