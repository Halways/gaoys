import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  Text,
  Alert,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
const axios = require('axios'); // A promise-based HTTP client

const mapDispatchToProps = (dispatch) => ({
  login: async (props) => {
    dispatch({
      type: 'REQUEST_TOKEN',
    });

    const axiosConfig = {
      method: 'post',
      baseURL: 'http://10.0.2.2:3000',
      url: '/api/login/',
      data: {
        username: props.username,
        password: props.password,
      },
    };
    try {
      const response = await axios(axiosConfig);

      console.log(response.status);

      if (response.status === 200) {
        dispatch({
          type: 'RECEIVED_TOKEN',
          token: response.data.token,
        });

        axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
        console.log(response.data.message);
        const {navigate} = props.navigation;
        navigate('Home');
      } else {
        Alert.alert('Login failed', response.data.message);
      }
    } catch (error) {
      dispatch({
        type: 'REQUEST_FAILED',
      });
      console.log(error.response.data.message);
      Alert.alert('Login failed', error.response.data.message);
    }
  },
});

class LoginScene extends Component {
  username = '';
  password = '';

  /**
   * 当用户名输入框值改变时，保存改变的值
   * @param  {[type]} newUsername [输入的用户名]
   */
  onUsernameChanged = (newUsername) => {
    this.username = newUsername;
  };

  /**
   * 当密码输入框值改变时，保存改变的值
   * @param  {[type]} newUsername [输入的密码]
   */
  onPasswordChanged = (newPassword) => {
    this.password = newPassword;
  };

  /**
   * 点击空白处使输入框失去焦点
   */
  blurTextInput = () => {
    this.refs.username.blur();
    this.refs.password.blur();
  };

  /**
   * 登陆按钮，点击时验证输入的用户名和密码是否正确，正确时进入主页面，否则弹出提示
   */
  login = () => {
    this.props.login({
      ...this.props,
      username: this.username,
      password: this.password,
    });
  };

  /**
   * 注册按钮，点击进入注册界面
   */
  register = () => {
    const {navigate} = this.props.navigation;
    navigate('Register');
  };

  render() {
    return (
      <ImageBackground
        style={styles.container}
        resizeMode="cover"
        source={require('../data/registerCar.jpeg')}>
        <TouchableOpacity
          activeOpacity={1.0}
          // onPress={this.blurTextInput}
        >
          <View style={styles.inputBox}>
            <TextInput
              ref="username"
              onChangeText={this.onUsernameChanged} //添加值改变事件
              style={styles.input}
              autoCapitalize="none" //设置首字母不自动大写
              underlineColorAndroid={'transparent'} //将下划线颜色改为透明
              placeholderTextColor={'#ccc'} //设置占位符颜色
              placeholder={'Username'} //设置占位符
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              ref="password"
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

export default connect(null, mapDispatchToProps)(LoginScene);
