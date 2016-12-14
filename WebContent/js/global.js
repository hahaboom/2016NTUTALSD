/* =====================
 * 檢查是否為email格式
 * ===================== */
function isEmail(email) {
  return (/^[^@^\s]+@[^\.@^\s]+(\.[^\.@^\s]+)+$/.test(email));
}

/* =====================
 * 檢查是否為Phone格式
 * ===================== */
function isPhone(phone) {
  return (/^[0-9\-()+]{3,20}$/.test(phone));
}

/* =====================
 * 檢查是否為Number格式
 * ===================== */
function isNumber(number) {
  return (/^\d+$/.test(number));
}

/* =====================
 * 檢查是否為英文
 * ===================== */
function isEnglish(english) {
  return (/^[a-zA-Z\s]+$/.test(english));
}

/* =====================
 * 檢查是否為中文
 * ===================== */
function isChinese(chinese) {  
  return !(/[^\u4e00-\u9fa5]/.test(chinese));  
}

/* =====================
 * 檢查是否為發票號碼格式
 * ===================== */
function isInvoiceNumber(number) {
  return (/^[a-zA-Z0-9\-()+\s]+$/.test(number));
}