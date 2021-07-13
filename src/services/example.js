import request from '../utils/request';

// 可以在该文件管理各个请求,或者根据view目录或者router目录建立子文件夹管理
export function query() {
  return request('/api/users');
}
