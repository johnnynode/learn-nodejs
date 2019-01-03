### 定义接口

注册接口

```javascript
/user?act=reg&user=aaa&pass=123
// 返回
{
  "ok": true
}
```

登录接口

```javascript
/user?act=login&user=aaa&pass=123
// 返回
{
  "ok": true
}
```

### 分情况处理

- 分文件访问
- 分接口访问