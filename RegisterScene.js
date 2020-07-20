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

const axios = require('axios'); // A promise-based HTTP client

export default class RegisterScene extends Component {
  username = ''; //保存用户名
  password = ''; //保存密码
  confirmPassword = ''; //保存确认密码
  email = '';
  firstname = '';
  lastname = '';
  phone = '';

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
   * 当确认密码输入框值改变时，保存改变的值
   * @param  {[type]} newUsername [输入的确认密码]
   */
  onConfirmPasswordChanged = (newConfirmPassword) => {
    this.confirmPassword = newConfirmPassword;
  };

  /**
   * 点击空白处使输入框失去焦点
   */
  blurTextInput = () => {
    this.refs.username.blur();
    this.refs.password.blur();
    this.refs.firstname.blur();
    this.refs.lastname.blur();
    this.refs.email.blur();
    this.refs.phone.blur();
    this.refs.confirmPassword.blur();
  };

  /**
   * 注册按钮，根据输入的内容判断注册是否成功
   */
  register = async () => {
    if (this.username !== '' && this.password !== '') {
      if (this.password === this.confirmPassword) {
        // Configure the axios data and info and send a POST request to the server
        const axiosConfig = {
          method: 'post',
          baseURL: 'http://10.0.2.2:3000',
          url: '/api/users/',
          data: {
            username: this.username,
            password: this.password,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            phone: this.phone,
          },
        };
        try {
          const response = await axios(axiosConfig);

          const {goBack} = this.props.navigation;

          Alert.alert(response.data.message, '返回登陆', [
            {
              text: '确定',
              onPress: () => {
                goBack();
              },
            },
          ]);
        } catch (error) {
          Alert.alert('Failed', error[0]);
        }
      } else {
        Alert.alert('注册失败', '密码与确认密码不同');
      }
    } else {
      Alert.alert('注册失败', '用户名或密码不能为空');
    }
  };

  render() {
    return (
      <ImageBackground
        style={styles.container}
        resizeMode="cover"
        source={require('./registerCar.jpeg')}>
        <TouchableOpacity
          activeOpacity={1.0} //设置背景被点击时，透明度不变
          onPress={this.blurTextInput}>
          <View style={styles.inputBox}>
            <TextInput
              ref="username" //添加描述
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
              ref="firstname" //添加描述
              onChangeText={(newFirstname) => (this.firstname = newFirstname)} //添加值改变事件
              style={styles.input}
              autoCapitalize="none" //设置首字母不自动大写
              underlineColorAndroid={'transparent'} //将下划线颜色改为透明
              placeholderTextColor={'#ccc'} //设置占位符颜色
              placeholder={'Firstname'} //设置占位符
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              ref="lastname" //添加描述
              onChangeText={(newLastname) => (this.lastname = newLastname)} //添加值改变事件
              style={styles.input}
              autoCapitalize="none" //设置首字母不自动大写
              underlineColorAndroid={'transparent'} //将下划线颜色改为透明
              placeholderTextColor={'#ccc'} //设置占位符颜色
              placeholder={'Lastname'} //设置占位符
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              ref="phone" //添加描述
              onChangeText={(newPhone) => (this.phone = newPhone)} //添加值改变事件
              style={styles.input}
              autoCapitalize="none" //设置首字母不自动大写
              underlineColorAndroid={'transparent'} //将下划线颜色改为透明
              placeholderTextColor={'#ccc'} //设置占位符颜色
              placeholder={'Phone Number'} //设置占位符
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              ref="email" //添加描述
              onChangeText={(newEmail) => (this.email = newEmail)} //添加值改变事件
              style={styles.input}
              autoCapitalize="none" //设置首字母不自动大写
              underlineColorAndroid={'transparent'} //将下划线颜色改为透明
              placeholderTextColor={'#ccc'} //设置占位符颜色
              placeholder={'Email'} //设置占位符
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              ref="password" //添加描述
              onChangeText={this.onPasswordChanged} //添加值改变事件
              style={styles.input}
              secureTextEntry={true} //设置为密码输入框
              autoCapitalize="none" //设置首字母不自动大写
              underlineColorAndroid={'transparent'} //将下划线颜色改为透明
              placeholderTextColor={'#ccc'} //设置占位符颜色
              placeholder={'Password'} //设置占位符
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              ref="confirmPassword" //添加描述
              onChangeText={this.onConfirmPasswordChanged} //添加值改变事件
              style={styles.input}
              secureTextEntry={true} //设置为密码输入框
              autoCapitalize="none" //设置首字母不自动大写
              underlineColorAndroid={'transparent'} //将下划线颜色改为透明
              placeholderTextColor={'#ccc'} //设置占位符颜色
              placeholder={'Confirm Password'} //设置占位符
            />
          </View>
          <TouchableOpacity
            onPress={this.register} //添加点击事件
            style={styles.button}>
            <Text style={styles.btText}>注册</Text>
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
  input: {
    width: 200,
    height: 40,
    fontSize: 17,
    color: '#000000', //输入框输入的文本为白色
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
