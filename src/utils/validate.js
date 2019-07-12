export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export function validUsername(str) {
  const valid_map = ['admin', 'editor'];
  return valid_map.indexOf(str.trim()) >= 0;
}

/* 合法uri */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/* 小写字母 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 大写字母 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// 地区名称
export const DEPT_NAME = (rule, value, callback) => {
  const regExp = /^[\u4e00-\u9fa5\\0-9\\A-Za-z\\_-]{1,20}$/;
  if (regExp.test(value) === false) {
    callback(new Error('请输入长度不超过20的中文、数字、大小写字母或下划线'));
  } else {
    callback();
  }
};

// 用户名
export const USER_NAME = (rule, value, callback) => {
  if (rule.context.tableData && rule.context.tableData.length > 0) {
    if (rule.context.choseUser) {
      rule.context.tableData.forEach(user => {
        if (
          user.username === value &&
          user.username !== rule.context.choseUser.username
        ) {
          callback(new Error('用户名已存在'));
        }
      });
    } else {
      rule.context.tableData.forEach(user => {
        if (user.username === value) {
          callback(new Error('用户名已存在'));
        }
      });
    }
  }
  const regExp = /^[0-9\\A-Za-z\\_-]{1,50}$/;
  if (regExp.test(value) === false) {
    callback(new Error('请输入长度不超过50的数字、大小写字母或下划线'));
  } else {
    callback();
  }
};

// 姓名
export const NAME = (rule, value, callback) => {
  const regExp = /^[\u4e00-\u9fa5\\A-Za-z]{1,10}$/;
  if (regExp.test(value) === false) {
    callback(new Error('请输入长度不超过10的中文或大小写字母'));
  } else {
    callback();
  }
};

// 手机验证
export const PHONE = (rule, value, callback) => {
  const regExp = /^([1][3,4,5,6,7,8,9])\d{9}$/;
  if (regExp.test(value) === false) {
    callback(new Error('请输入正确的手机号码'));
  } else {
    callback();
  }
};

// 邮箱验证
export const E_MAIL = (rule, value, callback) => {
  const regExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (regExp.test(value) === false) {
    callback(new Error('请输入正确的邮箱格式'));
  } else {
    callback();
  }
};

// 密码验证
export const PASSWORD = (rule, value, callback) => {
  const regExp = /^[0-9\\A-Za-z]{6,20}$/;
  if (regExp.test(value) === false) {
    callback(new Error('密码由不超过6-20的数字和大小写字母组成'));
  } else {
    callback();
  }
};

export const CONFIRMPASSWORD = (rule, value, callback) => {
  if (rule.context.addUserForm.password !== value) {
    callback(new Error('俩次输入密码不一致'));
  } else {
    callback();
  }
};

// 角色名称
export const ROLE_NAME = (rule, value, callback) => {
  const regExp = /^[\u4e00-\u9fa5\\0-9\\A-Za-z]{1,20}$/;
  if (regExp.test(value) === false) {
    callback(new Error('角色名称不超过20位的中文、数字和大小写字母组成'));
  } else {
    callback();
  }
};

// 备注
export const ROLE_REMARK = (rule, value, callback) => {
  const regExp = /^.{1,200}$/;
  if (regExp.test(value) === false) {
    callback(new Error('备注不超过200位的中文、数字和大小写字母以及标点组成'));
  } else {
    callback();
  }
};

// 菜单名称
export const MENU_NAME = (rule, value, callback) => {
  const regExp = /^[\u4e00-\u9fa5\\0-9\\A-Za-z]{1,20}$/;
  if (regExp.test(value) === false) {
    callback(new Error('名称不超过20位的中文、数字和大小写字母'));
  } else {
    callback();
  }
};

// 权限标识
export const PERMISSION_MARK = (rule, value, callback) => {
  const regExp = /^.{1,200}$/;
  if (regExp.test(value) === false) {
    callback(new Error('权限由小于100位的数字和大小写字母以及标点组成'));
  } else {
    callback();
  }
};
